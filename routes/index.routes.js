const router = require('express').Router();
const hotelRoutes = require('./hotel.routes')
const clientRoutes = require('./client.routes')

router.use("/hotels", hotelRoutes);
router.use("/clients", clientRoutes);

module.exports = router;