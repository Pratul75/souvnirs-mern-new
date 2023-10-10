const mongoose = require("mongoose");

const ReViewsSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "cutomer",
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("review", ReViewsSchema);

module.exports = Reviews;
