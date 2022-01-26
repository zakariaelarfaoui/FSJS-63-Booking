const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/email-confirmation/:token", userController.activateAccount);
router.post("/forgot-password", userController.forgotPassword);
router.get("/password-reset/:token/:id", userController.resetPasswordGet);
router.post("/password-reset/", userController.resetPasswordPost);

module.exports = router;
