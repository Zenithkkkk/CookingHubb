const express = require('express');
const { normalizeLang } = require('../config/i18n');

const router = express.Router();

// Set language and redirect back to the previous page.
router.get('/language', (req, res) => {
  const nextUrl = req.query.next || req.get('Referer') || '/recipes';
  const lang = normalizeLang(req.query.lang);
  req.session.lang = lang;
  res.redirect(nextUrl);
});

module.exports = router;

