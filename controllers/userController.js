const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");

const {
  registerValidation,
  loginValidation,
} = require("../validation/authValidation");

const userController = {};

userController.register = async (req, res) => {
  try {
    // validate user input
    const result = registerValidation(req.body);
    if (result.error) return res.status(400).send(result.error.message);
    //Check if the email has been already registered.
    let user = await User.findOne({ email: result.value.email });
    if (user) return res.json({ message: "Email is already exist" });

    // hashing password
    const salt = await bcrypt.genSalt(10);
    result.value.password = await bcrypt.hash(result.value.password, salt);

    // create user
    const newUser = new User(result.value);
    await newUser.save();
    // send email
    const token = jwt.sign({ _id: newUser.id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "900s",
    });
    const subject = "Email confirmation";
    const content = `<!DOCTYPE>
    <html>
      <body>
        <h3>Hi ${newUser.firstName} ${newUser.lastName}</h3>
        <p>We just need to verify your email address before you can access .</p>
        <a href="http://localhost:5000/email-confirmation/${token}" target="_blank" style="text-decoration: none;"><button style="text-align: center;text-decoration: none;background-color: #4eb5f1;color: #ffffff;border: 1px solid #4eb5f1;padding: 10px 30px;border-radius: 25px;display: block;margin: 20px;">Verify Now</button></a>
        <span>This verification will expire in 15 minutes.</span>
      </body>
    </html>`;
    // const sendCode = await emailConfirmation(result.value.email, code);
    const sendCode = await mailer(result.value.email, subject, content);
    if (sendCode.error)
      return res
        .status(500)
        .json({ message: "Couldn't send verification email." });
    return res.status(200).send(
      `We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link.

      If you do not receive a confirmation email, please check your spam folder. Also, please verify that you entered a valid email address in our sign-up form.`
    );
  } catch (error) {
    console.error("signup-error", error);
    return res.status(500).json({ message: "Cannot Register" });
  }
};

userController.login = async (req, res) => {
  const result = loginValidation(req.body);
  if (result.error) return res.status(400).send(result.error.message);
  const user = await User.findOne({ email: result.value.email });
  if (!user) return res.status(404).send("Email doesn't exist");
  // Throw error if account is not activated
  if (!user.active)
    return res
      .status(400)
      .json({ message: "You must verify your email to activate your account" });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("password wrong");

  const token = jwt.sign(
    {
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      active: user.active,
    },
    process.env.TOKEN_SECRET_KEY
  );
  res.header("auth-token", token).send(token);
};

userController.activateAccount = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const user = await User.findOne({ id: payload._id });
    if (user.active) return res.status(400).send("Account already activated");
    user.active = true;
    user.save();
    return res.status(200).send("Your login was successful!");
  } catch (error) {
    console.log(error);
    return res.status(400).send("activation link expired");
  }
};

userController.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.send("Insert email");
    const user = await User.findOne({ email: email });
    // send email
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "900s",
    });
    const subject = "Reset password";
    const content = `<!DOCTYPE>
    <html>
      <body>
        <h3>Hi ${user.firstName} ${user.lastName}</h3>
        <p style="margin-bottom: 10px;">Forgot password?</p>
        <p style="margin-bottom: 10px;">We receive a request to reset your password.</p>
        <p>to reset your password, Click on the button below:</p>
        <a href="http://localhost:5000/password-reset/${token}" target="_blank" style="text-decoration: none;"><button style="text-align: center;text-decoration: none;background-color: #4eb5f1;color: #ffffff;border: 1px solid #4eb5f1;padding: 10px 30px;border-radius: 25px;display: block;margin: 20px;">Verify Now</button></a>
        <span>This verification will expire in 15 minutes.</span>
      </body>
    </html>`;
    // const sendCode = await emailConfirmation(result.value.email, code);
    const sendCode = await mailer(user.email, subject, content);
    if (sendCode.error)
      return res
        .status(500)
        .json({ message: "Couldn't send Reset password email." });
    return res
      .status(200)
      .send(
        `We have sent you an email with a confirmation link to reset your password`
      );
  } catch (error) {
    console.log(error);
  }
};

module.exports = userController;
