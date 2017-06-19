var mongoose = require('mongoose');

var RelationSchema = new mongoose.Schema({
  type: String,
  person1: {type:mongoose.Schema.Types.ObjectId, ref: 'person'},
  person2: {type:mongoose.Schema.Types.ObjectId, ref: 'person'},
  createdBy: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
  createdOn: Date
});

mongoose.model('relation', RelationSchema);
