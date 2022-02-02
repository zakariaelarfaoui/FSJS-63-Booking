const router = require("express").Router();
const roomController = require("../controllers/roomController");
const upload = require("../middleware/multer");

router
  .route("/create")
  .post(upload.array("images", 8), roomController.createRoom);

router
  .route("/update/:id")
  .put(upload.array("images", 8), roomController.updateRoom);

module.exports = router;
