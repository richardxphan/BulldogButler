import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
