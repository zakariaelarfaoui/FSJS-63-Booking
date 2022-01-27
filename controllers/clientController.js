const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const clientValidation = require("../validation/clientValidation.js");

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

module.exports = { create, update, deleteClient, index, show };
