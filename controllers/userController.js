const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.register = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  await user
    .save()
    .then(() => res.send(user))
    .catch((err) => res.status(404).send(err.message));
};

userController.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("Email doesn't exist");
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(404).send("password wrong");
  res.send("logged in");
};

module.exports = userController;
