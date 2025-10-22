import express from 'express';
import { createPreorder } from '../controllers/preorderController.js';

const router = express.Router();

router.post('/', createPreorder);

export default router;
