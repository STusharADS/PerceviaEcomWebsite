import Preorder from '../models/Preorder.js';

export const createPreorder = async (req, res) => {
  try {
    const { name, email, phone, qty, age, city } = req.body;
    if (!name || !email || !phone || !age || !city) {
      return res.status(400).json({ message: 'name, email, phone, age and city are required' });
    }

    const preorder = new Preorder({ name, email, phone, qty: qty || 1, age: Number(age), city: String(city) });
    await preorder.save();

    return res.status(201).json({ message: 'Preorder saved', preorder });
  } catch (err) {
    console.error('Preorder error', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
