const nodemailer = require("nodemailer");

async function sendEmail(userEmail, message) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bahaeddine170@gmail.com",
      pass: "opfl mvzi qedi fjcc",
    },
  });

  let mailOptions = {
    from: "bahaeddine170@gmail.com", // replace with your email address
    to: userEmail,
    subject: "Message from your app!",
    text: message,
  };

  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
}

module.exports = { sendEmail };
