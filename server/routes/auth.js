import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// POST /api/auth/register (optional, mainly for dev)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'user exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name: name || '', email, passwordHash: hash, role: role || 'user' });
    await user.save();
    res.json({ message: 'registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'invalid credentials' });
    const ok = await user.verifyPassword(password);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

export default router;
