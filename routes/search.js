var express = require('express');
var router = express.Router();
//we need fetch to grab data from the api
const fetch = require('node-fetch');
const ensureLoggedIn = require('../config/ensureLoggedIn');


//this is the api url we will use
const ROOT_URL = 'https://api.coingecko.com/api/v3';

//this will take us to the search page and it will ensure you are logged in before running the function after it
router.get('/', ensureLoggedIn,async function(req, res, next) {
  //this line will grab the coinid 
    let coinId = req.query.coinId;
  //this line makes sure that if there is no coinid they wont see any data
    if (!coinId) return res.render('search', { coin: null, error: null });
  //this will ensure the request still works in case the user uses any capital letters
  coinId = coinId.toLowerCase();
  try {
    //this is where we use fetch, so here we are mentioning the currency and the coinid we want
    const response = await fetch(`${ROOT_URL}/coins/markets?vs_currency=usd&ids=${coinId}`);
    //this line will just convert the data we get from coingecko which is in json format. the line will convert it to javascript so we can use it
    const coinData = await response.json();

    // apis give us an array with the info we want even if we just want one id(coin for this project) so using[0] we can access that array even if its the only one
    let coin = coinData[0];
    //this line just makes sure in case there is no coin found we'll get an error saying coin not found
    //also coin: null because ejs still expects data even if its not found so doing coin: null deals with that so we wont get any errors
    if (!coin) {
      return res.render('search', { coin: null, error: 'Coin not found' });
    }
   //here we are just using a built in javascript object called Intl.NumberFormat to convert a number to a currency and we make sure we do a usd format 
    const formatter = new Intl.NumberFormat('en-US', {
      //style and currency are built in Intl.NumberFormat
      style: 'currency',
      currency: 'USD',
    });
    //here we are using a format method on the formatter object which will assign the more user friendly value to  coin.current_price  which can be displayed on the webpage
    coin.current_price = formatter.format(coin.current_price);
//now we can just pass the data to our search.ejs and make sure to do error: null because our ejs will be expecting it and if you dont say null, it can give us an error
    return res.render('search', { coin, error: null });
//this is just in case anything goes wrong while we are trying to get our data, itll show the user the erro message
  } catch (error) {
   
   //this is just for the developer to know an error happened
    console.error(error);
    //and this is for the user
    return res.render('search', { coin: null, error: 'An error occurred' });
  }
});

module.exports = router;
