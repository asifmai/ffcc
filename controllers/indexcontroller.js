const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const {genVerificationCode} = require('../helpers/random');
const twilio = require('../helpers/twilio');
const Entry = require('../models/Entry');

module.exports.index_get = async (req, res, next) => {
  const entries = await Entry.find({'details.Customer Email': req.user.email}).sort({updatedAt: 'desc'}).exec();
  console.log(entries)
  res.render('dashboard', {entries});
}

module.exports.signin_get = (req, res, next) => {
  res.render('signin');
}

module.exports.signin_post = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: 'Email or Password Incorrect...',
  })(req, res, next);
}

module.exports.signup_get = (req, res, next) => {
  res.render('signup');
}

module.exports.signup_post = async (req, res, next) => {
  const {firstName, lastName, email, phone, password, password2} = req.body;
  const foundUser = await User.findOne({email});
  const foundUser2 = await User.findOne({phone});
  
  if (foundUser) {
    res.render('signup', {firstName, lastName, email, phone, password, password2, error_msg: 'Email is already registered'});
  } else if (foundUser2) {
    res.render('signup', {firstName, lastName, email, phone, password, password2, error_msg: 'Phone is already registered'});
  } else {
    const verificationCode = genVerificationCode();
    const newUser = new User({firstName, lastName, email, phone, verification: verificationCode});

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    newUser.password = hash;
    await newUser.save();

    const smsBody = `Your verification code is: ${verificationCode}`;
    twilio.sendSMS(phone, smsBody);

    res.redirect(`/verify/${newUser._id}`);
  }
}

module.exports.signout_get = (req, res, next) => {
  req.logout();
  req.flash('success_msg', 'You are Signed out!');
  res.redirect('/signin');
};

module.exports.verify_get = (req, res, next) => {
  res.render('verify', {userid: req.params.userid});
}

module.exports.verify_post = async (req, res, next) => {
  const {code, userid} = req.body;

  const user = await User.findById(userid);
  
  if (user.verification == Number(code)) {
    await User.findByIdAndUpdate(userid, {verified: true});
    req.flash('success_msg', 'Verification successful, you can now login to your account');
    res.redirect('/signin');
  } else {
    req.flash('error_msg', 'Invalid Code, Try again...');
    res.redirect(`/verify/${userid}`);
  }
}
