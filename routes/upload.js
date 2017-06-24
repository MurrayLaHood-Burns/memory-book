var express = require('express');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('user');
var fs = require('fs');
var auth = jwt({secret: fs.readFileSync('.jwt-key/key'), userProperty: 'payload'});
var router = express.Router();
var debug = require('debug')('memory-book:server');
var path = require('path');
var multer = require('multer');
var upload = multer({
  dest: path.join(__dirname, '../public/upload/temp'),
  fileFilter: function fileFilter (req, file, cb) {
    var ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
    
    // no extension
    if(ext === file.originalname)
    {
      cb(null, false);
    }

    ext = ext.toLower();

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
router.post('/', upload.array('photos', 50), function(req, res, next) {
  if( !req.files || req.files ){
    return res.status(400).json({message:'No files uploaded. Select files with a \".jpg\", \".jpeg\", \".gif\", or \".png\" extension\n 1 MB filesize limit'});
  }



});

module.exports = router;

