var passport = require('passport');

var User = require('../models/user');

var LocalStrategy = require('passport-local').Strategy;
//how to store user in the session -
passport.serializeUser(function(user, done) {

    done(null, user.id); //serialise user by id
});
//retrieve the user
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
// find in mongo db
      done(err, user);

    });
});
// start create user - strategy - Validation for the login
passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid passowrd').notEmpty().isLength({min:4});
    var errors = req.validationErrors(); //check if any error appeard
    if (errors){
      var messages = [];
      errors.forEach(function(error) {
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err, user){
      if(err){
        return done(err);
      }
      if(user){
        return done(null, false, {message: 'Email is already in use.'});
      }
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.admin = 1;
      newUser.save(function(err, result){
        if(err){
          return done(err);
        }
        return done(null, newUser);
      });
    });
}));
passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',

  passReqToCallback: true
}, function(req, email, password, done){
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors){
      var messages = [];
      errors.forEach(function(error) {
        messages.push(error.msg);
      });
      return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err, user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null, false, {message: 'No user found.'});
      }
      if(!user.validPassword(password)){
        return done(null, false, {message: 'Wrong password'});
      }

      return done(null, user);


    });
}));
