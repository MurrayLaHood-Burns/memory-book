var expect = require('chai').expect;
var request = require('superagent');
var user1 = request.agent();
var baseUrl = 'http://localhost:8080';

user1
  .post( baseUrl + '/login')
  .send({ username: 'murray', password: 'hello' })
  .end(function(err, res) {
  });

describe('Routes Requests Related To User Model', function() {
  describe('GET users albums', function(){

    var url = baseUrl + '/murray/albums';

    it('returns status 200', function() {
      request(url, function(err, res, body){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
});
