import bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import mongoose from '../../config/database';

export interface IUser extends Document {
  name?: string;
  email?: string;
  password?: string;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
  },
  updated: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
