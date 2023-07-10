const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  conditionTitleId: {
    type: mongoose.Schema.Types.ObjectId("Collection Condition"),
    ref: "Collection Condition",
  },
});

const Collection = mongoose.model("Collection", CollectionSchema);
