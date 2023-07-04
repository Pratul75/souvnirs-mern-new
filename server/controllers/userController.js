// controllers/userController.js

const User = require("../models/userModel");

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
}

module.exports = { createUser };
