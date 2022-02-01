const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/email-confirmation/:token", userController.activateAccount);
router.post("/forgot-password", userController.forgotPassword);

module.exports = router;
