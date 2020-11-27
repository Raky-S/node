const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: String,
  tag: String,
  price: Number,
  productPicture: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  cities: {
    type: String,
    enum: ['paris', 'lyon', 'marseille'],
    required: true,
},
});


const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;

