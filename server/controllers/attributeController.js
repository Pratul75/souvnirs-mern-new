const Attribute = require("../schema/attributeModal");

// Create a new attribute
const addAttribute = async (req, res) => {
  try {
    const attribute = new Attribute(req.body);
    await attribute.save();
    res.status(201).json(attribute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all attributes
const getAllAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find();
    res.json(attributes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single attribute by ID
const getAttributeById = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id.substring(1));
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    res.json(attribute);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an attribute by ID
const updateAttributeById = async (req, res) => {
  try {
    const attribute = await Attribute.findByIdAndUpdate(
      req.params.id.substring(1),
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    res.json(attribute);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an attribute by ID
const deleteAttributeById = async (req, res) => {
  try {
    const attribute = await Attribute.findByIdAndDelete(
      req.params.id.substring(1)
    );
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    res.json({ message: "Attribute deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addAttribute,
  getAllAttributes,
  getAttributeById,
  updateAttributeById,
  deleteAttributeById,
};
