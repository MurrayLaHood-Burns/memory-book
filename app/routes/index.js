var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var router = express.Router();
var debug = require('debug')('memory-book:server');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST sign up */
router.post('/register', function(req, res, next) {
  // error check fields
  if(!req.body.username || !req.body.email || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);


  user.save(function (err){
    if(err) {
      debug('Failed to save user: ' + err);
      return next(err);
    }

    debug(user.username + ' joined with email ' + user.email + ' on ' + user.joined);
    return res.json({token: user.generateJWT()})
  });
});

/* POST sign in */
router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){

    if(err){ return next(err); }

    if(!user){ return res.status(401).json(info); }

    return res.json({token: user.generateJWT()});
  })(req, res, next);
});


module.exports = router;
