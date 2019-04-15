var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
const bodyparser = require('body-parser');
var Product = require('../models/product');
var Order = require('../models/order');


// Search for the main page //shop/index shop/search
router.get('/search', function(req, res, next) {

  //eval(require('locus'));
  var noMatch = null;
  if(req.query.search){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
     // Get all produtcs from DB
    Product.find({product_name: regex}, function(err, allProducts){

    if(err){
      console.log(err);

    }else{
      if(allProducts.length < 1) {

                noMatch = "No Games match that query, please try again.";

    }
    res.render("shop/search", {products:allProducts, noMatch: noMatch});
  }
  });

} else {
        // Get all searches from Db
        Product.find({}, function(err, allProducts){
           if(err){
               console.log(err);
           } else {
              res.render("shop/search",{products:allProducts, noMatch: noMatch});
           }
        });
    }
});



/* GET home page index. */
router.get('/', function(req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    var productChunks = []; //create array - first go to index.hbs and add  {{# products}} product  {{ each }}
    var chunkSize = 3; // create 3 items and split to the next row  - loop
    for(var i = 0; i < docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', { title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg });

  });
});


router.get('/add-to-cart/:id', function(req, res, next){ //cart object in the session
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  Product.findById(productId, function(err, product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});


/* reduce item in the cart 1 by one. */
router.get('/reduce/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});
/* reduce all items in the . button disabled in the form  */
router.get('/remove/:id', function(req, res, next){
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});
/*get shopping cart page  - shop/shopping-cart */
router.get('/shopping-cart', function(req, res, next){
  if (!req.session.cart){
  return res.render('shop/shopping-cart', {products: null});
}
var cart = new Cart(req.session.cart);
res.render('shop/shopping-cart', { products: cart.generateArray(), totalPrice: cart.totalPrice});

});
/*get checkout page  - shop/checkout */
router.get('/checkout', isLoggedIn, function(req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart')
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noErrors: !errMsg});

});
/* form to conclude shopping  */
router.post('/checkout', isLoggedIn, function (req, res, next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")("sk_test_nEDClzT0xF4G4grjhkVZhZrP");

stripe.charges.create({
  amount: cart.totalPrice * 100,
  currency: "eur",
   source: "tok_mastercard", // obtained with Stripe.js
  description: "Test Charge"
}, function(err, charge) {
  if(err){
    req.flash('error', err.message);
    return res.redirect('/checkout');
  }
  var order = new Order({
    user: req.user,
    cart: cart,
    address: req.body.address,
    name: req.body.name,
    paymentId: charge.id
  });
  order.save(function(err, result){

  req.flash('success', 'Sucessfully bought product!');
  req.session.cart = null;
  res.redirect('/');
});
});
});

// function for the main search function
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = router;
// function for the session - control user access
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
