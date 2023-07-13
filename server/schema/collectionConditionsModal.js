const mongoose = require("mongoose");

const CollectionConditionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    conditionValues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Condition Value",
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

const CollectionCondition = mongoose.model(
  "Collection Condition",
  CollectionConditionSchema
);

module.exports = CollectionCondition;
