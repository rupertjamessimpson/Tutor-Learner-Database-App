require('dotenv').config();
const e = require('express');
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

exports.deleteMatch = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ success: false, message: 'Match ID is required.' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { rows: match } = await client.query(`
      SELECT tutor_id, learner_id FROM matches WHERE match_id = $1
    `, [id]);

    if (match.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ success: false, message: 'Match not found.' });
    }

    const { tutor_id, learner_id } = match[0];

    await client.query('DELETE FROM matches WHERE match_id = $1', [id]);

    await client.query(`
      UPDATE tutors
      SET available = true
      WHERE tutor_id = $1
    `, [tutor_id]);

    await client.query(`
      UPDATE learners
      SET available = true
      WHERE learner_id = $1
    `, [learner_id]);

    await client.query('COMMIT');
    res.status(200).json({ success: true, message: 'Match deleted and availability updated successfully.' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error deleting match:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    client.release();
  }
};

exports.createOrUpdateMatch = async (req, res) => {
  const { tutor_id, learner_id } = req.body;

  if (!tutor_id || !learner_id) {
    return res.status(400).json({ success: false, message: 'Tutor ID and Learner ID are required.' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { rows: existingMatch } = await client.query(`
      SELECT * FROM matches WHERE tutor_id = $1
    `, [tutor_id]);

    if (existingMatch.length > 0) {
      const previousLearnerId = existingMatch[0].learner_id;

      await client.query(`
        UPDATE matches
        SET learner_id = $1
        WHERE tutor_id = $2
      `, [learner_id, tutor_id]);

      await client.query(`
        UPDATE learners
        SET available = true
        WHERE learner_id = $1
      `, [previousLearnerId]);
    } else {
      await client.query(`
        INSERT INTO matches (tutor_id, learner_id)
        VALUES ($1, $2)
      `, [tutor_id, learner_id]);
    }

    await client.query(`
      UPDATE tutors
      SET available = false
      WHERE tutor_id = $1
    `, [tutor_id]);

    await client.query(`
      UPDATE learners
      SET available = false
      WHERE learner_id = $1
    `, [learner_id]);

    await client.query('COMMIT');
    res.status(200).json({ success: true, message: 'Match created/updated successfully.' });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating/updating match:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  } finally {
    client.release();
  }
};
