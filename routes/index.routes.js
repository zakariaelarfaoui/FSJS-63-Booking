const router = require("express").Router();
const hotelRoutes = require("./hotel.routes");
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");

router.use("/hotels", hotelRoutes);
router.use("/clients", userRoutes);
router.use("/", authRoutes);

module.exports = router;
