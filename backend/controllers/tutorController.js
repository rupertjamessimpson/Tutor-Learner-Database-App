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
			SELECT
				t.*, p.*,
				MAX(CASE WHEN a.day = 'Monday' THEN 1 ELSE 0 END) AS monday,
				MAX(CASE WHEN a.day = 'Tuesday' THEN 1 ELSE 0 END) AS tuesday,
				MAX(CASE WHEN a.day = 'Wednesday' THEN 1 ELSE 0 END) AS wednesday,
				MAX(CASE WHEN a.day = 'Thursday' THEN 1 ELSE 0 END) AS thursday,
				MAX(CASE WHEN a.day = 'Friday' THEN 1 ELSE 0 END) AS friday
			FROM tutors t
			LEFT JOIN preferences p ON t.tutor_id = p.tutor_id
			LEFT JOIN tutor_availability a ON t.tutor_id = a.tutor_id
			GROUP BY t.tutor_id, p.preference_id;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tutors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTutorById = async (req, res) => {
	const id = req.params.id;
	try {
		const tutorQuery = 'SELECT * FROM tutors WHERE tutor_id = $1';
		const preferencesQuery = 'SELECT * FROM preferences WHERE tutor_id = $1';
		const availabilityQuery = 'SELECT * FROM tutor_availability WHERE tutor_id = $1';

		const tutorResult = await pool.query(tutorQuery, [id]);
		const preferencesResult = await pool.query(preferencesQuery, [id]);
		const availabilityResult = await pool.query(availabilityQuery, [id]);

		const tutor = tutorResult.rows[0];
		const preferences = preferencesResult.rows[0];
		const availability = availabilityResult.rows;

		if (tutor) {
			res.json({ tutor, preferences, availability });
		} else {
			res.status(404).json({ error: 'Tutor not found' });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ err: 'Internal Server Error' });
	}
};