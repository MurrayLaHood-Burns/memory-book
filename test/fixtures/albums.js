var id = require('pow-mongodb-fixtures').createObjectId;

exports.albums = {
  beatrice1: {
    _id: id('albu_beat1__'),
    title: 'beatrice1',
    createdBy: id('user_beat___')
  },
  colin1: {
    _id: id('albu_coli1__'),
    title: 'colin1',
    createdBy: id('user_coli___')
  },
  colin2: {
    _id: id('albu_coli2__'),
    title: 'colin2',
    createdBy: id('user_coli___')
  }
};
