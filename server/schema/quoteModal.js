const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    businessDetails: { type: String },
    ServiceType: { type: String },
    productCategory: { type: String },
    customizationReq: { type: String },

    coupon_code: { type: String },
    discounts: { type: Number },
    total_products: { type: Number },
    quantity: { type: Number },
    tax_id: { type: String },
    price: { type: Number },
    total_price: { type: Number },
    total_paid: { type: Number },
    invoice_id: { type: String },
    payment_method: {
      type: String,
      enum: ["cash_on_delivery", "paynow", "paypal", "stripe", "card"],
    },
    shipped: { type: Boolean },
    billing_status: { type: String },
    billing_id: { type: String },
    payment_status: { type: String },
    delivery_date: { type: Date },
    order_status: {
      type: String,
      enum: [
        "ordered",
        "processing",
        "shipped",
        "delivered",
        "decline",
        "refund",
        "replace",
      ],
    },
    currency: { type: String },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
