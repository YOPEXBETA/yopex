const nodemailer = require("nodemailer");

async function sendEmail(userEmail, message) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "test@gmail.com",
      pass: "password",
    },
  });

  let mailOptions = {
    from: "test@gmail.com", // replace with your email address
    to: userEmail,
    subject: "Message from your app!",
    text: message,
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmail };
