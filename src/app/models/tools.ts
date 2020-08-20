import bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import mongoose from '../../config/database';

export interface ITools extends Document {
  name?: string;
  email?: string;
  password?: string;
}

const ToolsSchema = new mongoose.Schema({
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

const Tools = mongoose.model<ITools>('Tools', ToolsSchema);

export default Tools;
