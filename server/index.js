import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import preorderRoutes from './routes/preorder.js';

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
