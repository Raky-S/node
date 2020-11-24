const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const ProductSchema = new mongoose.Schema({
  productName: String,
  tag: String,
  price: Number,
  productPicture: String,
});

ProductSchema.plugin(passportLocalMongoose);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;