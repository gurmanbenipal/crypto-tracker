const express = require('express');
const router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', ensureLoggedIn, function(req, res, next) {
    res.render('search');
  });
  
module.exports = router;