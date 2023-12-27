const mongoose = require("mongoose");

const AttributeTypeSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    // index: true,
  },
  attributeIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attribute",
    },
  ],
  variant: {
    type: mongoose.Schema.Types.Mixed,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "DEACTIVE", "PENDING"],
    default: "PENDING",
  },
  mrp: {
    type: Number,
  },
  QTY: {
    type: Number,
  },
  quantity: { type: Number },
  images: [{ type: String }],
  variantRequiresShipping: {
    type: Boolean,
  },
  price: { type: Number },
  uniqueKey: { type: String },
  dynamic_price: [
    {
      type: mongoose.Schema.Types.Mixed,
    },
  ],
  currency: { type: String },
  trackInventory: { type: Boolean },
  weight: { type: Number },
  published: { type: Boolean },
});

const AttributeType = mongoose.model("AttributeType", AttributeTypeSchema);

module.exports = AttributeType;
