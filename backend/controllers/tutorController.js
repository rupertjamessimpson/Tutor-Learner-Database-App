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
				MAX(CASE WHEN a.day = 'monday' THEN 1 ELSE 0 END) AS monday,
				MAX(CASE WHEN a.day = 'tuesday' THEN 1 ELSE 0 END) AS tuesday,
				MAX(CASE WHEN a.day = 'wednesday' THEN 1 ELSE 0 END) AS wednesday,
				MAX(CASE WHEN a.day = 'thursday' THEN 1 ELSE 0 END) AS thursday,
				MAX(CASE WHEN a.day = 'friday' THEN 1 ELSE 0 END) AS friday
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

exports.createTutor = async (req, res) => {
  const { first_name, last_name, phone, email, preferences, availability } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const tutorQuery = `
      INSERT INTO tutors (first_name, last_name, phone, email)
      VALUES ($1, $2, $3, $4)
      RETURNING tutor_id;
    `;
    const tutorValues = [first_name, last_name, phone, email];
    const tutorResult = await client.query(tutorQuery, tutorValues);
    const tutorId = tutorResult.rows[0].tutor_id;

    const preferencesQuery = `
      INSERT INTO preferences (tutor_id, conversation, esl_novice, esl_beginner, esl_intermediate, citizenship, sped_ela, basic_math, hiset_math, basic_reading, hiset_reading, basic_writing, hiset_writing)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
    `;
    const preferencesValues = [
      tutorId,
      preferences.conversation,
      preferences.esl_novice,
      preferences.esl_beginner,
      preferences.esl_intermediate,
      preferences.citizenship,
      preferences.sped_ela,
      preferences.basic_math,
      preferences.hiset_math,
      preferences.basic_reading,
      preferences.hiset_reading,
      preferences.basic_writing,
      preferences.hiset_writing,
    ];
    await client.query(preferencesQuery, preferencesValues);

    const filteredAvailability = Object.entries(availability)
      .filter(([day, times]) => times.start_time && times.end_time)
      .map(([day, times]) => ({
        tutor_id: tutorId,
        day,
        start_time: times.start_time,
        end_time: times.end_time
      }));

    if (filteredAvailability.length > 0) {
      const availabilityQuery = `
        INSERT INTO tutor_availability (tutor_id, day, start_time, end_time)
        VALUES ${filteredAvailability.map((_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`).join(', ')}
      `;
      const availabilityValues = filteredAvailability.flatMap(avail => [avail.tutor_id, avail.day, avail.start_time, avail.end_time]);
      await client.query(availabilityQuery, availabilityValues);
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Tutor created successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating tutor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.release();
  }
};