const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const helper = require('sendgrid').mail;
const messagingUtil = {};

messagingUtil.sendTemplatePromise = function(template, email, _subs){
  let templateId, subject;
  const subs = _subs;

  if(template === 'welcome'){
    templateId = '8f6bd762-666a-4655-b3c7-b91177b85141';
    subject = 'Welcome to Storytime';
  }

  if(template === 'resetPassword'){
    templateId = 'd00d68f8-0061-4746-ba33-e48ca7dd4d88';
    subject = 'Reset Your Password';
  }

  return new Promise(function (fulfill, reject){
    const to_email = new helper.Email(email);
    const from_email = new helper.Email('donotreply@storytime.com');
    const mail = new helper.Mail(from_email, subject, to_email);
    const personalization = new helper.Personalization()

    // apply template and template data
    mail.setTemplateId(templateId);
    if(subs){
      subs.map(function(sub){
        mail.addPersonalization(new helper.Substitution(sub.text, sub.value))
      });
    }

    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });
    
    sg.API(request, function(error, response) {
      debugger;
      if(error){
        reject(error);
      } else {
        fulfill(response);
      }
    });
  });
}

module.exports = messagingUtil;

//     const to_email = new helper.Email(user.email);
//     const from_email = new helper.Email('donotreply@storytime.com');
//     const subject = 'Reset your password';
//     const content = new helper.Content('text/plain',
//       `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
//       Please click on the following link, or paste this into your browser to complete the process:\n\n
//       http://${req.headers.host}/reset/${token}\n\n
//       If you did not request this, please ignore this email and your password will remain unchanged.\n`);
//     const mail = new helper.Mail(from_email, subject, to_email, content);
//
//     const request = sg.emptyRequest({
//       method: 'POST',
//       path: '/v3/mail/send',
//       body: mail.toJSON(),
//     });
//
//     sg.API(request, function(error, response) {
//       if(error){
//         req.flash('info', { msg: `An error occured.` });
//         done(error);
//       } else {
//         req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
//         done(error);
//       }
//     });
//   }
// ], (err) => {
//   if (err) { return next(err); }
//   res.redirect('/forgot');
// });
