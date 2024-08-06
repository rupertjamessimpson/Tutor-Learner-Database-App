require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER,
	host: 'localhost',
	database: 'tutor_learner',
	password: process.env.DB_PASSWORD,
	port: 5432,
});

exports.getAllTutors = async (req, res) => {
  try {
    const query = `
      SELECT t.*, p.*
      FROM tutors t
      LEFT JOIN preferences p ON t.tutor_id = p.tutor_id
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tutors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createTutor = async (req, res) => {
	const { first_name, last_name, phone, email, available } = req.body;
	try {
		const { rows } = await pool.query('INSERT INTO tutors (first_name, last_name, phone, email, available) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
			[first_name, last_name, phone, email, available]);
		res.json(rows[0]);
	} catch (error) {
		console.error('Error creating tutor:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.updateTutor = async (req, res) => {
	const id = req.params.id;
	const { first_name, last_name, phone, email, available } = req.body;
	try {
		const { rows } = await pool.query('UPDATE tutors SET first_name=$1, last_name=$2, phone=$3, email=$4, available=$5 WHERE tutor_id=$6 RETURNING *', 
			[first_name, last_name, phone, email, available, id]);
		res.json(rows[0]);
	} catch (error) {
		console.error('Error updating tutor:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.deleteTutor = async (req, res) => {
	const id = req.params.id;
	try {
		await pool.query('DELETE FROM tutors WHERE tutor_id=$1', [id]);
		res.json({ message: 'Tutor deleted successfully' });
	} catch (error) {
		console.error('Error deleting tutor:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};
