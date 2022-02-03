const router = require("express").Router();

const authenticationController = require("../controllers/authenticationController");

router.post("/register", authenticationController.register);
router.post("/login", authenticationController.login);
router.get(
  "/email-confirmation/:token",
  authenticationController.activateAccount
);
router.post("/forgot-password", authenticationController.forgotPassword);

module.exports = router;
