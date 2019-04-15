var mongoose = require('mongoose');

var Schema = mongoose.Schema; //create a variable Schema and declare object schema

var schema = new Schema({  //Describe the schema to the database - create table Product

  user: {type: Schema.Types.ObjectId, ref: 'User'},

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
    required: true
  },
  seller:{
    type: String,
    required: true
  }



});

//mongoose.model('Product2', productSchema);
module.exports = mongoose.model('Product', schema); //create the model produtct.js
