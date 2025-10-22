import express from 'express';
import dotenv from 'dotenv';


import connectDB from './config/db.js';
const app = express();
const port = 3000;
dotenv.config();
console.log(process.env.MONGO_URI);
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
