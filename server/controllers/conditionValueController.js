const ConditionValue = require("../schema/conditionValueModal");

// Create a new conditionValue
const addConditionValue = async (req, res) => {
  try {
    const conditionValue = new ConditionValue(req.body);
    const savedConditionValue = await conditionValue.save();
    res.status(201).json(savedConditionValue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all conditionValues
const getAllConditionValues = async (req, res) => {
  try {
    const conditionValues = await ConditionValue.find();
    res.json(conditionValues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific conditionValue
const getConditionValueById = async (req, res) => {
  try {
    const conditionValue = await ConditionValue.findById(req.params.id);
    if (!conditionValue) {
      return res.status(404).json({ error: "ConditionValue not found" });
    }
    res.json(conditionValue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a conditionValue
const updateConditionValue = async (req, res) => {
  try {
    const conditionValue = await ConditionValue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!conditionValue) {
      return res.status(404).json({ error: "ConditionValue not found" });
    }
    res.json(conditionValue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a conditionValue
const deleteConditionValue = async (req, res) => {
  try {
    const conditionValue = await ConditionValue.findByIdAndDelete(
      req.params.id
    );
    if (!conditionValue) {
      return res.status(404).json({ error: "ConditionValue not found" });
    }
    res
      .sendStatus(204)
      .json({ message: "Condition Value Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addConditionValue,
  getAllConditionValues,
  getConditionValueById,
  updateConditionValue,
  deleteConditionValue,
};
