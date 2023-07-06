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
const getAllCategories = async (res, res) => {
  try {
    const categoryList = await Category.find({});
    console.log("CATEGORY LIST: ", categoryList);

    res.status(200).json(categoryList);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    res.status(500).json({ error: error.message });
  }
};

// update category
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id.substring(1);
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id.substring(1);
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      res.status(500).json({ message: "No cateogry found" });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
