require('dotenv').config();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


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

exports.getUserById = async (req, res) => {
	const id = req.params.id;
	try {
		const userQuery = 'SELECT * FROM users WHERE user_id = $1';
		const userResult = await pool.query(userQuery, [id]);
		const user = userResult.rows[0];

		if (user) {
			res.json({ user });
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ err: 'Internal Server Error' });
	}
};

exports.createUser = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;
	try {
		const newUser = await pool.query(`
			INSERT INTO users (first_name, last_name, email, password)
			VALUES ($1, $2, $3, $4)
			RETURNING *;
		`, [first_name, last_name, email, password]);
		res.json(newUser.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
}

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM users WHERE user_id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateUser = async (req, res) => {
	const id = req.params.id;
	const { first_name, last_name, email, password } = req.body;
	try {
		const updatedUser = await pool.query(`
			UPDATE users
			SET first_name = $1, last_name = $2, email = $3, password = $4
			WHERE user_id = $5
			RETURNING *;
		`, [first_name, last_name, email, password, id]);
		res.json(updatedUser.rows[0]);
	} catch (error) {
		console.error(error.message);
	}
}
