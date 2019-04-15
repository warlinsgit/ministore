var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('info/about', {
    title: 'About Page'
  });

});

module.exports = router;
