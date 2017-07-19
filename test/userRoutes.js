var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest')(app);
var should = require('should');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Album = mongoose.model('Album');
var fixtures = require('pow-mongodb-fixtures').connect('memory-book-test');
var constants = require('./helpers/constants');
var helpers = require('./helpers/helpers');

describe('User Routes', function() {

  var authHeader;

  describe('POST /:user/albums', function(){

    before(function(done) {
      fixtures.clearAllAndLoad(__dirname + '/fixtures', function(err){
        if(err) throw err;
        helpers.login( 'alex', function(bearerToken){
          authHeader = bearerToken;
          done();
        });
      });
    });

    it('returns the album', function(done) {
      request.post('/users/alex/albums')
      .send({
        title: 'testAlbum'})
      .set('authorization', authHeader)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        res.body.should.have.property('title', 'testAlbum');
        done();
      });
    });
  });

  describe('GET /:user/albums', function(){

    before(function(done) {
      fixtures.clearAllAndLoad(__dirname + '/fixtures', function(err){
        if(err) throw err;
        helpers.login( 'alex', function(bearerToken){
          authHeader = bearerToken;
          done();
        });
      });
    });

    it('return empty if none found', function(done) {
      request.get('/users/alex/albums')
      .set('authorization', authHeader)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        console.log(res.body);
        res.body.should.be.empty;
        done();
      });
    });

    before(function(done) {
      fixtures.clearAllAndLoad(__dirname + '/fixtures', function(err){
        if(err) throw err;
        helpers.login( 'beatrice', function(bearerToken){
          authHeader = bearerToken;
          done();
        });
      });
    });

    it('returns a list if one found', function(done) {
      request.get('/users/beatrice/albums')
      .set('authorization', authHeader)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        console.log(res.body);
        res.body.should.have.a.length(1);
        done();
      });
    });

    before(function(done) {
      fixtures.clearAllAndLoad(__dirname + '/fixtures', function(err){
        if(err) throw err;
        helpers.login( 'colin', function(bearerToken){
          authHeader = bearerToken;
          done();
        });
      });
    });

    it('returns a list if multiple found', function(done) {
      request.get('/users/colin/albums')
      .set('authorization', authHeader)
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        console.log(res.body);
        res.body.should.have.a.length(2);
        done();
      });
    });


  });
});
