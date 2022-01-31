const router = require('express').Router();
const hotelRoutes = require('./hotel.routes')

router.use("/hotel", hotelRoutes);

module.exports = router;