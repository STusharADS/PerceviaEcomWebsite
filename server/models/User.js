import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, { timestamps: true });

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
}

const User = mongoose.model('User', userSchema);
export default User;
