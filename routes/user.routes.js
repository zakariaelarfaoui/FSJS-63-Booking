const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.route("/create").post(userController.create);
router.route("/update/:id").put(userController.update);
router.route("/delete/:id").delete(userController.deleteClient);
router.route("/").get(userController.index);
router.route("/:id").get(userController.show);

module.exports = router;
