const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const helper = require('sendgrid').mail;
const messagingUtil = {};

messagingUtil.sendTemplate = function(template, email, _subs, callback){
  let templateId,
  subject,
  from_email = 'donotreply@'+process.env.DOMAIN;
  const subs = _subs;
  if(template === 'welcome'){ templateId = '8f6bd762-666a-4655-b3c7-b91177b85141'; }
  if(template === 'resetPassword'){ templateId = 'd00d68f8-0061-4746-ba33-e48ca7dd4d88'; }

  const request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [ { email: email, }, ],
          'substitutions': subs,
        },
      ],
      from: { email: from_email, },
      'template_id': templateId,
    },
  });

  sg.API(request, function(error, response) {
    if(error){
      callback(error)
    } else {
      callback(response)
    }
  });
}

module.exports = messagingUtil;
