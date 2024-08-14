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

exports.getLearnerById = async (req, res) => {
	const id = req.params.id;
	try {
		const learnerQuery = 'SELECT * FROM learners WHERE learner_id = $1';
		const availabilityQuery = 'SELECT * FROM learner_availability WHERE learner_id = $1';

		const learnerResults = await pool.query(learnerQuery, [id]);
		const availabilityResults = await pool.query(availabilityQuery, [id]);

		const learner = learnerResults.rows[0];
		const availability = availabilityResults.rows;

		if (learner) {
			res.json({ learner, availability });
		} else {
			res.status(404).json({ error: 'Learner not found' });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ err: 'Internal Server Error' });
	}
};