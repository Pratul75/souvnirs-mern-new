const mongoose = require("mongoose");

const AttributeTypeSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
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
  price: { type: Number },
  mrp: {
    type: Number,
  },
  quantity: { type: Number },
  images: [{ type: String }],
  variantRequiresShipping: {
    type: Boolean,
  },
  dynamic_price: [
    {
      price: Number,
      currency: String,
      minQuantity: Number,
    },
  ],
  currency: { type: String },
  trackInventory: { type: Boolean },
  weight: { type: Number },
  published: { type: Boolean },
});

const AttributeType = mongoose.model("AttributeType", AttributeTypeSchema);

module.exports = AttributeType;
