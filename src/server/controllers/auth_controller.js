exports.signIn = (req, res, next, passport) => {
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
  })(req, res, next);
};

exports.signOut = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.handleCallback = (req, res, next, passport) => {
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/',
    session: true,
  })(req, res, next);
};
