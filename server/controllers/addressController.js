const express = require("express");
const router = express.Router();
const Address = require("../schema/addressModal");

// Create a new address
const addAddress = async (req, res) => {
  try {
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ error: "Failed to create address" });
  }
};

// Get all addresses
const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve addresses" });
  }
};

// Get a single address by ID
const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id.substring(1));
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve address" });
  }
};

// Update an address by ID
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(
      req.params.id.substring(1),
      req.body,
      {
        new: true,
      }
    );
    if (address) {
      res.json(address);
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update address" });
  }
};

// Delete an address by ID
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id.substring(1));
    if (address) {
      res.json({ message: "Address deleted successfully" });
    } else {
      res.status(404).json({ error: "Address not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to delete address" });
  }
};

module.exports = {
  addAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
};
