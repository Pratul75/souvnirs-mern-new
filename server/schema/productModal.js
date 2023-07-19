const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    creatorId: {
      type: String,
      // temperorly disabled until its figured out from where to get creatorId
      required: false,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    tags: {
      type: [String],
    },
    sku: {
      type: String,
    },
    downloadableFile: {
      type: Boolean,
    },
    price: {
      type: Number,
      required: true,
    },
    compareAtPrice: {
      type: Number,
    },
    onSale: {
      type: Boolean,
      default: true,
    },

    stockQuantity: {
      type: Number,
    },
    stockStatus: {
      type: String,
      enum: ["IN_STOCK", "OUT_OF_STOCK", "BACK_ORDER"],
      default: "IN_STOCK",
    },
    reviewId: {
      type: String,
    },
    totalSales: {
      type: Number,
    },
    viewCount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "PENDING",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
