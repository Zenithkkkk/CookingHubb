const User = require('../models/User'); // to create and find users
const bcrypt = require('bcryptjs'); // hashses passwords
const passport = require('passport'); // handles login

exports.getRegister = (req, res) => {
    // handles GET request to /register (renders reg form)
    res.render('auth/register');
  };

exports.postRegister = async (req, res, next) => {
    // handles submission (POST)
    const { username, email, password, password2 } = req.body;

    try {
        const normalizedEmail = typeof email === 'string' ? email.trim() : '';
        const emailLower = normalizedEmail.toLowerCase();

        // validation: email must include "@"
        if (!emailLower.includes('@')) {
          return res.render('auth/register', {
            errorKey: 'auth.emailInvalid',
            username,
            email: normalizedEmail
          });
        }

        // validation: password must be longer than 6 characters
        if (typeof password !== 'string' || password.length <= 6) {
          return res.render('auth/register', {
            errorKey: 'auth.passwordTooShort',
            username,
            email: normalizedEmail
          });
        }

        // validation, if passwords don't match, re-render form with error message & keep username/email fields
        if (password !== password2) {
          return res.render('auth/register', { errorKey: 'auth.passwordsDontMatch', username, email: normalizedEmail });
        }
        const existingUser = await User.findOne({ $or: [{ email: emailLower }, { username }] });
    if (existingUser) { // check if email or username is already registered
      return res.render('auth/register', { errorKey: 'auth.emailOrUsernameInUse', username, email: normalizedEmail });
    }
    const salt = await bcrypt.genSalt(10); // generate random string (hash uniqueness), where 10 is cost factor, to make algorithm slow and resist brute force attacks
    const hashedPassword = await bcrypt.hash(password, salt); // combines password and salt, this is what gets actually stored

    const user = await User.create({
        // creates new user doc in mongodb with hashed password
        username,
        email: emailLower,
        password: hashedPassword
      });
    
      req.login(user, (err) => {
        // provided by password, logs user in immediately after registration & redirects to /recipes
        if (err) return next(err);
        res.redirect('/recipes');
      });

    } catch (err) {
      console.error(err);
      res.render('auth/register', { errorKey: 'auth.somethingWentWrong' });
    }
  };

  exports.getLogin = (req, res) => {
    // render login form on a GET request to /login
    res.render('auth/login');
  };

  exports.postLogin = (req, res, next) => {
    // Use passport-local strategy but render login with an error message
    // (and keep user inputs) when credentials are invalid.
    const { email, password } = req.body;

    passport.authenticate('local', { failureFlash: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        let errorKey = 'auth.loginFailed';
        const message = info && info.message ? info.message : '';
        if (message === 'No account found with that email') {
          errorKey = 'auth.noAccountFound';
        } else if (message === 'Incorrect password') {
          errorKey = 'auth.incorrectPassword';
        }
        return res.status(401).render('auth/login', { errorKey, email, password });
      }

      return req.logIn(user, (err2) => {
        if (err2) return next(err2);
        return res.redirect('/recipes');
      });
    })(req, res, next);
  };

  exports.logout = (req, res, next) => {
    // clears session and logs user out
    req.logout((err) => {
      if (err) return next(err);
      res.redirect('/login');
    });
  };