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
  getProductsByCategorySlug,
  getProductsByCollectionSlug,
  getProductsByFilter,
  getProductBySlug,
  getSearchProducts,
  getProductVariants,
  editProductVariant,
  getVendorProducts,
  alterApproval,
  deleteFakeProducts,
  getProductsAdmin,
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
  upload.single("img"),
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
  // authMiddleware(["vendor", "admin", "customer"]),
  getProducts
);
router.get(
  "/products/admin/get-all-products",
  // authMiddleware(["vendor", "admin", "customer"]),
  getProductsAdmin
);

router.get(
  "/products/get-vendor-products",
  authMiddleware(["vendor"]),
  getVendorProducts
);
router.get(
  "/products/get-search-products",
  // authMiddleware(["vendor", "admin", "customer"]),
  getSearchProducts
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
  upload.single("img"),
  editProduct
);
router.post(
  "/product/variant/:productId",
  upload.any("images"),
  editProductVariant
);
router.post(
  "/products/product-name-based-on-ids",
  authMiddleware(["vendor", "admin", "customer"]),
  checkProductsFromIds
);
router.get("/product/variants/:productId", getProductVariants);

router.get("/product/:slug", getProductBySlug);

router.post("/products/category/:slug", getProductsByCategorySlug);
router.post("/products/collection/:slug", getProductsByCollectionSlug);
router.post("/products", getProductsByFilter);
router.post("/product/approval/:id", alterApproval);
router.post("/products/bulk-upload", upload.single("file"), bulkProductUpload);
router.get("/deleteFake", deleteFakeProducts);
module.exports = router;
