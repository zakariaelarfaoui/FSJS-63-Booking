const Reservation = require("../Models/Reservation");
const reservationValidation = require("../Validation/reservationValidation");
const Room = require("../Models/Room");

const createReservation = async (req, res) => {
  try {
    const result = reservationValidation(req.body);
    if (result.error)
      return res
        .status(400)
        .json({ error: true, message: result.error.message });
    const reservationCheck = await Reservation.findOne({
      $or: [
        {
          $and: [
            {
              from: { $lte: result.value.from },
              to: { $gt: result.value.from },
            },
          ],
        },
        { from: { $gt: result.value.from, $lte: result.value.to } },
      ],
      roomId: result.value.roomId,
    });
    if (reservationCheck)
      return res
        .status(400)
        .json({ error: true, message: "the room reserved in this date" });
    const reservation = new Reservation(result.value);
    await reservation.save((err, data) => {
      if (err)
        return res.status(400).json({
          error: true,
          message: err.message,
        });
      return res.status(200).json({
        error: false,
        message: "reservation created",
        Reservation: reservation,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

const availableRooms = async (req, res) => {
  try {
    const { from, to } = req.query;
    const filter = {
      $or: [
        {
          $and: [
            {
              from: { $lte: from },
              to: { $gt: from },
            },
          ],
        },
        { from: { $gt: from, $lte: to } },
      ],
    };
    const reservations = await Reservation.find(filter, { _id: 1 }).populate(
      "roomId",
      "roomId"
    );
    const reservedRooms = reservations.map((reservation) => {
      return reservation.roomId.id;
    });
    const rooms = await Room.find({ _id: { $nin: reservedRooms } });
    const count = await Room.count({ _id: { $nin: reservedRooms } });
    return res.json({ count: count, rooms: rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: error.message });
  }
};

module.exports = { createReservation, availableRooms };
