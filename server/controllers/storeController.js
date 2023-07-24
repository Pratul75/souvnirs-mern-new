const Store = require("../schema/storeModal");

// Create a new store
const createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(200).json({ store });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create store" });
  }
};

// Get all stores
const getStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json({ stores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get stores" });
  }
};

// Get a single store by ID
const getStoreById = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findById(id);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json({ store });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get store" });
  }
};

// Update a store by ID
const updateStoreById = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json({ store });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update store" });
  }
};

// Delete a store by ID
const deleteStoreById = async (req, res) => {
  const { id } = req.params;
  try {
    const store = await Store.findByIdAndRemove(id);
    if (!store) {
      return res.status(404).json({ error: "Store not found" });
    }
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete store" });
  }
};

module.exports = {
  createStore,
  getStores,
  getStoreById,
  updateStoreById,
  deleteStoreById,
};
