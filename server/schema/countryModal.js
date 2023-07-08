const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
    },
    countryCode: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Country = mongoose.model("Country", CountrySchema);

module.exports = Country;
