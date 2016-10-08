const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport( sgTransport({ auth: { api_key: process.env.SENDGRID_API_KEY } }))

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('message', 'Message cannot be blank').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  const mailOptions = {
    to: 'johndangerstorey@gmail.com',
    from: `${req.body.name} <${req.body.email}>`,
    subject: 'Contact Form | Storytime',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      debugger;
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email has been sent successfully!' });
    res.redirect('/contact');
  });
};
