var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var Product = require('../models/product');
var validator = require('express-validator')
var Cart = require('../models/cart');
var Order = require('../models/order');
var User = require('../models/user');
const bodyparser = require('body-parser');
var auth = require("../config/auth");
var isUser = auth.isUser;
var isAdmin = auth.isAdmin;




var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname);
  }
});

var fileFilter = (req, file, cb) => {
  // reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else
  {
    cb(null, false);
  }

};

var upload = multer({storage: storage, limits:{
  fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
});

/*get addgame page product/product */
router.get('/',  isAdmin, (req, res)=>{

  res.render('product/product', {

    viewTitle: "Insert Game"
  });
});
/*Insert game form   - product/product */
router.post('/', upload.single('avatar'), function(req, res){
  var successMsg1 = req.flash('success')[0];
  req.checkBody('product_name', 'At least 6 caracters for the game name.').isLength({min: 5});
  req.checkBody('description', 'At the least 15 caracters for the description').isLength({min:10});

  req.checkBody('price', 'Accept only numbers for the price field').isNumeric();

  //req.checkBody('seller', 'Please add your name').isLength({min: 2});
  //req.checkBody('imagePath', 'Game Picture - Please upload an image Jpeg, Png.').isImage(restImage);

  // Get Errors
  var errors = req.validationErrors();


  if(errors){

     res.render('product/product',{
       title: 'Add Game',
        errors:errors

      });
  }else{
  var product = new Product();
  product.product_name = req.body.product_name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.imagePath = req.file.path;
  product.seller = req.user._id;

    product.save(function(err){
      if(err){

        console.log(err);
        return;
      }else{
        req.flash('success', 'Game added!');
          res.redirect('/');
        }
          });
        }
      });

      // Load Edit Form product/list
      router.get('/edit/:id', isAdmin, upload.single('avatar'), function(req, res){

        Product.findById(req.params.id, function(err, product){
            var messages = req.flash('error');
            if(product.seller != req.user._id){
              //return res.status(401).json({
              //  message: "You are not allowed"
            //  });

            return res.status(401).redirect('/product/list');

          }

          res.render('product/edit', {
            viewTitle:'Update Game',

            product:product
          });
        });
      });




//post update form // send to index page after update
      router.post('/edit',  upload.single('avatar'), function(req, res){
        Product.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc)=>{
            //var successMsg1 = req.flash('success')[0];
          if(!err)
          {
              req.flash('success', 'Game Updated!');
            res.redirect('/');


          }else{
            if(err.product_name == 'ValidationError'){
              handleValidationError(err, req.body);

              res.render("product/product", {
                viewTitle: 'Update Product',
                product: req.body


              });
            }
            else {
              console.log('Error during record update: ' + err);
            }
          }
        });

      });


//https://grokonez.com/node-js/nodejs-express-mongodb-one-to-many-related-models

// list all games saved in the database

router.get('/list',  (req, res) =>{
  //res.json('from list');

  Product.find((err, products)=>{


    if(!err){

      res.render('product/list', {
        list: products
      });

    }
    else{
      console.log('Error in retrieving product list: ' +err);
    }
  });
});

// in the product/list page - if game correspond to the user admin, it can be deleted.
router.get('/delete/:id', isAdmin, (req, res) => {

  if(!req.user._id){
       return res.status(401).redirect('/product/list');
     }

     let query = {_id:req.params.id}

     Product.findById(req.params.id, function(err, product){
       if(product.seller != req.user._id){
           return res.status(401).redirect('/product/list');
       } else {
         Product.remove(query, function(err){
           if(err){
             console.log(err);
           }

           //res.render('/product/list');
           res.redirect('/product/list');
         });
       }
     });
   });

// function to control access to the paths 

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

module.exports = router;
