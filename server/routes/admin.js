import express from 'express';
import Preorder from '../models/Preorder.js';
import { requireAuth, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

// GET /api/admin/preorders
router.get('/preorders', requireAuth, requireAdmin, async (req, res) => {
  try {
    const items = await Preorder.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

// (processed / toggle functionality removed)

// DELETE /api/admin/preorders/:id - delete preorder
router.delete('/preorders/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const p = await Preorder.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'not found' });
    await p.deleteOne();
    res.json({ message: 'deleted', id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

export default router;
