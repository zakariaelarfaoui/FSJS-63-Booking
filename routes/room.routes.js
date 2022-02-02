const router = require("express").Router();
const roomController = require("../controllers/roomController");
const upload = require("../middleware/multer");

router
  .route("/create")
  .post(upload.array("images", 8), roomController.createRoom);

module.exports = router;