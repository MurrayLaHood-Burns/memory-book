var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
  title: String,
  memories: [{type:mongoose.Schema.Types.ObjectId, ref: 'memory'}],
  createdBy: {type:mongoose.Schema.Types.ObjectId, ref: 'user'},
  createdOn: Date
});

mongoose.model('album', AlbumSchema);
