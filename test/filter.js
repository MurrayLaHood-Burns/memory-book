var expect = require('chai').expect;
var filters = require('../app/node_modules/filters');

describe('String Array Filters', function() {
  describe('Filter only unique', function() {
    it('allows only unique strings', function() {
      var case1 = ['one', 'two', 'three'];
      var case2 = ['one', 'two', 'two'];
      var case3 = ['one', 'two', 'one'];

      var actual1 = case1.filter(filters.onlyUnique);
      var actual2 = case2.filter(filters.onlyUnique);
      var actual3 = case3.filter(filters.onlyUnique);

      expect(actual1).to.deep.equal(['one', 'two', 'three']);
      expect(actual2).to.deep.equal(['one', 'two']);
      expect(actual3).to.deep.equal(['one', 'two']);
    });
  });

  describe('Filter only alphanumeric', function() {
    it('allows strings with only numbers', function() {
      var case1 = '1994';

      var actual1 = filters.onlyAlphanumeric(case1);

      expect(actual1).to.equal(true);
    });
    it('allows strings with only letters', function() {
      var case1 = 'abc';

      var actual1 = filters.onlyAlphanumeric(case1);

      expect(actual1).to.equal(true);
    });
    it('allows strings with letters and numbers', function() {
      var case1 = 'abc1994';

      var actual1 = filters.onlyAlphanumeric(case1);

      expect(actual1).to.equal(true);
    });
    it('blocks symbols and whitespace', function() {
      var case1 = '1994*';
      var case2 = '1994 abc';

      var actual1 = filters.onlyAlphanumeric(case1);
      var actual2 = filters.onlyAlphanumeric(case2);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(false);
    });
  });

  describe('Filter only strings', function() {
    it('allows only values with datatype string', function() {
      var case1 = 'string';
      var case2 = 5;
      var case3 = true;

      var actual1 = filters.onlyStrings(case1);
      var actual2 = filters.onlyStrings(case2);
      var actual3 = filters.onlyStrings(case3);

      expect(actual1).to.equal(true);
      expect(actual2).to.equal(false);
      expect(actual3).to.equal(false);
    });
  });

  describe('Filter only email', function() {
    it('allows only values in email format', function() {
      var case1 = 'string';
      var case2 = '@string';
      var case3 = 'string@';
      var case4 = 'string@email';
      var case5 = 'string@email.com';

      var actual1 = filters.onlyEmail(case1);
      var actual2 = filters.onlyEmail(case2);
      var actual3 = filters.onlyEmail(case3);
      var actual4 = filters.onlyEmail(case4);
      var actual5 = filters.onlyEmail(case5);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(false);
      expect(actual3).to.equal(false);
      expect(actual4).to.equal(false);
      expect(actual5).to.equal(true);
    });
  });

  describe('Filter not whitespace', function() {
    it('allows values with at least one character', function() {
      var case1 = '        a';
      var case2 = ' a';

      var actual1 = filters.notWhitespace(case1);
      var actual2 = filters.notWhitespace(case2);

      expect(actual1).to.equal(true);
      expect(actual2).to.equal(true);
    });
    it('blocks pure whitespace strings', function() {
      var case1 = '        ';
      var case2 = ' ';

      var actual1 = filters.notWhitespace(case1);
      var actual2 = filters.notWhitespace(case2);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(false);

    });
  });
});
