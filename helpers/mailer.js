const nodemailer = require('nodemailer');

module.exports.mailShipment = async (shipment, sendToEmail) => {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.log(err);
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: 'status@nsil.in <status@nsil.in>',
        to: sendToEmail,
        subject: 'Details',
        html: generateEmailBody(shipment),
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email Sent to Client : %s', info.response);
      });
    }
  });
}

function generateEmailBody (shipment) {
  let html = `<h1 style="text-align:center;margin-bottom:2em;">NAVBHARAT</h1><h2 style="text-align:center;margin-bottom:2em;">Shipment Details</h2>`;
  for (const key in shipment.details) {
    html += `<p><span style="margin-right: 5px;">${key}: </span><span>${shipment.details[key]}</span></p>`
  }
  return html;
}
