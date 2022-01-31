const Hotel = require("../Models/Hotel");
const hotelValidation = require("../Validation/hotelValidation");

const createHotel = async (req, res) => {
  try {
    const result = hotelValidation.createHotelValidation(req.body);
    if (result.error) return res.status(400).send(result.error.message);
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
    await hotel
      .save()
      .then((data) => {
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

module.exports = { createHotel };
