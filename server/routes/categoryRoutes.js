const {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} = require("../controllers/categoryController");

const router = require("express").Router();

router.get("/category/get-all-categories", getAllCategories);
router.get("/category/get-category/:id", getCategoryById);
router.post("/category/add-category", addCategory);
router.put("/category/update-category/:id", updateCategory);
router.delete("/category/delete-category/:id", deleteCategory);

module.exports = router;
