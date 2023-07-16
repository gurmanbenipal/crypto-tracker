const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const watchlistCtrl = require('../controllers/watchlist');

router.get('/', ensureLoggedIn, watchlistCtrl.index); 
router.post('/', ensureLoggedIn, watchlistCtrl.create);
router.delete('/:id', ensureLoggedIn, watchlistCtrl.delete);

router.put('/:id/update', ensureLoggedIn, watchlistCtrl.update);


module.exports = router;