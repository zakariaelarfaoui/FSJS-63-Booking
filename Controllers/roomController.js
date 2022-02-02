const Room = require("../Models/Room");
const roomValidation = require("../validation/roomValidation");

const createRoom = async (req, res) => {
  try {
    const result = roomValidation(req.body);
    if (result.error)
      return res.status(400).json({
        error: true,
        message: result.error.message,
      });
    const roomCheck = await Room.findOne({ number: result.value.number });
    if (roomCheck)
      return res
        .status(400)
        .json({ error: true, message: "room already exists" });
    const images = req.files.map((file) => {
      return file.path;
    });
    result.value.images = images;
    const room = new Room(result.value);
    await room
      .save()
      .then((result) => {
        return res.status(200).json({
          error: false,
          message: "room created successfully",
          room: result,
        });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: true, message: err.message });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = { createRoom };
