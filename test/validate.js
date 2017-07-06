var expect = require('chai').expect;
var validate = require('../app/node_modules/validate');

describe('Field Validation', function() {
  describe('Validate username', function() {
     it('blocks null, empty, and undefined', function() {
      var case1 = '';
      var case2 = null;
      var case3;

      var actual1 = validate.username(case1);
      var actual2 = validate.username(case2);
      var actual3 = validate.username(case3);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(false);
      expect(actual3).to.equal(false);
    });
    it('limits length 3-24', function() {
      var case1 = '12';
      var case2 = '123';
      var case3 = new Array(24 + 1).join('a');
      var case4 = new Array(25 + 1).join('a');

      var actual1 = validate.username(case1);
      var actual2 = validate.username(case2);
      var actual3 = validate.username(case3);
      var actual4 = validate.username(case4);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(true);
      expect(actual3).to.equal(true);
      expect(actual4).to.equal(false);
    });
  });

  describe('Validate email', function() {
    it('blocks null, empty, and undefined', function() {
      var case1 = '';
      var case2 = null;
      var case3;

      var actual1 = validate.email(case1);
      var actual2 = validate.email(case2);
      var actual3 = validate.email(case3);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(false);
      expect(actual3).to.equal(false);
    });
    it('limits length <= 254', function() {
      var case1 = new Array(244 + 1).join('a') + '@email.com';
      var case2 = new Array(245 + 1).join('a') + '@email.com';

      var actual1 = validate.email(case1);
      var actual2 = validate.email(case2); 

      expect(actual1).to.equal(true);
      expect(actual2).to.equal(false);
    });
  });

  describe('Validate password', function() {
    it('blocks null, empty, and undefined', function() {
      var case1 = '';
      var case2 = null;
      var case3;

      var actual1 = validate.password(case1);
      var actual2 = validate.password(case2);
      var actual3 = validate.password(case3);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(false);
      expect(actual3).to.equal(false);
    });
    it('limits length 4-128', function() {
      var case1 = '123';
      var case2 = '1234';
      var case3 = new Array(128 + 1).join('a');
      var case4 = new Array(129 + 1).join('a');

      var actual1 = validate.password(case1);
      var actual2 = validate.password(case2);
      var actual3 = validate.password(case3);
      var actual4 = validate.password(case4);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(true);
      expect(actual3).to.equal(true);
      expect(actual4).to.equal(false);
    });
  });

  describe('Validate title', function() {
    it('blocks null, empty, and undefined', function() {
      var case1 = '';
      var case2 = null;
      var case3;

      var actual1 = validate.title(case1);
      var actual2 = validate.title(case2);
      var actual3 = validate.title(case3);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(false);
      expect(actual3).to.equal(false);
    });
    it('limits length <=128', function() {
      var case1 = new Array(128 + 1).join('a');
      var case2 = new Array(129 + 1).join('a');

      var actual1 = validate.title(case1);
      var actual2 = validate.title(case2); 

      expect(actual1).to.equal(true);
      expect(actual2).to.equal(false);
    });
  });

  describe('Validate comment', function() {
    it('blocks null, empty, and undefined', function() {
      var case1 = '';
      var case2 = null;
      var case3;

      var actual1 = validate.comment(case1);
      var actual2 = validate.comment(case2);
      var actual3 = validate.comment(case3);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(false);
      expect(actual3).to.equal(false);
    });
    it('limits length <=1000', function() {
      var case1 = new Array(1000 + 1).join('a');
      var case2 = new Array(1001 + 1).join('a');

      var actual1 = validate.comment(case1);
      var actual2 = validate.comment(case2); 

      expect(actual1).to.equal(true);
      expect(actual2).to.equal(false);
    });
  });

  describe('Validate tag', function() {
    it('blocks null, empty, and undefined', function() {
      var case1 = '';
      var case2 = null;
      var case3;

      var actual1 = validate.tag(case1);
      var actual2 = validate.tag(case2);
      var actual3 = validate.tag(case3);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(false);
      expect(actual3).to.equal(false);
    });
    it('limits length <=50', function() {
      var case1 = new Array(50 + 1).join('a');
      var case2 = new Array(51 + 1).join('a');

      var actual1 = validate.tag(case1);
      var actual2 = validate.tag(case2); 

      expect(actual1).to.equal(true);
      expect(actual2).to.equal(false);
    });
  });
});
