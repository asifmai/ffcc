const mongoose = require('mongoose');
const moment = require('moment');
const TimeAgo = require('javascript-time-ago');
const en = require('javascript-time-ago/locale/en');
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

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

entrySchema.virtual('timeAgo').get(function() {
  return timeAgo.format(this.updatedAt);
});

entrySchema.virtual('shipStatus').get(function() {
  // let ETD;
  let ETA;
  const today = moment();
  if (this.details['ETA']) {
    ETA = moment(this.details['ETA']);
  } else if (this.details['EGM Date']) {
    ETA = moment(this.details['EGM Date']);
  }
  // if (this.details['ETD']) {
  //   ETD = moment(this.details['ETD']);
  // }

  // const diffWithETD = today.diff(ETD);
  const diffWithETA = today.diff(ETA);
  
  let returnString = '';
  // if (diffWithETD > 0 && diffWithETA < 0) {
  //   returnString = 'transit'
  // } else if (diffWithETA > 0) {
  //   returnString = 'destination'
  // } else if (diffWithETD > 0) {
  //   returnString = 'origin'
  // }
  if (diffWithETA < 0) {
    returnString = 'transit'
  } else {
    returnString = 'destination'
  }

  return returnString;
});

entrySchema.set('toObject', {virtuals: true});
entrySchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Entry', entrySchema)