require("dotenv").config();
const nodemailer = require("nodemailer");

module.exports = async function (email, subject, content) {
  try {
    // Create the SMTP transport.
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASSWORD,
      },
    });
    // Specify the fields in the email.
    let mailOptions = {
      from: "http:localhost:5000",
      to: email,
      subject: subject,
      html: content,
    };
    let info = await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
};
