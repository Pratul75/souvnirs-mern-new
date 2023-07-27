const AttributeType = require("../schema/attributeTypeModal");
// Create a new product-to-attribute mapping

const addAttributeType = async (req, res) => {
  try {
    const { productId, attributeId, attributeValue } = req.body;

    const productToAttribute = new AttributeType({
      productId,
      attributeId,
      attributeValue,
    });

    await productToAttribute.save();
    res.status(201).json(productToAttribute);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all product-to-attribute mappings
const getAllAttributeTypes = async (req, res) => {
  try {
    const attributeTypes = await AttributeType.find()
      .populate("productId")
      .populate("attributeId");
    res.json(attributeTypes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single product-to-attribute mapping by ID
const getAttributeTypeById = async (req, res) => {
  try {
    const attributeType = await AttributeType.findById(req.params.id)
      .populate("productId")
      .populate("attributeId");
    if (!attributeType) {
      return res
        .status(404)
        .json({ message: "Product-to-attribute mapping not found" });
    }
    res.json(attributeType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product-to-attribute mapping by ID
const updateAttributeType = async (req, res) => {
  try {
    const { productId, attributeId, attributeValue } = req.body;

    const attributeType = await AttributeType.findByIdAndUpdate(
      req.params.id,
      { productId, attributeId, attributeValue },
      { new: true }
    )
      .populate("productId")
      .populate("attributeId");

    if (!attributeType) {
      return res
        .status(404)
        .json({ message: "Product-to-attribute mapping not found" });
    }

    res.json(attributeType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product-to-attribute mapping by ID
const deleteAttributeType = async (req, res) => {
  try {
    const productToAttribute = await AttributeType.findByIdAndDelete(
      req.params.id
    );
    if (!productToAttribute) {
      return res
        .status(404)
        .json({ message: "Product-to-attribute mapping not found" });
    }
    res.json({ message: "Product-to-attribute mapping deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addAttributeType,
  deleteAttributeType,
  getAllAttributeTypes,
  getAttributeTypeById,
  updateAttributeType,
};
