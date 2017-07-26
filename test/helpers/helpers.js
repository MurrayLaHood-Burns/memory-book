var app = require('../../app');
var request = require('supertest')(app);
var constants = require('./constants');

var helpers = {

  login: function( username, callback ){
    request.post('/login')
    .send({
      username: username,
      password: constants.password
    })
    .end(function(err, res) {
      if (err) throw err;
      callback('Bearer ' + res.body.token);
    });
  }
};

module.exports = helpers;
