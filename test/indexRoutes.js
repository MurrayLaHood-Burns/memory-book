var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest')(app);
var should = require('should');
var mongoose = require('mongoose');
var User = mongoose.model('User');

describe('Index Routes', function() {

  describe('POST /register', function(){
    it('returns a login token', function(done) {
      request.post('/register')
      .send({
        username: 'test',
        email: 'test@example.com',
        password: 'hello'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        res.body.should.have.property('token');
        done();
      });
    });
  });

  describe('POST /login', function(){
    it('returns a login token', function(done) {
      request.post('/login')
      .send({
        username: 'test',
        password: 'hello'
      })
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        res.body.should.have.property('token');
        done();
      });
    });
  });

  after(function(done) {
    User.remove({}, function(err) {
      if(err) throw err;
      done();
    });
  });
});
