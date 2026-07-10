const nodemailer = require('nodemailer');
const { CONTACT_INFO_BLOCKS, SCAN_CAPTIONS } = require('../config/contactContent');

function buildTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
}

exports.getContact = (req, res) => {
  res.render('contact/index', {
    infoBlocks: CONTACT_INFO_BLOCKS,
    scanCaptions: SCAN_CAPTIONS,
    success: false,
    errorKey: null,
    form: {}
  });
};

exports.postContact = async (req, res) => {
  const name = (req.body.name || '').trim();
  const contact = (req.body.contact || '').trim();
  const message = (req.body.message || '').trim();
  const form = { name, contact, message };

  if (!name) {
    return res.status(400).render('contact/index', {
      infoBlocks: CONTACT_INFO_BLOCKS,
      scanCaptions: SCAN_CAPTIONS,
      success: false,
      errorKey: 'contact.nameRequired',
      form
    });
  }

  if (!contact) {
    return res.status(400).render('contact/index', {
      infoBlocks: CONTACT_INFO_BLOCKS,
      scanCaptions: SCAN_CAPTIONS,
      success: false,
      errorKey: 'contact.contactRequired',
      form
    });
  }

  if (!message) {
    return res.status(400).render('contact/index', {
      infoBlocks: CONTACT_INFO_BLOCKS,
      scanCaptions: SCAN_CAPTIONS,
      success: false,
      errorKey: 'contact.messageRequired',
      form
    });
  }

  const transporter = buildTransporter();
  if (!transporter) {
    return res.status(500).render('contact/index', {
      infoBlocks: CONTACT_INFO_BLOCKS,
      scanCaptions: SCAN_CAPTIONS,
      success: false,
      errorKey: 'contact.mailNotConfigured',
      form
    });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'cacffe1@gmail.com';

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: toEmail,
      replyTo: contact.includes('@') ? contact : undefined,
      subject: `[CookingHub] Feedback from ${name}`,
      text: [
        `Name: ${name}`,
        `Email / Phone: ${contact}`,
        '',
        'Message:',
        message
      ].join('\n'),
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email / Phone:</strong> ${escapeHtml(contact)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `
    });

    res.render('contact/index', {
      infoBlocks: CONTACT_INFO_BLOCKS,
      scanCaptions: SCAN_CAPTIONS,
      success: true,
      errorKey: null,
      form: {}
    });
  } catch (err) {
    console.error('Contact form email error:', err);
    res.status(500).render('contact/index', {
      infoBlocks: CONTACT_INFO_BLOCKS,
      scanCaptions: SCAN_CAPTIONS,
      success: false,
      errorKey: 'contact.sendFailed',
      form
    });
  }
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
