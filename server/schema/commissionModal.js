const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  commissionType: {
    type: String,
    enum: ["PERCENTAGE", "NUMBER"],
    default: "PERCENTAGE",
  },
  commissionTypeValue: {
    type: Number,
    required: true,
  },
});

const Commission = mongoose.model("Commission", commissionSchema);

module.exports = Commission;
