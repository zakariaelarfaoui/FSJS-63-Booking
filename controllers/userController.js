const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { emailConfirmation } = require("../helpers/emailConfirmation");

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
    if (user) return res.json({ message: "Email is already in use" });
    // hashing password
    const salt = await bcrypt.genSalt(10);
    result.value.password = await bcrypt.hash(result.value.password, salt);
    let code = Math.floor(100000 + Math.random() * 900000); //Generate random 6 digit code.
    let expiry = Date.now() + 60 * 1000 * 15; //Set expiry 15 mins ahead from now
    // send email
    const sendCode = await emailConfirmation(result.value.email, code);
    if (sendCode.error)
      return res
        .status(500)
        .json({ message: "Couldn't send verification email." });
    result.value.emailToken = code;
    result.value.emailTokenExpires = new Date(expiry);
    // create user
    const newUser = new User(result.value);
    await newUser.save();
    return res.status(200).json({ message: "Registration Success" });
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
  if (!user.active) return res.status(400).json({ message: "You must verify your email to activate your account"});
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
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).send("booth fields required");
    const user = await User.findOne({
      email: email,
      emailToken: code,
    });
    if (!user) return res.status(400).send("Email doesn't exist");
    if (user.emailToken < Date.now())
      return res.status(400).send("activation code expired");
    if (!user) {
      return res.status(400).send("Invalid details");
    } else {
      if (user.active) return res.status(400).send("Account already activated");
      user.emailToken = "";
      user.emailTokenExpires = null;
      user.active = true;
      await user.save();
      return res.status(200).send("Account activated.");
    }
  } catch (error) {
    console.error("activation-error", error);
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = userController;
