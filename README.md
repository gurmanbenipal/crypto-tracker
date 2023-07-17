# CRYPTO TRACKER 🤑

Welcome to Crypto Tracker! This application allows you to keep track of your favorite cryptocurrencies in a user-friendly and efficient manner. Keep a tab on your top choices, use a dark mode for more comfort, and get started with the help of Google authentication. Stay up to date with the most recent prices with just a click :)
## Features
- Search for a specific cryptocurrency.
- Add your favorite coins to a personal watchlist.
- Update the price of cryptocurrencies in your watchlist with one click.
- Delete a cryptocurrency from your watchlist if you no longer want to track it.
- A handy dark mode for use during any time of the day.
- Google authentication to keep your watchlist safe and personal.
- Preferences, like dark mode on/off, are saved per account.


## Technologies Used 👨🏻‍💻
<img src="tech/html-5.png" alt="HTML5" width="50" height="45"> <img src="tech/css-3.png" alt="CSS" width="50" height="45"> <img src="tech/js.png" alt="JS" width="35" height="35"> <img src="tech/Visual_Studio_Code_1.35_icon.svg.png" alt="VS CODE" width="35" height="35"> <img src="tech/github-sign.png" alt="GIT HUB" width="35" height="35"> <img src="tech/node-js.png" alt="NODE JS" width="35" height="35"> <img src="tech/heroku.png" alt="HEROKU" width="35" height="35">



## Getting Started

1. [CLICK HERE TO START TRACKING!](https://crypto-market-tracker-7ca001d4954d.herokuapp.com/) 
2. Sign in using Google authentication.
3. Search for a cryptocurrency.
4. Add it to your personal watchlist.

## Application Instructions

1. Sign in using your Google account.
2. Use the search bar to find your favorite cryptocurrencies.
3. Click on the 'Add to watchlist' right under the cryptocurrency to add it to your watchlist.
4. Access your watchlist anytime to see a quick overview of your preferred cryptocurrencies.
5. Click the 'Update Price' button right under the delete button in your watchlist to fetch the most recent price.
6. Click the 'Delete' button right below the cryptocurrency in your watchlist to remove it.
7. Use the toggle at the top-left corner to switch between light and dark mode according to your preference.

## Screenshots 📸

## Landing Page
<img src="screenshots/Screenshot 2023-07-17 at 1.47.04 PM.png" alt="landing page" width="500" height="400">

## Search Page
<img src="screenshots/Screenshot 2023-07-17 at 1.47.12 PM.png" alt="search page" width="500" height="400">

## Search Page "DARK MODE"
<img src="screenshots/Screenshot 2023-07-17 at 1.47.19 PM.png" alt="search page dark mode" width="500" height="400">

## After you search!
<img src="screenshots/Screenshot 2023-07-17 at 1.47.31 PM.png" alt="after you search" width="500" height="400">

## After you search! "DARK MODE"
<img src="screenshots/Screenshot 2023-07-17 at 1.47.26 PM.png" alt="after you search dark mode" width="500" height="400">

## Your Watchlist
<img src="screenshots/Screenshot 2023-07-17 at 1.47.43 PM.png" alt="your watchlist" width="500" height="400">

## Your Watchlist "DARK MODE"
<img src="screenshots/Screenshot 2023-07-17 at 1.47.50 PM.png" alt="your watchlist dark mode" width="500" height="400">





## CODE PREVIEW! 🔬 (SEARCHING FOR A COIN USING AN API) 
```javascript
 
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

```

## Upcoming Features
- Notifications when a cryptocurrency hits a certain price
- Switch between multiple currencies
- Option to share your watchlist with others
- Add a feature to buy or sell coins directly through the application

## Trello Link
[ Click here ](https://trello.com/b/FRqTtLss/crypto-market-tracker)

## Data credits 

- [ Cryptocurrency data ](https://www.coingecko.com/en/api) : CoinGecko API provides a comprehensive set of data regarding various cryptocurrencies.

Please feel free to submit any bug reports. Enjoy tracking your cryptocurrencies with Crypto Tracker!.