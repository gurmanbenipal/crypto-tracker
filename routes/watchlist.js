const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
let watchlistCtrl = require('../controllers/watchlist');

router.get('/', ensureLoggedIn, watchlistCtrl.index); 
router.post('/', ensureLoggedIn, watchlistCtrl.create);

router.delete('/:id',watchlistCtrl.delete);


module.exports = router;