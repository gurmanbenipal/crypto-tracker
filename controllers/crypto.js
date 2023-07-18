Crypto = require('../models/crypto');
const fetch = require('node-fetch');
const ROOT_URL = 'https://api.coingecko.com/api/v3';
const Watchlist = require('../models/watchlist');

module.exports = {
  index,
  create
};
//this function is to show us the coin when we search for them 
async function index(req, res, next) {
  const coinId = req.query.coinId;
  if (!coinId) {
    return res.render('search', { coin: null, error: null });
  }
  //in case the user uses all capitals , this will make sure everything is sent in lowercase
  const formattedCoinId = coinId.toLowerCase();

  try {
    const response = await fetch(`${ROOT_URL}/coins/markets?vs_currency=usd&ids=${formattedCoinId}`);
   //here we convert the json response sent by the api to javascript 
    const coinData = await response.json();
    //here we grab the array thatll be given by the api even if its the only array
    const coin = coinData[0];
    //now if the coin is not found we will send back an empty coin array and well show an error
    if (!coin) {
      return res.render('search', { coin: null, error: 'Coin not found' });
    }
    // we are using the built in javascript method to convert the price formate to a more user friendly usd format
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    //now we will just give that formate to our coin price 
    coin.current_price = formatter.format(coin.current_price);
   //now if everything works fine we will send our coin and make sure the error is null because our ejs is excpecting it 
    return res.render('search', { coin, error: null });
// to be safe we will also need a way to catch all errors so here it is  
} catch (error) {
    console.error(error);
    return res.render('search', { coin: null, error: 'An error occurred' });
  }
}
//now we also have to create the coins in our crypto database so lets do that
async function create(req, res) {
  const coinId = req.body.coinId;

  try {
    // same as above we will grab the coin info(array , even if its the only one) , convert the coin data to javascript 
    const response = await fetch(`${ROOT_URL}/coins/markets?vs_currency=usd&ids=${coinId}`);
    const coinData = await response.json();
    const coin = coinData[0];
//if the coin is not found we will throw a 400 
    if (!coin) {
      return res.status(400).send('Coin not found');
    }
//this helps us deal with cryptos that are already in our crypto database
    let existingCrypto = await Crypto.findOne({ id: coin.id });
//so if we dont have it then we will create a new coin in our database
    if (!existingCrypto) {
      existingCrypto = await Crypto.create({
        id: coin.id,
        name: coin.name,
        current_price: coin.current_price,
        image: coin.image
      });
    }

// populate function fetches information about each crypto in the watchlist
    let watchlist = await Watchlist.findOne({ user: req.user._id }).populate('cryptocurrencies');
    // now if the user doesn't have a watchlist we create one for them
    if (!watchlist) {
      watchlist = await Watchlist.create({ user: req.user._id });
    }

// here we create a list of IDs and turn them into strings because it's easier to work with strings than with mongo ObjectId 
    const cryptoIdsInWatchlist = watchlist.cryptocurrencies.map(crypto => crypto._id.toString());
//this is in case the coin alreayd exists in the users watchlist
    if (cryptoIdsInWatchlist.includes(existingCrypto._id.toString())) {
      return res.render('search', { coin: null, error: 'Coin already exists in your watchlist' });
    }
// if it doesnt exist push it
    watchlist.cryptocurrencies.push(existingCrypto._id);
// here we just save our watchlist
    await watchlist.save();

    res.redirect('/watchlist');

 
} catch (error) {
    console.error(error);
    res.status(500).send('An error occurred: ' + error.message);
  }
}