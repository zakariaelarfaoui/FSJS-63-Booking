const router = require("express").Router();
const userController = require("../controllers/userController.js");

router.route("/create").post(userController.createUser);
router.route("/update/:id").put(userController.updateUser);
router.route("/delete/:id").delete(userController.deleteUser);
router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getOneUser);

module.exports = router;
