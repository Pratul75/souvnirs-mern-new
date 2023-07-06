const mongoose = require("mongoose");

const AttributeTypeSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  attributeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attribute",
  },
  attributeValue: {
    type: [],
  },
  status: {
    type: String,
    enum: ["ACTIVE", "DEACTIVE", "PENDING"],
    default: "PENDING",
  },
});

const AttributeType = mongoose.model("AttributeType", AttributeTypeSchema);

module.exports = AttributeType;
