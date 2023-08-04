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

const MainMenu = mongoose.model("Main Menu", subMenuSchema);

module.exports = MainMenu;
