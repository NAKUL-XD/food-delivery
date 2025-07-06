import mongoose from 'mongoose'; // ❗ Typo fixed: moongoose → mongoose

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  cartData: { type: Object, default: {} },

}, { minimize: false }); // Keep empty objects in MongoDB

const userModel = mongoose.models.User || mongoose.model('User', userSchema); // ❗ Use mongoose.models

export default userModel;
