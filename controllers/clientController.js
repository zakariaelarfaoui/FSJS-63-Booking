const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const clientValidation = require("../validation/clientValidation.js");

const create = async (req, res) => {
  try {
    const result = clientValidation.createValidation(req.body);
    if (result.error)
      return res
        .status(400)
        .json({ error: true, message: result.error.message });
    const user = await User.findOne({ email: result.value.email });
    if (user)
      return res
        .status(400)
        .json({ error: true, message: "Email is already exist" });
    const password = "12345678";
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    result.value.password = hashedPassword;
    result.value.active = true;
    const client = new User(result.value);
    await client.save();
    if (!client)
      return res.status(500).json({ error: true, message: error.message });
    return res.status(200).json({
      error: false,
      message: "client added successfully",
      client: client,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const result = clientValidation.updateValidation(req.body);
    if (result.error)
      return res
        .status(500)
        .json({ error: true, message: result.error.message });
    const client = await User.findById(id);
    (client.firstName = result.value.firstName),
      (client.lastName = result.value.lastName),
      (client.email = result.value.email),
      (client.role = result.value.role),
      (client.active = result.value.active),
      client
        .save()
        .then(() => {
          return res
            .status(200)
            .json({ error: false, message: "client updated", client: client });
        })
        .catch((err) => {
          res.status(500).json({ error: true, message: err.message });
        });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await User.deleteOne({ _id: id });
    if (!client)
      return res.status(400).json({ error: true, message: error.message });
    return res.status(200).json({ error: false, message: "Client deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const index = async (req, res) => {
  try {
    const clients = await User.find({ role: 0 });
    if (!clients)
      return res.status(400).json({ error: true, message: error.message });
    return res.status(200).json({ error: false, Clients: clients });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await User.findById(id);
    if (!client)
      return res.status(400).json({ error: true, message: error.message });
    return res.status(200).json({ error: false, Client: client });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = { create, update, deleteClient, index, show };
