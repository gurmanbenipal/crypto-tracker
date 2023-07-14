var express = require('express');
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
let userCtrl = require('../controllers/user');

router.put('/:id', ensureLoggedIn, userCtrl.update);
module.exports = router;
