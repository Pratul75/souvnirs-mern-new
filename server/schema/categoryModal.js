const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    parentId: {
      type: String,
      required: true,
      default: "0",
    },
    name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    commissionType: {
      type: String,
      enum: ["PERCENTAGE", "NUMBER"],
      default: "PERCENTAGE",
    },
    commissionTypeValue: {
      type: Number,
      // required: true,
    },
    hsn_code: {
      type: String,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DEACTIVE", "PENDING"],
      default: "PENDING",
    },
    attributes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attribute",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
