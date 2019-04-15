var express = require('express');
var router = express.Router();

var csrf = require('csurf'); //it make sure our session can't get stolen - if stolen users aren't able to create users with our session or use our assigned in session and so on  - protect to be stolen
var passport = require('passport');
var auth = require('../config/auth');
var Order = require('../models/order');
var Cart = require('../models/cart');
var Cart = require('../models/cart');
var csrfProtection = csrf(); //create middleware for csrf token creation and validation. npm install csurf
router.use(csrfProtection); // all routers, should be protected by CSRF protection
var isUser = auth.isUser;
var isAdmin = auth.isAdmin;

// get the profile page after if user click in his profile link - user/profile
router.get('/profile', isLoggedIn, function(req, res, next){
    Order.find({user: req.user}, function(err, orders){
      if(err){
        return res.write('Error');
      }
      var cart;
      orders.forEach(function(order){
        cart = new Cart(order.cart);
        order.items = cart.generateArray();
      });
      res.render('user/profile', { orders: orders });
    });

});


// display all orders purchased - user/allorders -  only admin are able to access
router.get('/allorders', isAdmin, function(req, res, next){
    Order.find( function(err, orders){
      if(err){
        return res.write('Error');
      }
      var cart;
      orders.forEach(function(order){
        cart = new Cart(order.cart);
        order.items = cart.generateArray();
      });
      res.render('user/allorders', { orders: orders });
    });

});




router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next){
    next();
});

// get the register  form
router.get('/signup', function(req, res, next){
  var messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
// register form
router.post('/signup', passport.authenticate('local.signup', {

    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next){
  if (req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);

  }else{
    res.redirect('/user/profile');
  }
});

// get the login form to sign in
router.get('/signin', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});
// after user complete sign in form, they are redirected to the shop/index
router.post('/signin', passport.authenticate('local.signin', {
  //successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true

}), function(req, res, next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }else{
    res.redirect('/');
  }
});


router.get('/login', function(req, res, next){
    var messages = req.flash('error');
    res.render('user/login', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});

});

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
