const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  productImages: [],
  status: {
    type: String,
    enum: ["ACTIVE", "DEACTIVE", "PENDING"],
    default: "PENDING",
  },
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema)
module.exports = Wishlist
