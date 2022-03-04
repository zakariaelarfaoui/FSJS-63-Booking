const router = require("express").Router();
const hotelController = require("../Controllers/hotelController");
const upload = require("../helpers/multer");

router
  .route("/create")
  .post(upload.array("images", 8), hotelController.createHotel);
router
  .route("/update/:id")
  .put(upload.array("images", 8), hotelController.updateHotel);
router.route("/delete/:id").delete(hotelController.deleteHotel);
router.route("/").get(hotelController.getAllHotels);
router.route("/:id").get(hotelController.getOneHotel);

module.exports = router;
