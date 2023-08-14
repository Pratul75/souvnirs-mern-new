const mongoose = require("mongoose");

const subMenuSchema = new mongoose.Schema(
  {
    mainMenuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Main Menu",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    typeValue: { type: String },
    link: {
      type: String,
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

const SubMenu = mongoose.model("Sub Menu", subMenuSchema);

module.exports = SubMenu;
