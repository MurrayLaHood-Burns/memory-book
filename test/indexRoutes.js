var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest')(app);
var should = require('should');
var mongoose = require('mongoose');
var User = mongoose.model('User');

describe('Index Routes', function() {

  describe('POST /register', function(){
    describe('no existing user', function(){

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

      afterEach(function(done) {
        User.remove({}, function(err) {
          if(err) throw err;
          done();
        });
      });
    });

    describe('existing user', function(){
      before(function(done) {
        var user = new User();

        user.username = 'test';
        user.email = 'test@example.com';
        user.setPassword('hello');

        user.save(function(err) {
          if(err) throw err;
          done();
        });
      });

      it('returns error on existing username', function(){
        request.post('/register')
        .send({
          username: 'test',
          email: 'test1@example.com',
          password: 'hello'
        })
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.property('message');
          done();
        });
      });

      it('returns error on existing email', function(){
        request.post('/register')
        .send({
          username: 'test1',
          email: 'test@example.com',
          password: 'hello'
        })
        .expect(400)
        .end(function(err, res) {
          if (err) throw err;
          res.body.should.have.property('message');
          done();
        });
      });

      after(function(done) {
        User.remove({}, function(err) {
          if(err) throw err;
          done();
        });
      });
    });
  });



  describe('POST /login', function(){
    beforeEach(function(done) {
      var user = new User();

      user.username = 'test';
      user.email = 'test@example.com';
      user.setPassword('hello');

      user.save(function(err) {
        if(err) throw err;
        done();
      });
    });

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

    afterEach(function(done) {
      User.remove({}, function(err) {
        if(err) throw err;
        done();
      });
    });
  });
});
