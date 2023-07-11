var express = require('express');
var router = express.Router();
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});




// Google OAuth login route
router.get('/auth/google', passport.authenticate(
    // Which passport strategy is being used?
    'google',
    {
      // Requesting the user's profile and email
      scope: ['profile', 'email'],
      // Optionally force pick account every time
      // prompt: "select_account"
    }
  ));
  
  // Google OAuth callback route
  router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      //send them to the search page after they log in
      successRedirect: '/search',
      //send them back to the landing page if they dont log in
      failureRedirect: '/'
    }
  ));
  
  // OAuth logout route
  router.get('/logout', function(req, res){
    req.logout(function() {
      //will send them to my landing page when they log out
        res.redirect('/');
    });
  });






module.exports = router;
