const {
  createProduct,
  getProducts,
  getProduct,
  getProductsCount,
  deleteProduct,
  editProduct,
  checkProductsFromIds,
  bulkProductUpload,
  createProductVariant,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares");
const { upload } = require("../middlewares/ImageUpload");

const router = require("express").Router();

router.post(
  "/products/add-product",
  authMiddleware,
  upload.any("img"),
  createProduct
);
router.post(
  "/products/create-variant",
  authMiddleware,
  upload.any("images"),
  createProductVariant
);
router.get("/products/get-all-products", authMiddleware, getProducts);
router.get("/products/get-single-product/:id", authMiddleware, getProduct);
router.get("/products/get-products-count", authMiddleware, getProductsCount);
router.delete("/products/delete-product/:id", authMiddleware, deleteProduct);
router.put("/products/edit-product/:id", authMiddleware, editProduct);
router.post(
  "/products/product-name-based-on-ids",
  authMiddleware,
  checkProductsFromIds
);

router.post("/products/bulk-upload", upload.single("file"), bulkProductUpload);
module.exports = router;
