const router = require("express").Router();

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/activate-account/:token", authController.activateAccount);
router.post("/forgot-password", authController.forgotPassword);
router.route("/refresh-token").get(authController.refreshToken);
router.route("/logout").get(authController.logout);

module.exports = router;
