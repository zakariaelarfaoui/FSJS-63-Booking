const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const roomSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  type: { type: String, required: true },
  numberOfPerson: { type: Number, required: true },
  prix: { type: String, required: true },
});

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, minLength: "50" },
    type: { type: String, required: true },
    rating: {
      type: String,
      required: true,
      enum: ["Tourist", "Standard", "Comfort", "First Class", "Luxury"],
    },
    address: [
      {
        type: addressSchema,
        required: true,
      },
    ],
    rooms: [
      {
        type: roomSchema,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
