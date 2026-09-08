const User = require('../models/User'); // to create and find users
const bcrypt = require('bcryptjs'); // hashses passwords
const passport = require('passport'); // handles login

const PHONE_COUNTRY_OPTIONS = [
  { country: 'Argentina', code: '+54' },
  { country: 'Australia', code: '+61' },
  { country: 'Austria', code: '+43' },
  { country: 'Belgium', code: '+32' },
  { country: 'Brazil', code: '+55' },
  { country: 'Canada', code: '+1' },
  { country: 'Chile', code: '+56' },
  { country: 'Mainland China', code: '+86' },
  { country: 'Colombia', code: '+57' },
  { country: 'Denmark', code: '+45' },
  { country: 'Egypt', code: '+20' },
  { country: 'Finland', code: '+358' },
  { country: 'France', code: '+33' },
  { country: 'Germany', code: '+49' },
  { country: 'Greece', code: '+30' },
  { country: 'Hong Kong', code: '+852' },
  { country: 'India', code: '+91' },
  { country: 'Indonesia', code: '+62' },
  { country: 'Iran', code: '+98' },
  { country: 'Ireland', code: '+353' },
  { country: 'Israel', code: '+972' },
  { country: 'Italy', code: '+39' },
  { country: 'Japan', code: '+81' },
  { country: 'Kenya', code: '+254' },
  { country: 'Malaysia', code: '+60' },
  { country: 'Mexico', code: '+52' },
  { country: 'Morocco', code: '+212' },
  { country: 'Netherlands', code: '+31' },
  { country: 'New Zealand', code: '+64' },
  { country: 'Nigeria', code: '+234' },
  { country: 'Norway', code: '+47' },
  { country: 'Pakistan', code: '+92' },
  { country: 'Peru', code: '+51' },
  { country: 'Philippines', code: '+63' },
  { country: 'Poland', code: '+48' },
  { country: 'Portugal', code: '+351' },
  { country: 'Romania', code: '+40' },
  { country: 'Russia', code: '+7' },
  { country: 'Saudi Arabia', code: '+966' },
  { country: 'Singapore', code: '+65' },
  { country: 'South Africa', code: '+27' },
  { country: 'South Korea', code: '+82' },
  { country: 'Spain', code: '+34' },
  { country: 'Sweden', code: '+46' },
  { country: 'Switzerland', code: '+41' },
  { country: 'Taiwan', code: '+886' },
  { country: 'Thailand', code: '+66' },
  { country: 'Turkey', code: '+90' },
  { country: 'United Arab Emirates', code: '+971' },
  { country: 'United Kingdom', code: '+44' },
  { country: 'United States', code: '+1' },
  { country: 'Vietnam', code: '+84' }
];

const PHONE_LENGTH_RULES = {
  '+54': [10],
  '+61': [9],
  '+43': [10, 11],
  '+32': [8, 9],
  '+55': [10, 11],
  '+1': [10],
  '+56': [9],
  '+86': [11],
  '+57': [10],
  '+45': [8],
  '+20': [10],
  '+358': [9, 10],
  '+33': [9],
  '+49': [10, 11],
  '+30': [10],
  '+852': [8],
  '+91': [10],
  '+62': [9, 10, 11, 12],
  '+98': [10],
  '+353': [9],
  '+972': [9],
  '+39': [9, 10],
  '+81': [10],
  '+254': [9],
  '+60': [9, 10],
  '+52': [10],
  '+212': [9],
  '+31': [9],
  '+64': [8, 9, 10],
  '+234': [10],
  '+47': [8],
  '+92': [10],
  '+51': [9],
  '+63': [10],
  '+48': [9],
  '+351': [9],
  '+40': [9],
  '+7': [10],
  '+966': [9],
  '+65': [8],
  '+27': [9],
  '+82': [9, 10],
  '+34': [9],
  '+46': [9],
  '+41': [9],
  '+886': [9],
  '+66': [9],
  '+90': [10],
  '+971': [9],
  '+44': [10],
  '+84': [9, 10]
};

function renderRegister(res, data = {}) {
  res.render('auth/register', {
    phoneCountryOptions: PHONE_COUNTRY_OPTIONS,
    ...data
  });
}

function sanitizeNext(raw) {
  if (!raw || typeof raw !== 'string') return '';
  if (!raw.startsWith('/') || raw.startsWith('//')) return '';
  return raw;
}

function isValidPhoneLength(countryCode, phoneDigits) {
  const allowedLengths = PHONE_LENGTH_RULES[countryCode];
  if (!allowedLengths) {
    return phoneDigits.length >= 6 && phoneDigits.length <= 15;
  }
  return allowedLengths.includes(phoneDigits.length);
}

exports.getRegister = (req, res) => {
    // handles GET request to /register (renders reg form)
    const next = sanitizeNext(req.query.next);
    if (next) req.session.authNext = next;
    renderRegister(res, { phoneCountryCode: '+86', next: next || '' });
  };

exports.postRegister = async (req, res, next) => {
    // handles submission (POST)
    const { username, email, phoneCountryCode, phoneNumber, password, password2 } = req.body;

    const formData = {
      username,
      email: typeof email === 'string' ? email.trim() : '',
      phoneCountryCode: typeof phoneCountryCode === 'string' ? phoneCountryCode.trim() : '+86',
      phoneNumber: typeof phoneNumber === 'string' ? phoneNumber.trim() : '',
      next: sanitizeNext(req.body.next) || ''
    };

    try {
        const normalizedEmail = formData.email;
        const emailLower = normalizedEmail.toLowerCase();
        const normalizedCountryCode = formData.phoneCountryCode || '+86';
        const normalizedPhoneNumber = formData.phoneNumber;
        const phoneDigits = normalizedPhoneNumber.replace(/\D/g, '');
        const hasEmail = Boolean(normalizedEmail);
        const hasPhone = Boolean(phoneDigits);

        if (!hasEmail && !hasPhone) {
          return renderRegister(res, {
            errorKey: 'auth.contactRequired',
            ...formData
          });
        }

        if (hasEmail && !emailLower.includes('@')) {
          return renderRegister(res, {
            errorKey: 'auth.emailInvalid',
            ...formData
          });
        }

        if (hasPhone) {
          if (!normalizedCountryCode || !PHONE_COUNTRY_OPTIONS.some(option => option.code === normalizedCountryCode)) {
            return renderRegister(res, {
              errorKey: 'auth.phoneCountryCodeInvalid',
              ...formData,
              phoneCountryCode: normalizedCountryCode || '+86'
            });
          }

          if (!isValidPhoneLength(normalizedCountryCode, phoneDigits)) {
            return renderRegister(res, {
              errorKey: 'auth.phoneInvalid',
              ...formData
            });
          }
        }

        const normalizedPhone = hasPhone ? `${normalizedCountryCode}${phoneDigits}` : undefined;

        // validation: password must be longer than 6 characters
        if (typeof password !== 'string' || password.length <= 6) {
          return renderRegister(res, {
            errorKey: 'auth.passwordTooShort',
            ...formData
          });
        }

        // validation, if passwords don't match, re-render form with error message & keep username/email fields
        if (password !== password2) {
          return renderRegister(res, {
            errorKey: 'auth.passwordsDontMatch',
            ...formData
          });
        }

        const duplicateConditions = [{ username }];
        if (hasEmail) duplicateConditions.push({ email: emailLower });
        if (hasPhone) duplicateConditions.push({ phone: normalizedPhone });

        const existingUser = await User.findOne({ $or: duplicateConditions });
    if (existingUser) { // check if email or username is already registered
      return renderRegister(res, {
        errorKey: 'auth.emailOrUsernameInUse',
        ...formData
      });
    }
    const salt = await bcrypt.genSalt(10); // generate random string (hash uniqueness), where 10 is cost factor, to make algorithm slow and resist brute force attacks
    const hashedPassword = await bcrypt.hash(password, salt); // combines password and salt, this is what gets actually stored

    const userPayload = {
        username,
        password: hashedPassword
      };

    if (hasEmail) {
      userPayload.email = emailLower;
    }

    if (hasPhone) {
      userPayload.phoneCountryCode = normalizedCountryCode;
      userPayload.phoneNumber = phoneDigits;
      userPayload.phone = normalizedPhone;
    }

    const user = await User.create(userPayload);
    const redirectTo = sanitizeNext(req.body.next) || sanitizeNext(req.session.authNext) || '/recipes';
    
      req.login(user, (err) => {
        // provided by password, logs user in immediately after registration & redirects to /recipes
        if (err) return next(err);
        delete req.session.authNext;
        res.redirect(redirectTo);
      });

    } catch (err) {
      console.error(err);

      if (err && err.code === 11000) {
        const field = err.keyPattern ? Object.keys(err.keyPattern)[0] : '';
        if (field === 'email' || field === 'username' || field === 'phone') {
          return renderRegister(res, {
            errorKey: 'auth.emailOrUsernameInUse',
            ...formData
          });
        }
      }

      renderRegister(res, {
        errorKey: 'auth.somethingWentWrong',
        ...formData
      });
    }
  };

  exports.getLogin = (req, res) => {
    // render login form on a GET request to /login
    const next = sanitizeNext(req.query.next);
    if (next) req.session.authNext = next;
    res.render('auth/login', { next: next || '' });
  };

  exports.postLogin = (req, res, next) => {
    // Use passport-local strategy but render login with an error message
    // (and keep user inputs) when credentials are invalid.
    const { credential, password } = req.body;
    const redirectTo = sanitizeNext(req.body.next) || sanitizeNext(req.session.authNext) || '/recipes';

    passport.authenticate('local', { failureFlash: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        let errorKey = 'auth.loginFailed';
        const message = info && info.message ? info.message : '';
        if (message === 'No account found with that email, phone or username') {
          errorKey = 'auth.noAccountFound';
        } else if (message === 'No account found with that email or phone') {
          errorKey = 'auth.noAccountFound';
        } else if (message === 'Incorrect password') {
          errorKey = 'auth.incorrectPassword';
        }
        return res.status(401).render('auth/login', {
          errorKey,
          credential,
          password,
          next: sanitizeNext(req.body.next) || ''
        });
      }

      return req.logIn(user, (err2) => {
        if (err2) return next(err2);
        delete req.session.authNext;
        return res.redirect(redirectTo);
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