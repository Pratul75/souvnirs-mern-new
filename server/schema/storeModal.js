const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    vendor_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    organization_name: {
      type: String,
      required: true,
    },
    organization_type: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pin_code: {
      type: String,
      required: true,
    },
    order_type_interested: {
      type: String,
    },
    organization_role: {
      type: String,
    },
    category_type_interest: {
      type: String,
    },
    logo: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "PENDING"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Store", storeSchema);
