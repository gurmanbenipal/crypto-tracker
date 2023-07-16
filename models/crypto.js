const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cryptoSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    current_price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
  timestamps: true
});

let Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;

