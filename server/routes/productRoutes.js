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
  addMedias,
  getAllMedia,
} = require("../controllers/productController");
const authMiddleware = require("../middlewares");
const { upload } = require("../middlewares/ImageUpload");

const router = require("express").Router();

router.post(
  "/media",
  authMiddleware(["vendor", "admin", "customer"]),
  upload.array("media"),
  addMedias
);
router.get(
  "/media",
  authMiddleware(["vendor", "admin", "customer"]),
  upload.array("media"),
  getAllMedia
);
router.post(
  "/products/add-product",
  authMiddleware(["vendor", "admin", "customer"]),
  upload.any("img"),
  createProduct
);
router.post(
  "/products/create-variant",
  authMiddleware(["vendor", "admin", "customer"]),
  upload.any("images"),
  createProductVariant
);
router.get(
  "/products/get-all-products",
  authMiddleware(["vendor", "admin", "customer"]),
  getProducts
);
router.get(
  "/products/get-single-product/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getProduct
);
router.get(
  "/products/get-products-count",
  authMiddleware([["vendor", "admin", "customer"]]),
  getProductsCount
);
router.delete(
  "/products/delete-product/:id",
  authMiddleware(["vendor", "admin"]),
  deleteProduct
);
router.put(
  "/products/edit-product/:id",
  authMiddleware(["vendor", "admin"]),
  editProduct
);
router.post(
  "/products/product-name-based-on-ids",
  authMiddleware(["vendor", "admin", "customer"]),
  checkProductsFromIds
);

router.post("/products/bulk-upload", upload.single("file"), bulkProductUpload);
module.exports = router;
