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
				MAX(CASE WHEN a.day = 'monday' THEN 1 ELSE 0 END) AS monday,
				MAX(CASE WHEN a.day = 'tuesday' THEN 1 ELSE 0 END) AS tuesday,
				MAX(CASE WHEN a.day = 'wednesday' THEN 1 ELSE 0 END) AS wednesday,
				MAX(CASE WHEN a.day = 'thursday' THEN 1 ELSE 0 END) AS thursday,
				MAX(CASE WHEN a.day = 'friday' THEN 1 ELSE 0 END) AS friday,
				MAX(CASE WHEN a.day = 'saturday' THEN 1 ELSE 0 END) AS saturday
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

exports.createLearner = async (req, res) => {
  const { first_name, last_name, phone, email, level, availability } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const learnerQuery = `
      INSERT INTO learners (first_name, last_name, phone, email, level)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING learner_id;
    `;
    const learnerValues = [first_name, last_name, phone, email, level];
    const learnerResult = await client.query(learnerQuery, learnerValues);
    const learnerId = learnerResult.rows[0].learner_id;

    const filteredAvailability = Object.entries(availability)
      .filter(([day, times]) => times.start_time && times.end_time)
      .map(([day, times]) => ({
        learner_id: learnerId,
        day,
        start_time: times.start_time,
        end_time: times.end_time
      }));

    if (filteredAvailability.length > 0) {
      const availabilityQuery = `
        INSERT INTO learner_availability (learner_id, day, start_time, end_time)
        VALUES ${filteredAvailability.map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`).join(', ')}
      `;
      const availabilityValues = filteredAvailability.flatMap(avail => [avail.learner_id, avail.day, avail.start_time, avail.end_time]);
      await client.query(availabilityQuery, availabilityValues);
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Learner created successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating learner:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
};