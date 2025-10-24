import express from 'express';
import Preorder from '../models/Preorder.js';
import { requireAuth, requireAdmin } from '../middlewares/auth.js';

const router = express.Router();

// GET /api/admin/preorders
router.get('/preorders', requireAuth, requireAdmin, async (req, res) => {
  try {
    // return unprocessed orders first, then processed; newest first within each group
    const items = await Preorder.find().sort({ processed: 1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

// PATCH /api/admin/preorders/:id - toggle processed state
router.patch('/preorders/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const p = await Preorder.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'not found' });
    p.processed = !p.processed;
    await p.save();
    res.json({ message: 'updated', preorder: p });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
});

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
