const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean, // For admin privileges
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { User, Product };
