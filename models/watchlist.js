const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    cryptocurrencies: [{
      type: Schema.Types.ObjectId,
      ref: 'Crypto'
    }]
}, {
    timestamps: true
  });
  
let Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
