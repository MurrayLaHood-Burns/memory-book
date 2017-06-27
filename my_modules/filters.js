var filters = {

  onlyUnique: function (currentValue, index, arr) {
    var passed = arr.indexOf(currentValue) === index;
    return passed;
  },

  noSymbols: function (currentValue){
    var patt = new RegExp("/^[a-z0-9]+$/i");
    var passed = patt.test(currentValue);
    return passed;
  },

  notNull: function(currentValue){
    var passed = currentValue != null;
    return currentValue != null;
  }
};

module.exports = filters;
