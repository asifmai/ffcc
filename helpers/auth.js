module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.verified == true) {
      return next();
    } else {
      req.flash('error_msg', 'Your account is not verified...');
      res.redirect(`/verify/${req.user._id}`);
    }
  } else {
    req.flash('error_msg', 'Please Signin First...');
    res.redirect('/signin');
  }
}

module.exports.ensureAuthenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin == true) {
      return next();
    } else {
      req.flash('error_msg', 'You need Admin privileges to access this page');
      res.redirect('/admin/signin');
    }
  } else {
    req.flash('error_msg', 'Please Signin First...');
    res.redirect('/admin/signin');
  }
}

module.exports.ensureAuthenticatedLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
  return next();
}
