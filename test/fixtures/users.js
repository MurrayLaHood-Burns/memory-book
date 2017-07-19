var id = require('pow-mongodb-fixtures').createObjectId;
var constants = require('../helpers/constants');

exports.users = {
  Alex: {
    _id: id('user_alex___'),
    username: 'alex',
    email: 'alex@test.com',
    salt: constants.salt,
    hash: constants.hash
  },
  Beatrice: {
    _id: id('user_beat___'),
    username: 'beatrice',
    email: 'beatrice@test.com',
    albums: [id('albu_beat1__')],
    salt: constants.salt,
    hash: constants.hash

  },
  Colin: {
    _id: id('user_coli___'),
    username: 'colin',
    email: 'colin@test.com',
    albums: [id('albu_coli1__'), id('albu_coli2__')],
    salt: constants.salt,
    hash: constants.hash
  }/*,
  Drew: {
  },
  Erin: {
  },
  Francis: {
  },
  Gwen: {
  },
  Howard: {
  },
  Isabel: {
  },
  Joey: {
  },
  Karen: {
  },
  Lance: {
  },
  Maurice: {
  },
  Nancy: {
  },
  Ophelia: {
  },
  Paul: {
  },
  Quincy: {
  },
  Rick: {
  },
  Samantha: {
  },
  Tom: {
  },
  Usera: {
  },
  Vick: {
  },
  Wendy: {
  },
  Xavier: {
  },
  Yohan: {
  },
  Zach: {
  }*/
};


