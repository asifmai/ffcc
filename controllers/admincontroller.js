const passport = require('passport');
const excelToJson = require('convert-excel-to-json');
const Entry = require('../models/Entry');
const User = require('../models/User');
const entryController = require('./entrycontroller');

module.exports.admin_get = (req, res, next) => {
  res.redirect('/admin/data');
}

// GET - Show admin sign in page
module.exports.signin_get = (req, res, next) => {
  res.render('admin/signin');
}

// POST - admin sign in
module.exports.signin_post = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/signin',
    failureFlash: 'Email or Password Incorrect...',
  })(req, res, next);
}

// GET - admin sign out
module.exports.signout_get = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are Signed out!');
  res.redirect('/admin/signin');
}

// GET - Show Data Page
module.exports.data_get = async (req, res, next) => {
  const entries = await Entry.find().sort({updatedAt: 'desc'});
  
  res.render('admin/data', {page: 'data', entries});
}

// GET - Show Users Page
module.exports.users_get = async (req, res, next) => {
  const users = await User.find({isAdmin: false}).sort({firstName: 'asc'});

  res.render('admin/users', {page: 'users', users});
}

// GET - Delete User
module.exports.deleteuser_get = async (req, res, next) => {
  const {userid} = req.params;
  await User.findByIdAndDelete(userid);

  req.flash('success_msg', 'User deleted successfuly');
  res.redirect('/admin/users');
}

// POST - Upload File
module.exports.upload_post = async (req, res, next) => {
  try {
    const entries = await Entry.find().sort({updatedAt: 'desc'});
    // Check for Errors in File Name and Extentsion
    const errors = [];
    if (req.files) {
      const fileName = req.files.file.name;
      if (!fileName.endsWith('.xlsx')) errors.push('Not an excel file');
      if (!(fileName.toLowerCase().startsWith('ff') || fileName.toLowerCase().startsWith('cc'))) errors.push('Not an FF or CC file, File name must start with FF or CC');
    } else {
      errors.push('No File found')
    }
  
    if (errors.length > 0) {
      return res.render('admin/data', {page: 'data', entries, errors});
    } else {
      const fileName = req.files.file.name;
      const results = excelToJson({
        source: req.files.file.data,
        header: {
          rows: 2
        }
      });

      // Validate Sheets
      const sheets = [];
      for (const key in results) {
        sheets.push(key)
      }
      
      if (sheets.length !== 4) errors.push('The number of sheets are less than or more than 4');
      if (!sheets.some(s => s == 'Air Export')) errors.push('Cannot find Air Export Sheet');
      if (!sheets.some(s => s == 'Air Import')) errors.push('Cannot find Air Import Sheet');
      if (!sheets.some(s => s == 'Sea Export')) errors.push('Cannot find Sea Export Sheet');
      if (!sheets.some(s => s == 'Sea Import')) errors.push('Cannot find Sea Import Sheet');

      if (errors.length > 0) {
        return res.render('admin/data', {page: 'data', entries, errors});
      } else {
        const newentries = [];
        for (const sheet in results) {
          let entryType, entrySubType1, entrySubType2, details = results[sheet][0];
          
          if (fileName.toLowerCase().startsWith('ff')) {
            entryType = 'ff'
          } else if (fileName.toLowerCase().startsWith('cc')) {
            entryType = 'cc'
          }

          if (sheet.toLowerCase().includes('air')) {
            entrySubType1 = 'air'
          } else if (sheet.toLowerCase().includes('sea')) {
            entrySubType1 = 'sea'
          }

          if (sheet.toLowerCase().includes('export')) {
            entrySubType2 = 'export'
          } else if (sheet.toLowerCase().includes('import')) {
            entrySubType2 = 'import'
          }

          for (let i = 1; i < results[sheet].length; i++) {
            const entry = {
              entryType, entrySubType1, entrySubType2, details: {}
            }
            for (const detailKey in details) {
              entry.details[details[detailKey].replace(/\./gi, '')] = results[sheet][i][detailKey];
            }
            newentries.push(entry);
          }
        }
        const result = await entryController.saveEntries(newentries);

        req.flash('success_msg', `Added ${result.created}, Updated ${result.updated} Entries`);
        res.redirect('/admin/data');
      }
    }
  } catch (error) {
    res.send(`Server Error: ${error}`);
  }
};

// GET - Delete an entry
module.exports.deleteentry_post = async (req, res, next) => {
  const {entryid} = req.params;

  await Entry.findByIdAndDelete(entryid);
  req.flash('success_msg', 'Entry Deleted successfuly...');
  res.redirect('/admin/data');
}