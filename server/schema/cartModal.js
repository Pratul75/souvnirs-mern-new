const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    variant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AttributeType",
      required: true,
    },
    product_name: {
      type: String,
      // required: true,
    },
    product_price: {
      type: Number,
      // required: true,
    },
    product_quantity: {
      type: Number,
      required: true,
    },
    product_image: {
      type: String,
    },
    product_attributes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "PENDING",
    },
    checkedOut: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
