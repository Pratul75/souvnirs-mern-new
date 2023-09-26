const mongoose = require("mongoose");

const checkoutItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  product_name: String,
  product_price: Number,
  product_quantity: Number,
  product_image: String,
  // Add other fields as needed
});

const checkoutSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [checkoutItemSchema], // Array of checkout items
});

module.exports = mongoose.model("Checkout", checkoutSchema);
