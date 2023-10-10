const mongoose = require("mongoose");

const InquirieSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    inquery: [Object],
  },
  { timestamps: true }
);

const Media = mongoose.model("inquirie", InquirieSchema);
module.exports = Media;
