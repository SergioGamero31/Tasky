const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
  order: { type: Number, required: true },
  title: { type: String, required: true }
});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
