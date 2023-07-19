const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    collectionConditionId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection Condition",
      },
    ],
    conditionValue: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Condition Value",
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    activeProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    deactiveProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const Collection = mongoose.model("Collection", CollectionSchema);

module.exports = Collection;
