const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let watchlistSchema = new Schema({
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
});

let Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
