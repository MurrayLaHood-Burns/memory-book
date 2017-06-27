var express = require('express');
var jwt = require('express-jwt');
var mongoose= require('mongoose');
var Album = mongoose.model('Album');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var debug = require('debug')('memory-book:server');
var router = express.Router();

function onlyUnique(currentValue, index, arr) {
  var passed = arr.indexOf(currentValue) === index;
  debug("onlyUnique: " + currentValue + " passed: " + passed);
  return passed;
}
function noSymbols(currentValue){
  var patt = new RegExp("/^[a-z0-9]+$/i");
  var passed = patt.test(currentValue);
  debug("noSymbols: " + currentValue + " passed: " + passed);
  return passed;
}
function notNull(currentValue){
  var passed = currentValue != null;
  debug("notNull: " + currentValue + " passed: " + passed);
  return currentValue != null;
}

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
  req.album.tags = req.album.tags.filter(notNull).filter(noSymbols).filter(onlyUnique);
  req.album.save(function(err, album) {
    if(err){ return next(err); }

    res.json(album.tags);
  });
});
  

module.exports = router;
