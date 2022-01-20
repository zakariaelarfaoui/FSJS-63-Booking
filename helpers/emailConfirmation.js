require("dotenv").config();
const nodemailer = require("nodemailer");

const emailConfirmation = async (email, code) => {
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
      subject: "Verify your email",
      html: `<!DOCTYPE>
    <html>
      <body>
        <h3 style="display: inline-block">Your authentication code is : </h3> 
        <p><b>${code}</b></p>
        <p>this code will expire in 15 min</p>
      </body>
    </html>`,
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

module.exports = { emailConfirmation };
