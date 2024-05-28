const nodemailer = require("nodemailer");
const sendEmail = (to, subject, body) => {
  const mailSettings = {
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(mailSettings);

  return transporter.sendMail({
    from: mailSettings.auth.user,
    to: to,
    subject: subject,
    html: body,
  });
};

module.exports = sendEmail;
