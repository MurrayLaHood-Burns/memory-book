var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var passport = require('passport');
var validate = require('validate');
var shortid = require('shortid');
var User = mongoose.model('User');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var router = express.Router();
var logger = require('logger');
var messages = require('messages');


/* GET home page. */
router.get('/', function(req, res, next) {
  logger.verbose('GET /', {
    body: req.body
  });


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

  User.findOne({$or: [{ 'username' : req.body.username},{'email' : req.body.email}]}, function(err, user){
    if(err){
      logger.error(req.logTag, {error: err});
      return res.status(500).json(messages.error.unknown);
    }
    if(user){
      if(user.username === req.body.username){
        logger.warn(req.logTag, messages.conflict.username(req.body.username));

        return res.status(400).json(messages.conflict.username(req.body.username));
      } else if(user.email === req.body.email){
        logger.warn(req.logTag, messages.conflict.email(req.body.email));

        return res.status(400).json(messages.conflict.email(req.body.email));
      } else {
        logger.error(req.logTag, 'what?', {
          username: user.username,
          email: user.email
        });

        return res.status(500).json(messages.error.unknown);
      }
    }
  
    var user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
  
    user.save(function (err){
      if(err){
        logger.error(req.logTag, {error: err});
        return res.status(500).json(messages.error.unknown);
      }

      logger.info(req.logTag, messages.success.newUser(user.username));

      return res.json({token: user.generateJWT()});
    })
  })
});

/* POST sign in */
router.post('/login', function(req, res, next){

  if(!req.body.username || !req.body.password){
    logger.warn(req.logTag, messages.usage.missingFields);
    return res.status(400).json(messages.usage.missingFields);
  }

  passport.authenticate('local', function(err, user, info){

    if(err){ 
      logger.error(req.logTag, {error: err});
      return res.status(500).json(messages.error.unknown) }

    if(!user){ 
      logger.warn(req.logTag, info);
      return res.status(401).json(info); }

    return res.json({token: user.generateJWT()});
  })(req, res, next);
});


module.exports = router;
