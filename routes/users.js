var express = require('express');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Album = mongoose.model('Album');
var router = express.Router();
var jwt = require('express-jwt');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var debug = require('debug')('memory-book:server');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});

/* PARAM user */
router.param('user', function(req, res, next, id){
  var query = User.findById(id);

  query.exec(function (err, user){
    if(err) { return next(err); }
    if(!user) { return next(new Error('can\'t find user')); }

    req.user = user;
    return next();
  });
});

/* GET user */
router.get('/:user', function(req, res) {
  res.json(req.user);
});

/* POST new album */
router.post('/:user/albums', function(req, res, next) {
  var album = new Album(req.body);
  album.createdBy = req.user;

  album.save(function(err, album){
    if(err){ return next(err); }

    req.user.albums.push(album);
    req.user.save(function(err, user) {
      if(err){return next(err); }

      res.json(album);
    });
  });
});

/* GET albums */
router.get('/:user/albums', function(req, res,
  next) {
  Album.find({'createdBy' : req.user._id}, function(err, albums){
    if(err) {return next(err); }

    res.json(albums);
  });
});

  

module.exports = router;
