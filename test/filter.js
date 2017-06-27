var expect = require("chai").expect;
var filters = require("../my_modules/filters");

describe("String Array Filters", function() {
  describe("Filter only unique", function() {
    it("allows only unique strings", function() {
      var case1 = ["one", "two", "three"];
      var case2 = ["one", "two", "two"];
      var case3 = ["one", "two", "one"];

      var actual1 = case1.filter(filters.onlyUnique);
      var actual2 = case2.filter(filters.onlyUnique);
      var actual3 = case3.filter(filters.onlyUnique);

      expect(actual1).to.deep.equal(["one", "two", "three"]);
      expect(actual2).to.deep.equal(["one", "two"]);
      expect(actual3).to.deep.equal(["one", "two"]);
    });
  });
});
