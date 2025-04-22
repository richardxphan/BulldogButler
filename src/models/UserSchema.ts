import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
<<<<<<< HEAD
  password: { type: String, required: true }
=======
  password: { type: String, required: true },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
>>>>>>> parent of 243d199a (Merge pull request #16 from richardxphan/login-backend)
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
