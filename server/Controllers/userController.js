const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const userValidation = require("../validation/userValidation.js");

const createUser = async (req, res) => {
  try {
    const result = userValidation.createValidation(req.body);
    if (result.error)
      return res
        .status(400)
        .json({ error: true, message: result.error.message });
    const checkUser = await User.findOne({ email: result.value.email });
    if (checkUser)
      return res
        .status(400)
        .json({ error: true, message: "Email is already exist" });
    const password = "12345678";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    result.value.password = hashedPassword;
    result.value.active = true;
    const user = new User(result.value);
    await user.save();
    if (!user)
      return res.status(500).json({ error: true, message: error.message });
    return res.status(200).json({
      error: false,
      message: "user added successfully",
      user: user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = userValidation.updateValidation(req.body);
    if (result.error)
      return res
        .status(500)
        .json({ error: true, message: result.error.message });
    const user = await User.findById(id);
    (user.firstName = result.value.firstName),
      (user.lastName = result.value.lastName),
      (user.email = result.value.email),
      (user.role = result.value.role),
      (user.active = result.value.active),
      user
        .save()
        .then(() => {
          return res
            .status(200)
            .json({ error: false, message: "user updated", user: user });
        })
        .catch((err) => {
          res.status(500).json({ error: true, message: err.message });
        });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.deleteOne({ _id: id });
    if (!user)
      return res.status(400).json({ error: true, message: error.message });
    return res.status(200).json({ error: false, message: "user deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let query = null;
    let { role, active } = req.query;
    if (role && active) {
      query = { role: role, active: active };
    } else if (role) {
      query = { role: role };
    } else if (active) {
      query = { active: active };
    } else {
      query = {};
    }
    const users = await User.find(query);
    if (!users)
      return res.status(400).json({ error: true, message: error.message });
    return res.status(200).json({ error: false, users: users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
      return res.status(400).json({ error: true, message: error.message });
    return res.status(200).json({ error: false, user: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getOneUser,
};
