
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHsb = require('express-handlebars');//store handlesbars templating engine third-party package, which offers more features than the built-in one
var routes = require('./routes/index');
var userRoutes = require('./routes/user');

var about = require('./routes/about');
var mongoose = require('mongoose'); //work with mongodb, offers extras  - facility
var session = require('express-session'); //handle session
var passport = require('passport');// use for user management user authentication login. signup .
var flash = require('connect-flash'); //storage message in the session - can be show in the view
var validator = require('express-validator'); //validate
var nodemailer = require('nodemailer');
var contact = require('./routes/contact');
var product_controller = require('./routes/product_controller');
const bodyparser = require('body-parser');
var $ = require("jquery");

var MongoStore = require('connect-mongo')(session); //import mongo store

var app = express();
//mongoose.connect('mongodb://localhost:27017/shopping');
mongoose.connect("mongodb://localhost:27017/shopping_1", { useNewUrlParser: true });



require('./config/passport');// from config file settings
//require('./product_model');


// view engine setup
app.engine('.hbs', expressHsb({defaultLayout: 'layout', extname: '.hbs'})); //handlebars set up - default layout  - extend layout
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(bodyparser.urlencoded({
  extended: true //allows to extend body with data in it  and false onluy to simple body  url encode data
}));
app.use(bodyparser.json()); //easily readable

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(session({ //able sessions //save sessions //set sessions
      secret: 'mysupersecret', //
      resave: false, //default is deprecated, this session will be a server on on each request no matter if something changed or not
      saveUninitialized: false, //if the session is true the session will be stored or in a server even though, it might not have been initialized that nothing has been added
      store: new MongoStore({ mongooseConnection: mongoose.connection}),
      cookie: {maxAge: 180 * 60 * 1000 } // how long the session expire  -
    }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); //store the users
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',  express.static('uploads'));
app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated(); //npm install  // passport-local - middlware execute all request, default express default
  res.locals.session = req.session; // handlebars to access session


  next();
});

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});



app.use('/user', userRoutes);
app.use('/', routes);
//app.use('/info/contact', contact);
app.use('/info/contact', contact);
app.use('/info/about', about);
app.use('/product', product_controller );



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
