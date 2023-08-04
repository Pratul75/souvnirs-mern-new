const mongoose = require("mongoose");

const subMenuChild = new mongoose.Schema(
  {
    subMenuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sub Menu",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
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

const SubMenuChild = mongoose.model("Main Menu", subMenuChild);

module.exports = SubMenuChild;
