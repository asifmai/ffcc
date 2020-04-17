const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  entryType: String,
  entrySubType1: String,
  entrySubType2: String,
  details: Object,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Entry', entrySchema)