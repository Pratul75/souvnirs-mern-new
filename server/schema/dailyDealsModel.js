const mongoose = require("mongoose");

const DailyDealSchema = new mongoose.Schema(
  {
    categoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    productId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    collectionId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    requirementTitle: { type: String },
    requirementValue: { type: String },
    title: { type: String },
    totalLimit: { type: String },
    typeTitle: { type: String },
    typeValue: { type: String },
    combinations: { type: String },
    status: { type: String, default: "ACTIVE" },
    eligibilityTitle: { type: String },
    eligibilityValue: { type: String },
    endDate: { type: String },
    endTime: { type: String },
    activeDate: { type: String },
    activeTime: { type: String },
    total_time: { type: String },
  },
  {
    timestamps: true,
  }
);

const DailyDeals = mongoose.model("dailydeal", DailyDealSchema);
module.exports = DailyDeals;
