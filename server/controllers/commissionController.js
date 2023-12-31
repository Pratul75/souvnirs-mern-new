const Category = require("../schema/categoryModal");
const Commission = require("../schema/commissionModal"); // Import your Commission model

// Create a new commission
const createCommission = async (req, res) => {
  try {
    const commission = new Commission(req.body);
    const { categoryId, commissionType, commissionTypeValue } = req.body;
    await Category.findByIdAndUpdate(categoryId, {
      commissionType,
      commissionTypeValue,
    });
    res.status(201).json(commission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all commissions
const getAllCommissions = async (req, res) => {
  try {
    const commissions = await Category.find({
      commissionTypeValue: { $exists: true },
    });
    res.json(commissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read a single commission by ID
const getCommissionById = async (req, res) => {
  try {
    const commission = await Commission.findById(req.params.id);
    if (!commission) {
      return res.status(404).json({ error: "Commission not found" });
    }
    res.json(commission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a commission by ID
const updateCommissionById = async (req, res) => {
  try {
    const commission = await Commission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!commission) {
      return res.status(404).json({ error: "Commission not found" });
    }
    res.json(commission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a commission by ID
const deleteCommissionById = async (req, res) => {
  try {
    const commission = await Commission.findByIdAndRemove(req.params.id);
    if (!commission) {
      return res.status(404).json({ error: "Commission not found" });
    }
    res.status(200).json({ message: "Commission deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCommission,
  getAllCommissions,
  getCommissionById,
  updateCommissionById,
  deleteCommissionById,
};
