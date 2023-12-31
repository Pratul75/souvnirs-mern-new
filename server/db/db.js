const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("CONNECTED TO DB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

module.exports = { connect };
