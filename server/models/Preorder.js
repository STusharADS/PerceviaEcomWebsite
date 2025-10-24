import mongoose from 'mongoose';

const PreorderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  qty: { type: Number, required: true, default: 1 },
  processed: { type: Boolean, default: false },
  age: { type: Number },
  city: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Preorder = mongoose.model('Preorder', PreorderSchema);
export default Preorder;
