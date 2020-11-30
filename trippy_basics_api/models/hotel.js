const mongoose = require('mongoose');


const HotelSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: {
        type: Number,
        min: 1,
        max: 5
    },
    hasSpa: Boolean,
    hasPool: Boolean,
    priceCategory: {
        type: Number,
        min: 1,
        max: 3
    }
});

const Hotel = new mongoose.model('Hotel', HotelSchema);

module.exports = Hotel