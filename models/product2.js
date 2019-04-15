var mongoose = require('mongoose');

var Schema = mongoose.Schema; //create a variable Schema and declare object schema

var schema = new Schema({  //Describe the schema to the database - create table Product
  product_name: {
    type: String,
    required: 'This field is required'
  },
  description:{
    type: String
  },
  price:{
    type: Number,
    required: 'This field is required'
  },
  imagePath:{
    type: String,
    required: false
  }

});

module.exports = mongoose.model('Product2', schema); //create the model produtct.js
