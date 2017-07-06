var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var router = express.Router();
var debug = require('debug')('memory-book:server');
var path = require('path');
var multer = require('multer');

var imagePath = '../public/images/memories-' + process.env.NODE_ENV;

var upload = multer({
  dest: path.join(__dirname, imagePath),
  fileFilter: function fileFilter (req, file, cb) {

    debug("Entering file filter\n");

    var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
    
    // no extension
    if(ext === file.originalname)
    {
      cb(null, false);
    }

    ext = ext.toLowerCase();

    switch(ext)
    {
      case "jpeg":
      case "jpg":
      case "gif":
      case "png":
        cb(null, true);
        break;
      default:
        cb(null, false);
        break;
    }
  }
});

/* POST upload */
router.post('/', upload.array('files', 50), function(req, res, next) {
  
  debug("Post upload");
  
  if( !req.files || req.files.length === 0 ){
    return res.status(400).json({message:'No files uploaded. Select files with a \".jpg\", \".jpeg\", \".gif\", or \".png\" extension\n 1 MB filesize limit'});
  }


  res.end();

});

module.exports = router;

