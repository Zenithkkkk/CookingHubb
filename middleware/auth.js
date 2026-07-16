exports.isAuthenticated = (req, res, next) => { //method for passport to add to every req, to verify user is logged in
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  };

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user && req.user.isAdmin) {
    return next();
  }
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  return res.redirect('/recipes');
};
