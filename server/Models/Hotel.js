const mongoose = require("mongoose");
const User = require("./User");

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    images: { type: Array, required: true, min: 4, max: 8 },
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
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: User },
  },
  {
    timestamps: true,
  }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
