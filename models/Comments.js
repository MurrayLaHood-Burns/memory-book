var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  body: String,
  memory: {type:mongoose.Schema.Types.ObjectId, ref: 'memory' },
  createdBy: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
  createdOn: Date
});

mongoose.model('comment', CommentSchema);  
