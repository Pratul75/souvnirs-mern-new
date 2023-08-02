const {
  createProduct,
  getProducts,
  getProduct,
  getProductsCount,
  deleteProduct,
  editProduct,
  checkProductsFromIds,
  bulkProductUpload,
} = require("../controllers/productController");
const multer = require('multer');
const authMiddleware = require("../middlewares");

const upload = multer({ dest: 'uploads/' });

const router = require("express").Router();

router.post("/products/add-product", authMiddleware, createProduct);
router.get("/products/get-all-products", authMiddleware, getProducts);
router.get("/products/get-single-product/:id", authMiddleware, getProduct);
router.get("/products/get-products-count", authMiddleware, getProductsCount);
router.delete("/products/delete-product/:id", authMiddleware, deleteProduct);
router.put("/products/edit-product/:id", authMiddleware, editProduct);
router.post("/products/product-name-based-on-ids", authMiddleware, checkProductsFromIds);

router.post("/products/bulk-upload", upload.single("file"), bulkProductUpload);
module.exports = router;

