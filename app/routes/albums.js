var express = require('express');
var jwt = require('express-jwt');
var mongoose= require('mongoose');
var User = mongoose.model('User');
var Album = mongoose.model('Album');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var debug = require('debug')('memory-book:server');
var router = express.Router();
var filters = require('filters');
var verify = require('verify');

/* PARAM album */
router.param('album', function(req, res, next, id){
  var query = Album.findById(id);

  query.exec(function (err, album){
    if(err) { return next(err); }
    if(!album) { 
      logger.log(req.logTag, messages.error.albumNotFound, {_id: id});
    }

    req.album = album;
    
    next();
  });
});

/* GET album */
router.get('/:album', function(req, res) {
  res.json(req.album);
});

/* PUT album tags */
router.put('/:album/tags', auth, verify.owner(), function(req, res, next) {

  

  req.album.tags = req.album.tags.concat(req.body.tags)
    .filter(filters.notNull)
    .filter(filters.onlyStrings)
    .filter(filters.onlyAlphanumeric)
    .filter(filters.onlyUnique);

  req.album.save(function(err, album) {
    if(err){ return next(err); }

    res.json(album.tags);
  });
});
  

module.exports = router;
