var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Album = mongoose.model('Album');
var router = express.Router();
var jwt = require('express-jwt');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var verify = require('verify');
var messages = require('messages');
var logger = require('logger');

/* PARAM user */
router.param('user', function(req, res, next, username){
  console.log('param');
  
  var query = User.findOne({'username':username});

  query.exec(function (err, user){
    if(err) { return next(err); }
    if(!user) { 
      var err = new Error('can\'t find user');
      logger.error(req.logTag, err);
      return next(err);
    }

    req.user = user;
    
    
    next();
  });
});

/* POST new album */
router.post('/:user/albums', auth, verify.owner(), function(req, res, next) {
  console.log('post');
  var album = new Album(req.body);

  album.createdBy = req.user;

  album.save(function(err, album){
    if(err){ return next(err); }

    req.user.albums.push(album);
    req.user.save(function(err, user) {
      if(err){ return next(err); }

      res.json(album);
    });
  });
});

/* GET albums */
router.get('/:user/albums', auth, function(req, res, next) {

  Album.find({'createdBy' : req.user._id}, function(err, albums){
    if(err) { return next(err); }

    res.json(albums);
  });
});

  

module.exports = router;
