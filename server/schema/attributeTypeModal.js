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
    type: String,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "DEACTIVE", "PENDING"],
    default: "PENDING",
  },
  price: { type: Number },
  quantity: { type: Number },
  image: { type: String }

});

const AttributeType = mongoose.model("AttributeType", AttributeTypeSchema);

module.exports = AttributeType;
