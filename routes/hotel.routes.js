const router = require("express").Router();
const hotelController = require("../Controllers/hotelController");
const upload = require('../middleware/multer');

router
  .route("/create")
  .post(upload.array("images", 8), hotelController.createHotel);
router
  .route("/update/:id")
  .put(upload.array("images", 8), hotelController.updateHotel);

module.exports = router;
