import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/vuttr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

export default mongoose;
