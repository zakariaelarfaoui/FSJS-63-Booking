const router = require("express").Router();
const hotelRoutes = require("./hotel.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const roomRoutes = require("./room.routes");
const reservationRoutes = require("./reservation.routes");
const { verifyAuth, verifyPermission } = require("../middleware/auth");

router.use("/", authRoutes);
router.use("/reservations", reservationRoutes);
router.use(verifyAuth);
router.use("/hotels", verifyPermission("owner"), hotelRoutes);
router.use("/users", verifyPermission("admin"), userRoutes);
router.use("/rooms", verifyPermission("owner"), roomRoutes);

module.exports = router;
