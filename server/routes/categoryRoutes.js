const {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  getParentCategories,
  UpdateStatus,
  getAllCategorieslist,
  bulkCategoryUpload,
  getCategoryByProduct,
  getCategoryDetails,
  deleteProductFromCategory,
} = require("../controllers/categoryController");
const authMiddleware = require("../middlewares");
const { upload } = require("../middlewares/ImageUpload");

const router = require("express").Router();

router.post("/category/bulk-upload", upload.single("file"), bulkCategoryUpload);

router.get(
  "/category/get-all-categories",
  // authMiddleware(["vendor", "admin", "customer"]),
  getAllCategories
);

router.get(
  "/category/get-all-categories/list",
  // authMiddleware(["vendor", "admin", "customer"]),
  getAllCategorieslist
);

router.get(
  "/category/get-category/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCategoryById
);
router.put(
  "/delete/product/category",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteProductFromCategory
);

router.get(
  "/category/details/products/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCategoryDetails
);

router.get(
  "/product/by/category/details",
  authMiddleware(["vendor", "admin", "customer"]),
  getCategoryByProduct
);
router.post("/category/add-category", authMiddleware(["admin"]), addCategory);
router.put(
  "/category/update-category/:id",
  authMiddleware(["admin"]),
  updateCategory
);
router.put(
  "/update/status/category/:id",
  authMiddleware(["admin"]),
  UpdateStatus
);
router.delete(
  "/category/delete-category/:id",
  authMiddleware(["admin"]),
  deleteCategory
);
router.get("/category/parent/", authMiddleware(["admin"]), getParentCategories);

module.exports = router;
