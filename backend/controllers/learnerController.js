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
		const learners = await pool.query(`
			SELECT
				l.*,
				MAX(CASE WHEN a.day = 'Monday' THEN 1 ELSE 0 END) AS monday,
				MAX(CASE WHEN a.day = 'Tuesday' THEN 1 ELSE 0 END) AS tuesday,
				MAX(CASE WHEN a.day = 'Wednesday' THEN 1 ELSE 0 END) AS wednesday,
				MAX(CASE WHEN a.day = 'Thursday' THEN 1 ELSE 0 END) AS thursday,
				MAX(CASE WHEN a.day = 'Friday' THEN 1 ELSE 0 END) AS friday,
				MAX(CASE WHEN a.day = 'Saturday' THEN 1 ELSE 0 END) AS saturday
			FROM learners l
			LEFT JOIN learner_availability a ON l.learner_id = a.learner_id
			GROUP BY l.learner_id;
		`);
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

exports.updateLearnerConversation = async (req, res) => {
  const { learnerId, conversationId } = req.body;
  try {
    const query = `
      UPDATE learners
      SET conversation = $2
      WHERE learner_id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [learnerId, conversationId]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Learner not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.removeLearnerFromConversation = async (req, res) => {
  const { learnerId } = req.body;
  
  try {
    const query = `
      UPDATE learners
      SET conversation = NULL
      WHERE learner_id = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [learnerId]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Learner not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};