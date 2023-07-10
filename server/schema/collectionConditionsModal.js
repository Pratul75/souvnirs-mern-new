const mongoose = require("mongoose");

const CollectionConditionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    parentId: [
      {
        type: String,
        required: true,
      },
    ],
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

const CollectionCondition = mongoose.model(
  "Collection Condition",
  CollectionConditionSchema
);

module.exports = CollectionCondition;
