import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import preorderRoutes from './routes/preorder.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Percevia API');
});

app.use('/api/preorders', preorderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Seed admin user if not exists (DEV convenience)
async function seedAdmin(){
  try{
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@percevia.local';
    const pass = process.env.SEED_ADMIN_PASS || 'password123';
    const exists = await User.findOne({ email });
    if (!exists){
      const hash = await bcrypt.hash(pass, 10);
      await User.create({ email, passwordHash: hash, role: 'admin' });
      console.log('Seeded admin user', email);
    }
  }catch(err){ console.error('seed admin error', err) }
}
seedAdmin();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
