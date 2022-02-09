const router = require("express").Router();
const reservationController = require("../Controllers/reservationController");

router.route("/create").post(reservationController.createReservation);

module.exports = router