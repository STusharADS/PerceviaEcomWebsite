import mongoose from 'mongoose';

const PreorderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  qty: { type: Number, required: true, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

const Preorder = mongoose.model('Preorder', PreorderSchema);
export default Preorder;
