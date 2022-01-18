const User = require("../models/User");

const userController = {};

userController.register = async (req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then(() => res.send(user))
    .catch((err) => res.status(404).send(err.message));
};

module.exports = userController