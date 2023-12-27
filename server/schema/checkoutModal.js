const mongoose = require("mongoose");

const checkoutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    product_name: String,
    product_price: Number,
    product_quantity: Number,
    product_image: String,
    coupon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    dailydeal_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dailydeal",
    },
    // Add other fields as needed
  },
  {
    timestamps: true,
  }
);

const checkoutSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [checkoutItemSchema], // Array of checkout items
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Checkout", checkoutSchema);
