const Category = require("../schema/categoryModal");

// add new category
const addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categoryList = await Category.find().sort({ createdAt: -1 });
    console.log("CATEGORY LIST: ", categoryList);

    res.status(200).json(categoryList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get category by id
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id.substring(1);
    const category = await Category.findById(categoryId);
    console.log("SELECTED CATEGORY: ", category);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update category
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id.substring(1);
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { attributes } = req.body;
    const existingAttributeIds = existingCategory.attributes.map((attr) =>
      attr.toString()
    );
    const { name, hsn_code, status, type } = req.body;

    // Check if each attribute ID is already present in the attributes array
    // const duplicateAttributeIds = attributes.filter((attrId) =>
    //   existingAttributeIds.includes(attrId)
    // );

    // if (duplicateAttributeIds.length > 0) {
    //   return res.status(400).json({
    //     message: "Duplicate attribute IDs found",
    //     duplicateAttributeIds,
    //   });
    // }

    // Remove duplicates in the attributes array before updating
    const uniqueAttributes = attributes.filter(
      (attrId, index) => attributes.indexOf(attrId) === index
    );

    (existingCategory.name = name ?? existingCategory.name),
      (existingCategory.hsn_code = hsn_code ?? existingCategory.hsn_code),
      (existingCategory.type = type ?? existingCategory.type),
      (existingCategory.attributes =
        existingCategory.attributes.concat(uniqueAttributes));
    const updatedCategory = await existingCategory.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log("categoryController.js", error);
    res.status(400).json({ error: error.message });
  }
};

// Remove an attribute ID from a category
// can create specific api in future if required
const removeAttributeFromCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId.substring(1);
    const attributeId = req.params.attributeId.substring(1);

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the index of the attribute ID in the attributes array
    const attributeIndex = category.attributes.indexOf(attributeId);
    if (attributeIndex === -1) {
      return res
        .status(404)
        .json({ message: "Attribute ID not found in the category" });
    }

    // Remove the attribute ID from the attributes array
    category.attributes.splice(attributeIndex, 1);

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id.substring(1);
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      res.status(400).json({ message: "No cateogry found" });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  removeAttributeFromCategory,
};
