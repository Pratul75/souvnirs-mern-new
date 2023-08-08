const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
    links: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
