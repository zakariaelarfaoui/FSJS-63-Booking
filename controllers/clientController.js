const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const clientValidation = require("../validation/clientValidation.js");

const create = async (req, res) => {
  try {
    //   validate req.body
    const result = clientValidation.createValidation(req.body);
    if (result.error) return res.status(400).send(result.error.message);
    // check if email exist
    const user = await User.findOne({ email: result.value.email });
    if (user) return res.json({ message: "Email is already exist" });
    // hashing password
    const password = "12345678";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    result.value.password = hashedPassword;
    result.value.active = true;
    // create new client
    const client = new User(result.value);
    await client.save();
    if (!client) return res.status(500).send("client not created");
    return res.status(200).send("client added successfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await User.deleteOne({ _id: id });
    if (!client) return res.status(200).send("client not deleted");
    return res.status(200).send("client deleted");
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const index = async (req, res) => {
  try {
    const clients = await User.find({ role: 0 });
    if (!clients) return res.status(404).send("something went wrong");
    return res.status(200).send(clients);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).send("something went wrong");
    return res.status(200).send(user);
  } catch (error) {}
};

module.exports = { create, update, deleteClient, index, show };
