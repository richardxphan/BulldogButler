import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
  userId: { type: String, required: true },
  location: { type: String, required: true },
  serviceType: {
    type: String,
    enum: [
      'Trash',
      'Laundry',
      'Cleaning room',
      'Cleaning bathroom',
      'Grocery Run',
      'Moving Furniture',
      'Tech Help',
      'Other',
    ],
    required: true,
  },
  imageUrl: { type: String, required: true },
  deadline: { type: Date, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);
