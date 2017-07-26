var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest')(app);
var should = require('should');
var fixtures = require('pow-mongodb-fixtures').connect('memory-book-test');
var helpers = require('./helpers/helpers');
var messages = require('../app/node_modules/messages');

describe('Album Routes', function() {


  describe('GET /:album', function() {
   

    describe('Valid id', function() {

      it('returns the album', function(done) {
        done();   
      });

    });

    describe('Invalid id', function() {

      it('returns empty', function(done) {
        done();
      });

    });

  });
  
  describe('POST /:album/tags', function() {

    describe('Valid id and tags', function() {
    });

    describe('Invalid id', function() {
    });

    describe('Invalid tags', function() {
    });

    describe('Not owner', function() {
    });
  
  });
});
