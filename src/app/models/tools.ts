import { Document } from 'mongoose';
import mongoose from '../../config/database';

export interface ITools extends Document {
  title: string;
  link: string;
  description: string;
  tags: [string];
  user: string;
}

const ToolsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  updated: { type: Date, default: Date.now },
});

const Tools = mongoose.model<ITools>('Tools', ToolsSchema);

export default Tools;
