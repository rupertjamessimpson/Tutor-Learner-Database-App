require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER,
	host: 'localhost',
	database: 'tutor_learner',
	password: process.env.DB_PASSWORD,
	port: 5432,
});

exports.getAllLearners = async (req, res) => {
	try {
		const learners = await pool.query('SELECT * FROM learners');
		res.json(learners.rows);
	} catch (error) {
		console.error(error.message);
	}
}

exports.createLearner = async (req, res) => {
	const { first_name, last_name, phone, email, available } = req.body;
	try {
		const { rows } = await pool.query('INSERT INTO learners (first_name, last_name, phone, email, level, available) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
			[first_name, last_name, phone, email, available]);
		res.json(rows[0]);
	} catch (error) {
		console.error('Error creating learner:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.updateLearner = async (req, res) => {
	const id = req.params.id;
	const { first_name, last_name, phone, email, level, available } = req.body;
	try {
		const { rows } = await pool.query('UPDATE learners SET first_name=$1, last_name=$2, phone=$3, email=$4, level=$5, available=$6 WHERE learner_id=$7 RETURNING *', 
			[first_name, last_name, phone, email, level, available, id]);
		res.json(rows[0]);
	} catch (error) {
		console.error('Error updating learner:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.deleteLearner = async (req, res) => {
	const id = req.params.id;
	try {
		await pool.query('DELETE FROM learners WHERE learner_id=$1', [id]);
		res.json({ message: 'Learner deleted successfully' });
	} catch (error) {
		console.error('Error deleting learner:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};