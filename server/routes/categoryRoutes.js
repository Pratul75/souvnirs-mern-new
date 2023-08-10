const {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  getParentCategories,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();

authMiddleware,
  router.get("/category/get-all-categories", authMiddleware, getAllCategories);
router.get("/category/get-category/:id", authMiddleware, getCategoryById);
router.post("/category/add-category", authMiddleware, addCategory);
router.put("/category/update-category/:id", authMiddleware, updateCategory);
router.delete("/category/delete-category/:id", authMiddleware, deleteCategory);
router.get("/category/parent/", authMiddleware, getParentCategories);

module.exports = router;
