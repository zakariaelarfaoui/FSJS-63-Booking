const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const clientValidation = require("../validation/clientValidation.js");

const update = async (req, res) => {
  try {
    const id = req.params.id;
    //   validate req.body
    const result = clientValidation.updateValidation(req.body);
    if (result.error) return res.status(500).send(result.error.message);
    // update client
    const client = await User.findById(id);
    (client.firstName = result.value.firstName),
      (client.lastName = result.value.lastName),
      (client.email = result.value.email),
      (client.role = result.value.role),
      (client.active = result.value.active),
      client
        .save()
        .then(() => {
          return res.status(200).send("client updated");
        })
        .catch((err) => {
          res.status(500).send("something went wrong", err.message);
        });
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

module.exports = { create, update, deleteClient, index, show };
