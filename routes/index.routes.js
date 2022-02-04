const router = require("express").Router();
const hotelRoutes = require("./hotel.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const { verifyAuth, verifyPermission } = require("../middleware/auth");

router.use("/", authRoutes);
router.use(verifyAuth);
router.use("/hotels", verifyPermission("owner"), hotelRoutes);
router.use("/users", verifyPermission("admin"), userRoutes);

module.exports = router;
