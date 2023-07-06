const mongoose = require("mongoose");

const AttributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Attribute = mongoose.model("Attribute", AttributeSchema);
module.exports = Attribute;
