const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
