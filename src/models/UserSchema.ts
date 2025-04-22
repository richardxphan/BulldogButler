import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
