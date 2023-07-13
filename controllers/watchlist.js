const Watchlist = require('../models/watchlist');
const fetch = require('node-fetch');

module.exports = {
    create,
    index
}

async function create(req, res){
    let coinId = req.body.coinId;

    try {
        let response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}`);
        let coinData = await response.json();
        let coin = coinData[0];

        if (!coin) {
            return res.status(400).send('Coin not found');
        }

        await Watchlist.create({
            id: coin.id,
            name: coin.name,
            current_price: coin.current_price
        });

        res.redirect('/watchlist');
    } catch(err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
}

async function index(req, res){
    try {
        let coins = await Watchlist.find({});
        res.render('watchlist', { coins });
    } catch(err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
}
