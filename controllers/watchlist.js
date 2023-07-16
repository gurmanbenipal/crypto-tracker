const Watchlist = require('../models/watchlist');
const Crypto = require('../models/crypto');
const fetch = require('node-fetch');


module.exports = {
  create,
  index,
  delete: deleteWatchlist,
  update
};

// this helps us delete the coins we dont want anymore 
async function deleteWatchlist(req, res) {
  try {
    // now lets grab the id of the coin we want to remove
    const cryptoId = req.params.id;
     // here we find our users wtahclist and pull out the coin we dont want anymore
    //$pull is built in mongoose, its a lot more efficient and fast because it does things o the server side
    await Watchlist.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { cryptocurrencies: cryptoId } }
    );

    // here we remove the coin
    await Crypto.findByIdAndRemove(cryptoId);

    // when done we go back to our watchlist
    res.redirect('/watchlist');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
}


async function create(req, res) {
  // grab the id of the coin we want to create
  const coinId = req.body.coinId;

  try {
    // now lets see if the coin already exits
    const existingCrypto = await Crypto.findOne({ id: coinId });
    if (existingCrypto) {
      //if it does we will let our user know that
      return res.status(400).send('Crypto already exists');
    }

    // here we find our users watchlist
    let watchlist = await Watchlist.findOne({ user: req.user._id });
    if (!watchlist) {
      // if there is no watchlist we make one
      watchlist = await Watchlist.create({ user: req.user._id });
    }

    // now we just add the coin to our watchlist
    watchlist.cryptocurrencies.push(coinId);
    //now lets save it
    await watchlist.save();

    // after saving lets go to our watchlist
    res.redirect('/watchlist');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
}

//this will help us display all our coins
async function index(req, res) {
  try {
    //now we search for our users watching list and grab all the info bout each coin
    let watchlist = await Watchlist.findOne({ user: req.user._id }).populate('cryptocurrencies');

    if (!watchlist) {
      //now if theres no watchlist we just create one 
      watchlist = await Watchlist.create({ user: req.user._id });
    }

    // this helps us show our prices in a more user friendly usd format
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    // We transform each coin in the watchlist to display its details and price in a nice format.
    //we are just creating copy so we dont mess around with the orignal in our database
    //._doc is built in mongoose it helps us grab raw info
    const coins = watchlist.cryptocurrencies.map(coin => ({
        ...coin._doc,
        current_price: formatter.format(coin.current_price),
      }));
  
      
    res.render('watchlist', { coins });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
}

// this will help us update to the latest price 
async function update(req, res) {
  try {
    // lets grab the id of the coin we want to update
    const cryptoMongoId = req.params.id; 

    // now lets look for the coin in our database
    const crypto = await Crypto.findById(cryptoMongoId);

    // lets grab the latest data using our api
    const coinId = crypto.id;
    const ROOT_URL = 'https://api.coingecko.com/api/v3';
    const response = await fetch(`${ROOT_URL}/coins/markets?vs_currency=usd&ids=${coinId}`);
    const coinData = await response.json();
    const coin = coinData[0];

    // here we update our price to the latest price and then we save it 
    crypto.current_price = coin.current_price;
    await crypto.save();


    res.redirect('/watchlist');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
}
