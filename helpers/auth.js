module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'Please Signin First...');
    res.redirect('/signin');
  }
}

module.exports.ensureVerified = (req, res, next) => {
  if (req.user.verified == true) {
    return next();
  } else {
    req.flash('error_msg', 'Your account is not verified...');
    res.redirect(`/verify/${req.user._id}`);
  }
}

module.exports.ensureUser = (req, res, next) => {
  if (req.user.role == 'user') {
    return next();
  } else {
    req.logout();
    req.flash('error_msg', 'You need a user account to access this resource.');
    res.redirect('/signin');
  }
}

module.exports.ensureAuthenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role == 'admin') {
      return next();
    } else {
      req.logout();
      req.flash('error_msg', 'You need Admin privileges to access this page');
      res.redirect('/admin/signin');
    }
  } else {
    req.flash('error_msg', 'Please Signin First...');
    res.redirect('/admin/signin');
  }
}
