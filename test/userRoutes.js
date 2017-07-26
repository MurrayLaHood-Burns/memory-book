var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest')(app);
var should = require('should');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Album = mongoose.model('Album');
var fixtures = require('pow-mongodb-fixtures').connect('memory-book-test');
var helpers = require('./helpers/helpers');
var messages = require('../app/node_modules/messages');

describe('User Routes', function() {

  var alexAuth;
  var beatriceAuth;
  var colinAuth;

  before(function(done) {
    fixtures.clearAllAndLoad(__dirname + '/fixtures', function(err){
      if(err) throw err;
      done();
    });
  });

  before(function(done) {
    helpers.login( 'alex', function(authHeader){
      alexAuth = authHeader;
      done();
    });
  });
  
  before(function(done) {
    helpers.login( 'beatrice', function(authHeader){
      beatriceAuth = authHeader;
      done();
    });
  });
  

  before(function(done) {
    helpers.login( 'colin', function(authHeader){
      colinAuth = authHeader;
      done();
    });
  }); 

  describe('POST /:user/albums', function(){

    beforeEach(function(done) {
      fixtures.clearAllAndLoad(__dirname + '/fixtures', function(err){
        if(err) throw err;
        done();
      });
    });

    it('returns the album', function(done) {
      request.post('/users/alex/albums')
      .send({
        title: 'testAlbum'})
      .set('authorization', alexAuth)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        res.body.should.have.property('title', 'testAlbum');
        done();
      });
    });

    it('requires owner', function(done){
      request.post('/users/alex/albums')
      .send({
        title: 'testAlbum'})
      .set('authorization', beatriceAuth)
      .expect(401)
      .end(function(err, res) {
        if (err) throw err;
        res.body.should.have.property('message', messages.error.unauthorized.message);
        done();
      });
    });
  });

  describe('GET /:user/albums', function(){

    beforeEach(function(done) {
      fixtures.clearAllAndLoad(__dirname + '/fixtures', function(err){
        if(err) throw err;
        done();
      });
    });

    it('return empty if none found', function(done) {
      request.get('/users/alex/albums')
      .set('authorization', alexAuth)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        res.body.should.be.empty;
        done();
      });
    });

    it('returns a list if one found', function(done) {
      request.get('/users/beatrice/albums')
      .set('authorization', beatriceAuth)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        res.body.should.have.a.length(1);
        done();
      });
    });

    it('returns a list if multiple found', function(done) {
      request.get('/users/colin/albums')
      .set('authorization', colinAuth)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        res.body.should.have.a.length(2);
        done();
      });
    });
  });
});
