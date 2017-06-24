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
  dest: path.join(__dirname, '../public/upload/temp')
});

/* POST uploads */
router.get('/', function(req, res) {
});

module.exports = router;
