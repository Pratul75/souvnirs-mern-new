const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    email: { type: String },
    address: { type: String, },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pin_code: { type: String, required: true },
    notes: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
