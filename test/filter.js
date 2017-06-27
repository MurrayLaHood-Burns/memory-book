var expect = require('chai').expect;
var filters = require('my_modules/filters');

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
  describe('Filter not null', function() {
    it('blocks null and allows not null', function() {
      var case1 = null;
      var case2 = 'notnull';

      var actual1 = filters.notNull(case1);
      var actual2 = filters.notNull(case2);

      expect(actual1).to.equal(false);
      expect(actual2).to.equal(true);
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
});
