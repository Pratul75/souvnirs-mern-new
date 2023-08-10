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

authMiddleware(["vendor", "admin", "customer"]);
router.get(
  "/category/get-all-categories",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCategories
);
router.get(
  "/category/get-category/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCategoryById
);
router.post("/category/add-category", authMiddleware(["admin"]), addCategory);
router.put(
  "/category/update-category/:id",
  authMiddleware(["admin"]),
  updateCategory
);
router.delete(
  "/category/delete-category/:id",
  authMiddleware(["admin"]),
  deleteCategory
);
router.get("/category/parent/", authMiddleware(["admin"]), getParentCategories);

module.exports = router;
