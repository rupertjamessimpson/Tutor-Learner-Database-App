require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
	user: process.env.DB_USER,
	host: 'localhost',
	database: 'tutor_learner',
	password: process.env.DB_PASSWORD,
	port: 5432,
});

exports.getAllUsers = async (req, res) => {
	try {
		const learners = await pool.query(`
			SELECT * FROM users;
		`);
		res.json(learners.rows);
	} catch (error) {
		console.error(error.message);
	}
}