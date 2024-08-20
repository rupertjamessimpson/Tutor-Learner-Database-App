require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'tutor_learner',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

exports.getAllMatches = async (req, res) => {
  try {
    const query = `
      SELECT
        m.*,
        t.first_name AS tutor_first_name,
        t.last_name AS tutor_last_name,
        l.first_name AS learner_first_name,
        l.last_name AS learner_last_name
      FROM matches m
      JOIN tutors t ON m.tutor_id = t.tutor_id
      JOIN learners l ON m.learner_id = l.learner_id;
    `;
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
