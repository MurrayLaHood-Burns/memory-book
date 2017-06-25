var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var fs = require('fs');
//var debug = require('debug')('memory-book:server');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  email: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String,
  joined: Date,
  albums: [{type:mongoose.Schema.Types.ObjectId, ref: 'album' }],
  comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'comment' }]
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, fs.readFileSync('.jwt-key/key'));
};

mongoose.model('user', UserSchema);

