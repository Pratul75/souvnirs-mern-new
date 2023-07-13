const mongoose = require("mongoose");

const ConditionValueSchema = new mongoose.Schema({
  conditionValue: {
    type: String,
    required: true,
  },
});

const ConditionValue = mongoose.model("Condition Value", ConditionValueSchema);

module.exports = ConditionValue;
