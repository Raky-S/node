const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const ProductSchema = new mongoose.Schema({
  productName: String,
  Tag:String,
  ref: Number,
});

ProductSchema.plugin(passportLocalMongoose);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;