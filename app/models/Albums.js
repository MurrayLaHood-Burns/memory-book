var mongoose = require('mongoose');

var AlbumSchema = new mongoose.Schema({
  title: String,
  tags: [{
    type: String}],
  memories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'memory'}],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user'},
  createdOn: {
    type: Date,
    default: Date.now}
});

mongoose.model('Album', AlbumSchema);
