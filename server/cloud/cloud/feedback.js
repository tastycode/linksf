var mailgunCredentials = require('cloud/cloud/mailgun_credentials');
var Mailgun = require('mailgun');

module.exports = function (params, response) {
  Mailgun.initialize(mailgunCredentials.domain, mailgunCredentials.api_key);

  if ( !params.from_email || !params.from_name || !params.subject || !params.body ) { 
    response.error("Please fill everything out");
  }

  Mailgun.sendEmail({
    to: "linksf@zendesk.com",
    from: params.from_email,
    subject: params.subject,
    text: params.body
  }, {
    success: function(httpResponse) {
      console.log(httpResponse);
      response.success("Email sent!");
    },
    error: function(httpResponse) {
      console.error(httpResponse);
      response.error("Uh oh, something went wrong");
    }
  });
};

