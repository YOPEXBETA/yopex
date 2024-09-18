const nodemailer = require("nodemailer");

async function sendEmail(userEmail, message) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yopex.official@gmail.com",
      pass: "tuit gzjd egmq atwx",
    },
  });

  let mailOptions = {
    from: "yopex.official@gmail.com", // replace with your email address bahaeddine170@gmail.com
    to: userEmail,
    subject: "Message from your app!",
    text: message,
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmail };
