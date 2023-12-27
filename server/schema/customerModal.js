const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    organizationName: {
      type: String,
    },
    organizationType: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    orderTypeInterested: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpStatus: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
