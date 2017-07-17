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


/* GET home page. */
router.get('/', function(req, res, next) {
  logger.verbose('GET /', {
    body: req.body
  });


  res.render('index');
});

/* POST sign up */
router.post('/register', function(req, res, next) {
  var logTag = '[' +  shortid.generate() + '] POST /register';

  // error check fields
  if(!validate.username(req.body.username)){
    logger.warn(logTag, 'Invalid username', {
      username: req.body.username
    });

    return res.status(400).json({message: 'Username must be 3-24 characters long and may only contain letters and numbers'});
  }

  if(!validate.email(req.body.email)){
    logger.warn(logTag, 'Invalid email', {
      email: req.body.email
    });

    return res.status(400).json({message: 'Invalid email address'});
  }

  if(!validate.password(req.body.password)){
    logger.warn(logTag, 'Invalid password');

    return res.status(400).json({message: 'Password must be 4-128 characters long'});
  }

  User.findOne({$or: [{ 'username' : req.body.username},{'email' : req.body.email}]}, function(err, user){
    if(err){
      logger.error(logTag, {error: err});
      return res.status(400).json({message: 'We\'re having trouble handling your request, please try again later'});
    }
    if(user){
      if(user.username === req.body.username){
        logger.warn(logTag, 'Sorry! Username ' + req.body.username + ' is taken', {
          username : user.username
        });

        return res.status(400).json({message: 'Sorry! Username ' + req.body.username + ' is taken'});
      } else if(user.email === req.body.email){
        logger.warn(logTag, req.body.email + ' is already being used', {
          email : user.email
        });

        return res.status(400).json({message: req.body.email + ' is already being used'});
      } else {
        logger.error(logTag, 'what?', {
          username: user.username,
          email: user.email
        });

        return res.status(400).json({message: 'We\'re having trouble handling your request, please try again later'});
      }
    }
  
    var user = new User();

    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
  
    user.save(function (err){
      if(err){
        logger.error(logTag, {error: err});
        return res.status(400).json({message: 'We\'re having trouble handling your request, please try again later'});
      }

      logger.info(logTag, 'New user registered!', {
        username : user.username
      });

      return res.json({token: user.generateJWT()});
    })
  })
});

/* POST sign in */
router.post('/login', function(req, res, next){
  var logTag = '[' + shortid.generate() + '] POST /login';

  if(!req.body.username || !req.body.password){
    logger.warn(logTag, {message: 'Please fill out all fields'});
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){

    if(err){ 
      logger.error(logTag, {error: err});
      return next(err); }

    if(!user){ 
      logger.warn(logTag, info);
      return res.status(401).json(info); }

    return res.json({token: user.generateJWT()});
  })(req, res, next);
});


module.exports = router;
