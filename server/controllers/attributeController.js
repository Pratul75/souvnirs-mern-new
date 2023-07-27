const { default: mongoose } = require("mongoose");
const Attribute = require("../schema/attributeModal");
const Category = require("../schema/categoryModal");

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

// Get all atatributes
const getAllAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find().sort({ createdAt: -1 });
    res.json(attributes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getattributesbyCategoryId = async (req, res) => {
  try {
    const { id } = req.params
    const attributes = await Category.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'attributes',
          'localField': 'attributes',
          'foreignField': '_id',
          'as': 'result'
        }
      }, {
        '$project': {
          'result': 1
        }
      }
    ])
    const data = attributes[0].result
    console.log('attributeController.js', attributes[0].result);
    res.status(200).json(data)
  } catch (err) {
    res.status(400).json("somwthing went wrong")
  }
}

// Get a single attribute by ID
const getAttributeById = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id.substring(1));
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    res.json(attribute);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  addAttribute,
  getAllAttributes,
  getAttributeById,
  updateAttributeById,
  deleteAttributeById,
  getattributesbyCategoryId
};
