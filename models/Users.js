var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
//var debug = require('debug')('memory-book:server');

var UserSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, unique: true},
  hash: String,
  salt: String
  person: {type:mongoose.Schema.Types.ObjectId, ref: 'person' }
  peopleCreated: [{type:mongoose.Schema.Types.ObjectId, ref: 'person' }]
  albumsCreated: [{type:mongoose.Schema.Types.ObjectId, ref: 'album' }]
  memoriesUploaded: [{type:mongoose.Schema.Types.ObjectId, ref: 'memory' }]
  commentsPosted: [{type:mongoose.Schema.Types.ObjectId, ref: 'comment' }]
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
  }, 'SECRET'); /*FIX THIS*/
};

mongoose.model('User', UserSchema);

