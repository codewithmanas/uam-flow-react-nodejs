import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { authClient } from '../db/authQuery.js';
// import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Router-level middleware
router.use((req, res, next) => {
  console.log('This runs for router-specific routes');
  next();
});

// Register route
router.post('/register', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authClient.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    // res.status(500).json({ message: 'Server error.' });
    next(err); // Pass the error to the global error handler
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authClient.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'User loggedin successfully.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});


export default router;
