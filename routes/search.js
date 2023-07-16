var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const cryptoCtrl = require('../controllers/crypto');

router.get('/', ensureLoggedIn, cryptoCtrl.index);
router.post('/', ensureLoggedIn, cryptoCtrl.create);


module.exports = router;