const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: {
        type: Number,
        min: 1,
        max: 3
    },
    cuisine: String,
    priceCategory: {
        type: Number,
        min: 1,
        max: 3
    }
});

const Restaurant = new mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant