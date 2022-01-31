const router = require("express").Router();
const hotelController = require("../Controllers/hotelController");
const upload = require('../middleware/multer');

router
  .route("/create")
  .post(upload.array("images", 8), hotelController.createHotel);

module.exports = router;
