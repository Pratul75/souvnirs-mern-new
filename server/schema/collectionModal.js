const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema(
  {
    collectionConditionId: [
      {
        // need to be chaned to collection condition objectId
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Collection Condition",
        type: String,
        required: true,
      },
    ],
    conditionValue: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Condition Value",
      },
    ],
    inputValue: [
      {
        type: String,
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
