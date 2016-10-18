const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const helper = require('sendgrid').mail;

module.exports.welcomeEmailPromise = function(emailAddress){
  return new Promise(function (fulfill, reject){
    const to_email = new helper.Email(user.email);
    const from_email = new helper.Email('donotreply@storytime.com');
    const subject = 'Welcome to Storytime';
    const mail = new helper.Mail(from_email, subject, to_email);
    mail.setTemplateId('8f6bd762-666a-4655-b3c7-b91177b85141');
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
      if(error){
        reject(error);
        next(error);
      } else {
        fulfill(response);
      }
    });
  });
};
