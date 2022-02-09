const router = require("express").Router();
const reservationController = require("../Controllers/reservationController");

router.route("/create").post(reservationController.createReservation);
router.route("/available-rooms").get(reservationController.availableRooms);

module.exports = router;
