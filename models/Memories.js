var mongoose = require('mongoose');

var MemorySchema = new mongoose.Schema({
  imagePath: String,
  comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'comment'}],
  createdBy: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
  createdOn: Date
});

mongoose.model('memory', MemorySchema);
