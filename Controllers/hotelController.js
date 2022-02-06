const Hotel = require("../Models/Hotel");
const hotelValidation = require("../Validation/hotelValidation");

const createHotel = async (req, res) => {
  try {
    req.body.ownerId = req.user._id;
    const result = hotelValidation(req.body);
    if (result.error)
      return res
        .status(400)
        .json({ error: true, message: result.error.message });
    let hotel = await Hotel.findOne({ name: result.value.name });
    if (hotel)
      return res.status(400).json({
        error: true,
        message: "Hotel already exists",
      });
    const images = req.files.map((file) => {
      return file.path;
    });
    result.value.images = images;
    hotel = new Hotel(result.value);
    await hotel.save((err, data) => {
      if (err)
        return res.status(500).json({ error: true, message: err.message });
      return res.status(200).json({
        error: false,
        message: "Hotel created successfully",
          data: data,
        });
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).json({
          error: true,
          message: error.message,
        });
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const updateHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const result = hotelValidation(req.body);
    if (result.error)
      return res
        .status(400)
        .json({
          error: true,
          message: result.error.message,
          data: result.data,
        });
    const hotel = await Hotel.findById(id);
    if (!hotel)
      return res
        .status(404)
        .json({ error: true, message: "Hotel doesn't exist or deleted" });
    if (
      (req.user.role == "owner" && hotel.ownerId == req.user._id) ||
      req.user.role == "admin"
    ) {
      hotel.name = result.value.name;
      hotel.description = result.value.description;
      hotel.type = result.value.type;
      hotel.rating = result.value.rating;
      hotel.address = result.value.address;
      hotel.ownerId = result.value.ownerId;
      hotel.save((err, data) => {
        if (err)
          return res.status(500).json({ error: true, message: err.message });
        return res.status(200).json({
          error: false,
          message: "Hotel updated successfully",
          Hotel: data,
        });
      })
      .catch((error) => {
        console.log(error.message);
        res.status(500).json({ error: true, message: error.message });
      });
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const deleteHotel = async (req, res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.exists({ _id: id });
    if (!hotel)
      return res.status(404).json({
        error: true,
        message: "Hotel doesn't exist or already deleted",
      });
    if (
      (req.user.role == "owner" && hotel.ownerId == req.user._id) ||
      req.user.role == "admin"
    ) {
      const checkDelete = await Hotel.deleteOne({ _id: id });
      if (checkDelete)
        return res
          .status(200)
          .json({ error: false, message: "Hotel has been deleted" });
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getAllHotels = async (req, res) => {
  try {
    await Hotel.find()
      .then((result) => res.status(200).json({ error: false, Hotels: result }))
      .catch((error) =>
        res.status(400).json({ error: true, message: error.message })
      );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

const getOneHotel = async (req, res) => {
  try {
    const id = req.params.id;
    await Hotel.findById(id)
      .then((result) => res.status(200).json({ error: false, Hotel: result }))
      .catch((error) =>
        res.status(400).json({ error: true, message: error.message })
      );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels,
  getOneHotel,
};
