var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest')(app);
var should = require('should');

describe('Index Routes', function() {
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
  describe('POST /register', function(){

    it('returns a login token', function(done) {
      request.post('/register')
        .send({
          username: 'test',
          email: 'test@example.com',
          password: 'hello'})
        .expect(200)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.property('token');
          done();
        });
    });
  });
});
