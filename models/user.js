var mongoose = require('mongoose');

var Schema = mongoose.Schema; //create a variable Schema and declare object schema
var bcrypt = require('bcrypt-nodejs'); // easily hash password

var userSchema = new Schema({

  email: {type: String, required: true},
  password: {type: String, required: true},
  admin: {type: Number}


});

userSchema.methods.encryptPassword = function(password){ //npm install bcrypt-nodejs  - encript password
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);

};
// check if the password match the password
userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
