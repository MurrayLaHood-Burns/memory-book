var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest')(app);
var baseUrl = 'http://localhost:8080';

describe('Album Routes', function() {
  var authHeader;
  before(function(done) {
    request.post('/login')
    .send({
      username: 'murray',
      password: 'hello'
    })
    .end(function(err, res) {
      if (err) throw err;
      authHeader = 'Bearer ' + res.body.token;
      done();
    });
  });
  describe('GET albums', function(){

    it('responds with json', function(done) {
      request.get('/albums')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
