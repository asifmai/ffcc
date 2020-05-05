const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  entryType: String,
  entrySubType1: String,
  entrySubType2: String,
  details: Object,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    index: true,
  }
});

module.exports = mongoose.model('Entry', entrySchema)