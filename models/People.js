var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  gender: String,
  born: Date,
  died: Date,
  user: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
  family: [{type:mongoose.Schema.Types.ObjectId, ref: 'relation'}],
  albums: [{type:mongoose.Schema.Types.ObjectId, ref: 'album'}],
  createdBy: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
  createdOn: Date
});

mongoose.model('person', PersonSchema);
