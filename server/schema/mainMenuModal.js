const mongoose = require("mongoose");

const mainMenuSchema = new mongoose.Schema(
  {
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      // required: true,
    },
    link: {
      type: String,
      // required: true,
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

const MainMenu = mongoose.model("Main Menu", mainMenuSchema);

module.exports = MainMenu;
