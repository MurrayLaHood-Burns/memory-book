var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var debug = require('debug')('memory-book:server');
var logger = require('./app/node_modules/logger');

// database setup

require('./app/models/Users');
require('./app/models/People');
require('./app/models/Relations');
require('./app/models/Albums');
require('./app/models/Memories');
require('./app/models/Comments');
require('./app/config/passport');

mongoose.Promise = require('bluebird');

var dbUri = 'mongodb://localhost/memory-book-' + process.env.NODE_ENV;
logger.info('Using ' + dbUri);

mongoose.connect(dbUri);


var index = require('./app/routes/index');
var users = require('./app/routes/users');
var upload = require('./app/routes/upload');
var albums = require('./app/routes/albums');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'app/public/favicon.ico')));
app.use(logger.tag());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(passport.initialize());

app.use('/', index);
app.use('/users', users);
app.use('/upload', upload);
app.use('/albums', albums);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
