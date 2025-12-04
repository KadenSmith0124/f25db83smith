var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account');

// INDEX PAGE
router.get('/', function (req, res) {
  res.render('index', { title: 'Spell App', user: req.user });
});

// REGISTER PAGE
router.get('/register', function(req, res) {
  res.render('register', { title: 'Spell App Registration' });
});

// REGISTER POST
router.post('/register', function(req, res) {
  Account.findOne({ username: req.body.username })
    .then(function(existing) {
      if (existing) {
        return res.render('register', {
          title: 'Registration',
          message: 'Existing User',
          account: req.body.username
        });
      }

      let newAccount = new Account({ username: req.body.username });

      Account.register(newAccount, req.body.password, function(err, user) {
        if (err || !user) {
          return res.render('register', {
            title: 'Registration',
            message: 'access error',
            account: req.body.username
          });
        }

        res.redirect('/');
      });
    });
});

// LOGIN PAGE
router.get('/login', function(req, res) {
  res.render('login', { title: 'Spell App Login', user: req.user });
});

// LOGIN POST
router.post('/login', passport.authenticate('local'), function(req, res) {
  if (req.session.toReturn) {
    let toReturn = req.session.toReturn;
    req.session.toReturn = null;
    return res.redirect(toReturn);
  }
  res.redirect('/');
});

// LOGOUT
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// PING (test endpoint)
router.get('/ping', function(req, res) {
  res.status(200).send("pong!");
});

module.exports = router;