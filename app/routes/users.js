var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Album = mongoose.model('Album');
var router = express.Router();
var jwt = require('express-jwt');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var messages = require('messages');
var logger = require('logger');

/* PARAM user */
router.param('user', function(req, res, next, username){
  var query = User.findOne({'username':username});

  query.exec(function (err, user){
    if(err) { 
      logger.error(req.logTag, err);
      return next(err); }
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
router.post('/:user/albums', auth, function(req, res, next) {

  if(req.user.username != req.payload.username){
    logger.error(req.logTag, messages.error.unauthorized);
    return next(err);
  }

  var album = new Album(req.body);

  album.createdBy = req.user;

  album.save(function(err, album){
    if(err){ logger.error(req.logTag, err); return next(err); }

    req.user.albums.push(album);
    req.user.save(function(err, user) {
      if(err){ logger.error(req.logTag, err); return next(err); }

      res.json(album);
    });
  });
});

/* GET albums */
router.get('/:user/albums', auth, function(req, res, next) {

  Album.find({'createdBy' : req.user._id}, function(err, albums){
    if(err) { logger.error(req.logTag, err); return next(err); }

    res.json(albums);
  });
});

  

module.exports = router;
