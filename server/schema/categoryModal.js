const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    parentId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    hsn_code: {
      type: String,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
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
