const LocalStrategy = require('passport-local').Strategy; // username/password login
const bcrypt = require('bcryptjs'); // compares password the user types with the hashed-one stored in the db
const User = require('../models/User'); // user model looks up user in db

module.exports = function(passport) {
    passport.use(new LocalStrategy( //define how passport checks credential (strategy)
      { usernameField: 'credential' }, // allow login with email or phone
      async (credential, password, done) => { //passport calls func with what user typed
        try {
            const normalizedCredential = typeof credential === 'string' ? credential.trim() : '';
            const credentialDigits = normalizedCredential.replace(/\D/g, '');
            const normalizedPhone = normalizedCredential.startsWith('+') ? `+${credentialDigits}` : '';
            const user = await User.findOne({
              $or: [
                { email: normalizedCredential.toLowerCase() },
                { username: normalizedCredential },
                ...(normalizedPhone ? [{ phone: normalizedPhone }] : [])
              ]
            });
            if (!user) {
              return done(null, false, { message: 'No account found with that email, phone or username' });
            }

            const isMatch = await bcrypt.compare(password, user.password); // bycript.compare checks passwords match
            if (!isMatch) {
              return done(null, false, { message: 'Incorrect password' });
            }

            // if everything passed, this tells passport user is authenticated and grants data
            return done(null, user);
      } catch (err) {
        // for any database errors
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    // for after login, serializeUser stores ID
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    // for subsequent requests, passport takes ID from session and fetches the full user from db (this is what populates req.user on app.js)
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};