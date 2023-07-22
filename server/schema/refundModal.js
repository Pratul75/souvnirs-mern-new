const mongoose = require("mongoose");

const RefundSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    refundDetails: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const Refund = mongoose.model("Refund", RefundSchema);

module.exports = Refund;
