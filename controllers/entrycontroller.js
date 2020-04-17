const moment = require('moment');
const Entry = require('../models/Entry');

module.exports.saveEntries = (entries) => new Promise(async (resolve, reject) => {
  try {
    const returnObj = {
      updated: 0,
      created: 0
    };

    for (let i = 0; i < entries.length; i++) {
      let foundEntry;
      if (entries[i].details['Booking No']) {
        foundEntry = await Entry.findOne({"details.Booking No": entries[i].details['Booking No']});
      } else if (entries[i].details['Job No']) {
        foundEntry = await Entry.findOne({"details.Job No": entries[i].details['Job No']});
      }
      if (foundEntry) {
        returnObj.updated++;
        entries[i].updatedAt = moment().format();
        const modifiedEntry = await Entry.findByIdAndUpdate(foundEntry._id, entries[i]);
        await modifiedEntry.markModified('details');
      } else {
        returnObj.created++;
        const newEntry = new Entry(entries[i]);
        await newEntry.markModified('details');
        await newEntry.save();
      }
    }
    resolve(returnObj);
  } catch (error) {
    reject(error);
  }
})

module.exports.readEntries = (entries) => new Promise(async (resolve, reject) => {
  try {
    const entries = await Entry.find({"details.Booking No":'MUMFF/AE/0001/19-20'});
    console.log('No of entries found: ', entries.length);
    for (let i = 0; i < entries.length; i++) {
      console.log(`${i+1}/${entries.length} - Booking No: ${entries[i].details['Booking No']}`);
    }
    resolve(true);
  } catch (error) {
    reject(error);
  }
})
