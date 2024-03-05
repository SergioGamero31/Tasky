const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  color: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Column' }]
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
