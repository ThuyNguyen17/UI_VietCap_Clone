const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.resolve(__dirname, 'db.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    full_name TEXT,
    is_active INTEGER DEFAULT 0,
    otp TEXT
  )`);
});

// Helper for JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
};

// Routes
app.post('/api/auth/register', async (req, res) => {
  const { email, password, full_name } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  db.run(`INSERT INTO users (email, password, full_name, otp) VALUES (?, ?, ?, ?)`, 
    [email, hashedPassword, full_name, otp], 
    function(err) {
      if (err) {
        if (err.message.includes('UNIQUE')) return res.status(400).json({ message: 'Email already exists' });
        return res.status(500).json({ message: 'Database error' });
      }
      res.json({ message: 'User registered. Please verify your email.', user_id: this.lastID, requires_verification: true });
    }
  );
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.is_active) {
        return res.json({ requires_verification: true, message: 'Please verify your email' });
    }

    const token = generateToken(user);
    res.json({ access_token: token, user: { id: user.id, email: user.email, full_name: user.full_name } });
  });
});

app.post('/api/auth/otp/send', (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  db.run(`UPDATE users SET otp = ? WHERE email = ?`, [otp, email], (err) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    console.log(`OTP for ${email}: ${otp}`); // Log to console for development
    res.json({ message: 'OTP sent to email (check console)' });
  });
});

app.post('/api/auth/verify-email', (req, res) => {
  const { email, otp } = req.body;
  db.get(`SELECT * FROM users WHERE email = ? AND otp = ?`, [email, otp], (err, user) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (!user) return res.status(400).json({ message: 'Invalid OTP' });

    db.run(`UPDATE users SET is_active = 1, otp = NULL WHERE id = ?`, [user.id], (err) => {
      const token = generateToken(user);
      res.json({ access_token: token, message: 'Email verified successfully' });
    });
  });
});

app.get('/api/users/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    db.get(`SELECT id, email, full_name FROM users WHERE id = ?`, [decoded.id], (err, user) => {
        if (err || !user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
