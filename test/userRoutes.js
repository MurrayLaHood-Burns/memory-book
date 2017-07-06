var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest')(app);

describe('User Routes', function() {
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
  describe('POST users albums', function(){

    it('returns status 200', function(done) {
      request.post('/users/murray/albums')
        .send({
          title: 'test'})
        .set('authorization', authHeader)
        .expect(200, done);
    });
  });
});
