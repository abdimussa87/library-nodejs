const passport = require('passport');
require('./strategies/localStrategy.js')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieve user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
