const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "PENDING",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Attribute = mongoose.model("Attribute", AttributeSchema);
module.exports = Attribute;
