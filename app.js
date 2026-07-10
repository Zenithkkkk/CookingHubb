require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const passport = require('passport');
const methodOverride = require('method-override');
const path = require('path');
const { normalizeLang, t: translate } = require('./config/i18n');

const app = express();

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    // ensure default admin user exists
    try {
      const User = require('./models/User');
      const bcrypt = require('bcryptjs');
      const existingAdmin = await User.findOne({ username: 'admin' });
      const adminPassword = process.env.ADMIN_PASSWORD || 'Lwx2766725828!';
      if (!existingAdmin) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        await User.create({
          username: 'admin',
          email: 'admin@example.com',
          phoneCountryCode: '+1',
          phoneNumber: '0000000000',
          phone: '+10000000000',
          password: hashedPassword,
          isAdmin: true
        });
        console.log('Default admin user created: admin');
      } else if (!existingAdmin.isAdmin) {
        existingAdmin.isAdmin = true;
        await existingAdmin.save();
        console.log('Existing admin user updated with admin privileges');
      }
    } catch (e) {
      console.error('Error ensuring admin user:', e);
    }
  })
  .catch(err => console.log(err));

// passport config 
require('./config/passport')(passport);

// template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // where to find ejs

// middleware
app.use(express.urlencoded({ extended: true })); // app can read data from HTML forms
app.use(express.json()); // app can read data from json requests
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); // lets public folder be accesed from browser

// session
app.use(session({
  secret: process.env.SESSION_SECRET, //private key
  resave: false, // don't re-save session if nothing changed
  saveUninitialized: false, // no session created for no logged-in users
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }) // save sassions to mongodb in case of restart
}));

// passport middleware (required)
app.use(passport.initialize()); 
app.use(passport.session()); // remembers who's logged in accross requests

// global variable so every EJS view knows who's logged in
app.use((req, res, next) => { // this func runs on every request before the route handler
  res.locals.currentUser = req.user || null; // req.user set by passport when smn logs in, with .currentUser every EJS template automatically has access to logged-in user
  res.locals.lang = normalizeLang(req.session.lang);
  res.locals.t = (key, params) => translate(res.locals.lang, key, params);
  next();
});

// routes 
app.get('/', (req, res) => res.redirect('/recipes'));
app.use('/', require('./routes/authRoutes')); //any route defined here is mounted at /routes/..
app.use('/', require('./routes/languageRoutes'));
app.use('/recipes', require('./routes/recipeRoutes')); // mount routes under /recipe
app.use('/profile', require('./routes/profileRoutes'));
app.use('/', require('./routes/contactRoutes'));

const PORT = process.env.PORT || 3000; // start server from PORT from .env, otherwise 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));