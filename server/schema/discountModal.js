const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  typeTitle: {
    type: String,
    enum: ["percentage", "fixed_value"],
    default: "percentage",
    required: true,
  },
  typeValue: {
    type: String,
    // required: true,
  },
  requirementTitle: {
    type: String,
    enum: [
      "no_minimum_requirement",
      "minimum_purchase_amount",
      "minimum_quantity_of_items",
    ],
    default: "no_minimum",
    required: true,
  },
  requirementValue: {
    type: String,
  },
  eligiblityTitle: {
    type: String,
    enum: ["all_customer", "specific_customer_segment", "specific_customer"],
    default: "all_customer",
  },
  eligiblityValue: [
    {
      type: String,
      required: true,
    },
  ],
  totalLimit: {
    type: String,
    required: true,
  },
  activeDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  activeTime: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
      },
      message: "Invalid time format. Time should be in HH:MM format",
    },
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endTime: {
    type: String,
    // required: true,
    // validate: {
    //   validator: function (value) {
    //     return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
    //   },
    //   message: "Invalid time format. Time should be in HH:MM format",
    // },
  },

  collectionId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  categoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  status: {
    type: String,
    enum: ["ACTIVE", "DEACTIVE", "PENDING"],
    default: "ACTIVE",
  },
});

const DiscountModal = mongoose.model("Discount", DiscountSchema);
module.exports = DiscountModal;
