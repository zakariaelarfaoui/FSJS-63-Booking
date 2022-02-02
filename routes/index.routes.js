const router = require("express").Router();
const hotelRoutes = require("./hotel.routes");
const clientRoutes = require("./client.routes");
const roomRoutes = require("./room.routes");
const { route } = require("./room.routes");

router.use("/hotels", hotelRoutes);
router.use("/clients", clientRoutes);
router.use("/rooms", roomRoutes);

module.exports = router;
