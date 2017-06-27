var express = require('express');
var jwt = require('express-jwt');
var mongoose= require('mongoose');
var Album = mongoose.model('Album');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var debug = require('debug')('memory-book:server');
var router = express.Router();
var filters = require("my_modules/filters");

/* GET albums for user */
router.get('/', function(req, res, next) {
  Album.find(function(err, albums){
    if(err){ return next(err); }

    res.json(albums);
  });
}); 

/* PARAM album */
router.param('album', function(req, res, next, id){
  var query = Album.findById(id);

  query.exec(function (err, album){
    if(err) { return next(err); }
    if(!album) { return next(new Error('can\'t find album')); }

    req.album = album;
    return next();
  });
});

/* GET album */
router.get('/:album', function(req, res) {
  res.json(req.album);
});

/* PUT album tags */
router.put('/:album/tags', function(req, res, next) {

  req.album.tags = req.album.tags.concat(req.body.tags);
  req.album.tags = req.album.tags.filter(filters.notNull)
    .filter(filters.onlyAlphanumeric)
    .filter(onlyUnique);
  req.album.save(function(err, album) {
    if(err){ return next(err); }

    res.json(album.tags);
  });
});
  

module.exports = router;
