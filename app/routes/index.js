var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var passport = require('passport');
var validate = require('validate');
var User = mongoose.model('User');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var router = express.Router();
var logger = require('logger');
var messages = require('messages');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST sign up */
router.post('/register', function(req, res, next) {

  // error check fields
  if(!validate.username(req.body.username)){
    logger.warn(req.logTag, messages.usage.username, {
      username: req.body.username
    });

    return res.status(400).json(messages.usage.username);
  }

  if(!validate.email(req.body.email)){
    logger.warn(req.logTag, messages.usage.email, {
      email: req.body.email
    });

    return res.status(400).json(messages.usage.email);
  }

  if(!validate.password(req.body.password)){
    logger.warn(req.logTag, messages.usage.password);

    return res.status(400).json(messages.usage.password);
  }

  next();
}, function(req, res, next) {

  User.findOne({$or: [{ 'username' : req.body.username},{'email' : req.body.email}]}, function(err, user){
    if(err) { return next(err); }
    if(user){
      if(user.username === req.body.username){
        logger.warn(req.logTag, messages.conflict.username(req.body.username));

        return res.status(400).json(messages.conflict.username(req.body.username));
      } else if(user.email === req.body.email){
        logger.warn(req.logTag, messages.conflict.email(req.body.email));

        return res.status(400).json(messages.conflict.email(req.body.email));
      } else {
        err = new Error('This shouldn\'t happen. ' + user);
        return next(err);
      }
    }

    next();
  });
}, function(req, res, next) {

  var user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  
  user.save(function (err){
    if(err){ return next(err); }

    logger.info(req.logTag, messages.success.newUser(user.username));

    return res.json({token: user.generateJWT()});
  })
});

/* POST sign in */
router.post('/login', function(req, res, next){

  if(!req.body.username || !req.body.password){
    logger.warn(req.logTag, messages.usage.missingFields);
    return res.status(400).json(messages.usage.missingFields);
  }

  passport.authenticate('local', function(err, user, info){

    if(err){ return next(err); }

    if(!user){ 
      logger.warn(req.logTag, info);
      return res.status(401).json(info); }

    return res.json({token: user.generateJWT()});
  })(req, res, next);
});


module.exports = router;
