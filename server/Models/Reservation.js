const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: { type: String, required: true },
  modeOfReservation: { type: String, required: true },
  dateOfConfirmation: { type: Date, default: null },
  status: {
    type: String,
    required: true,
    default: "Pending",
    enum: ["Confirmed", "Pending", "Cancelled"],
  },
  payment: {
    status: {
      type: String,
      enum: ["Not Paid", "Partial Payment", "Paid"],
      default: "Not Paid",
    },
    type: { type: String, enum: ["credit card", "Cash", null], default: null },
  },
});

const Reservation = mongoose.model("reservation", reservationSchema);
module.exports = Reservation;
