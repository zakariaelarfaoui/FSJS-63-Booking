const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true, min: 3 },
    lastName: { type: String, required: true, min: 3 },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["admin", "owner", "client"],
      default: "client",
    },
    active: { type: Boolean, default: false },
    password: { type: String, required: true, min: 8 },
    refreshToken: { type: String, default: null },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
const User = mongoose.model("user", userSchema);
module.exports = User;
