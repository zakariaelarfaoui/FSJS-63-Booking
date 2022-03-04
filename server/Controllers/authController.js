const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailer = require("../helpers/mailer");

const {
  registerValidation,
  loginValidation,
  resetPasswordValidation,
} = require("../validation/authValidation");

const register = async (req, res) => {
  try {
    const result = registerValidation(req.body);
    if (result.error)
      return res
        .status(400)
        .json({ error: true, message: result.error.message });
    let user = await User.findOne({ email: result.value.email });
    if (user)
      return res
        .status(400)
        .json({ error: true, message: "Email is already exist" });

    const salt = await bcrypt.genSalt(10);
    result.value.password = await bcrypt.hash(result.value.password, salt);

    const newUser = new User(result.value);
    await newUser.save();
    const token = jwt.sign(
      { _id: newUser.id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "900s",
      }
    );
    console.log(token);
    const subject = "Email confirmation";
    const content = `<!DOCTYPE>
    <html>
      <body>
        <h3>Hi ${newUser.firstName} ${newUser.lastName}</h3>
        <p>We just need to verify your email address before you can access .</p>
        <a href="http://localhost:3000/activate-account/${token}" target="_blank" style="text-decoration: none;"><button style="text-align: center;text-decoration: none;background-color: #4eb5f1;color: #ffffff;border: 1px solid #4eb5f1;padding: 10px 30px;border-radius: 25px;display: block;margin: 20px;">Verify Now</button></a>
        <span>This verification will expire in 15 minutes.</span>
      </body>
    </html>`;
    const sendCode = await mailer(result.value.email, subject, content);
    if (sendCode.error)
      return res
        .status(500)
        .json({ error: true, message: "Couldn't send verification email." });
    return res.status(200).json({
      error: false,
      message: `We have sent an email with a confirmation link to your email address. In order to complete the sign-up process, please click the confirmation link.If you do not receive a confirmation email, please check your spam folder. Also, please verify that you entered a valid email address in our sign-up form.`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const login = async (req, res) => {
  const result = loginValidation(req.body);
  if (result.error)
    return res.status(400).json({ error: true, message: result.error.message });
  const user = await User.findOne({ email: result.value.email });
  if (!user)
    return res
      .status(400)
      .json({ error: true, message: "Email doesn't exist" });
  if (!user.active)
    return res.status(400).json({
      error: true,
      message: "You must verify your email to activate your account",
    });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: true, message: "password wrong" });

  const accessToken = jwt.sign(
    {
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "15m" }
  );
  const refreshToken = jwt.sign(
    {
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: "1d" }
  );
  user.refreshToken = refreshToken;
  user.save();
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    error: false,
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: user,
  });
};

const activateAccount = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    const user = await User.findById({ _id: payload._id });
    if (user.active)
      return res
        .status(400)
        .json({ error: true, message: "Account already activated" });
    user.active = true;
    user.save();
    return res
      .status(200)
      .json({ error: false, message: "Account activated successful!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: true, message: "activation link expired" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ error: true, message: "Email required" });
    const user = await User.findOne({ email: email });
    const token = jwt.sign(
      { _id: user.id },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: "900s",
      }
    );
    const subject = "Reset password";
    const content = `<!DOCTYPE>
    <html>
      <body>
        <h3>Hi ${user.firstName} ${user.lastName}</h3>
        <p style="margin-bottom: 10px;">Forgot password?</p>
        <p style="margin-bottom: 10px;">We receive a request to reset your password.</p>
        <p>to reset your password, Click on the button below:</p>
        <a href="http://localhost:3000/reset-password/${token}" target="_blank" style="text-decoration: none;"><button style="text-align: center;text-decoration: none;background-color: #4eb5f1;color: #ffffff;border: 1px solid #4eb5f1;padding: 10px 30px;border-radius: 25px;display: block;margin: 20px;">Verify Now</button></a>
        <span>This verification will expire in 15 minutes.</span>
      </body>
    </html>`;
    const sendCode = await mailer(user.email, subject, content);
    if (sendCode.error)
      return res
        .status(500)
        .json({ error: true, message: "Couldn't send Reset password email." });
    return res.status(200).json({
      error: false,
      message: `We have sent you an email with a confirmation link to reset your password`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  let payload;
  const { token } = req.params;

  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  } catch (error) {
    console.log(error.message);
    return res
      .status(400)
      .json({ error: true, message: "Reset password link expired or invalid" });
  }

  const result = resetPasswordValidation(req.body);
  if (result.error)
    return res.status(400).json({ error: true, message: result.error.message });

  try {
    const user = await User.findById(payload._id).select("_id");
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(result.value.password, salt);
    user.save((err, data) => {
      if (err)
        return res.status(500).json({ error: true, message: err.message });
      return res
        .status(200)
        .json({ error: true, message: "password reset successfully" });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
};

const refreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(401);
  const refreshToken = cookie.jwt;
  const user = await User.count({ refreshToken: refreshToken });
  if (!user) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY,
    (error, decoded) => {
      if (error) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {
          _id: decoded.id,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          email: decoded.email,
          role: decoded.role,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "15m" }
      );
      return res.status(201).json({ error: false, accessToken: accessToken });
    }
  );
};

const logout = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) return res.sendStatus(204);
  const refreshToken = cookie.jwt;
  const user = await User.findOne({ refreshToken: refreshToken });
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }
  user.refreshToken = null;
  await user.save();
  res.clearCookie("jwt", { httpOnly: true });
  return res.sendStatus(204);
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  logout,
  activateAccount,
  refreshToken,
};
