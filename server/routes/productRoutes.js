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
  getAllProducts,
  bulkProductUploadVendor,
  getProductsList,
  getAllMediaList,
  getAllFilterList,
  GetAllPageNumberByCollection,
  getAllItems,
  SearchProducts,
  getAllProductByFilter,
  getProductBudgetRecenltTrending,
  editProductInventory,
  editProductInvantory,
  deleteMedia,
  updateProductstcock,
  getProductListshowAdmin,
  removeProduct,
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

router.put(
  "/stock/update/info/:id",
  authMiddleware(["vendor", "admin"]),
  updateProductstcock
);
router.get(
  "/media",
  authMiddleware(["vendor", "admin", "customer"]),
  upload.array("media"),
  getAllMedia
);

router.get("/get/search/product/list", SearchProducts);

router.get(
  "/media/list",
  authMiddleware(["vendor", "admin", "customer"]),
  upload.array("media"),
  getAllMediaList
);

router.delete(
  "/media/delete/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteMedia
);

router.post(
  "/products/add-product",
  authMiddleware(["vendor", "admin", "customer"]),
  upload.single("img"),
  createProduct
);

router.post(
  "/products/delete/collection",
  authMiddleware(["vendor", "admin", "customer"]),
  removeProduct
);

router.post("/get/all/list/products/:slug", getAllItems);
router.post("/admin/get/all/list/products/:slug", getProductListshowAdmin);

// getProductBudgetRecenltTrending

router.get("/get/all/budget/recelt/product", getProductBudgetRecenltTrending);

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
  "/products/get-all-products/list",
  authMiddleware(["vendor", "admin", "customer"]),
  getProductsList
);
router.get(
  "/get/products",
  authMiddleware(["vendor", "admin"]),
  getAllProducts
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

router.put(
  "/products/edit/inventory/:id",
  authMiddleware(["vendor", "admin"]),
  editProductInventory
);

router.put(
  "/admin/products/edit/inventory/:id",
  authMiddleware(["vendor", "admin"]),
  editProductInvantory
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
router.post("/products/category/list/:slug", getAllProductByFilter);

router.post("/products/collection/:slug", getProductsByCollectionSlug);
// GetAllProductList;
router.post("/get/filters/collection/:slug", getAllFilterList);
router.post("/get/products/collection/:slug", GetAllPageNumberByCollection);
router.post("/products", getProductsByFilter);
router.post("/product/approval/:id", alterApproval);
router.post("/products/bulk-upload", upload.single("file"), bulkProductUpload);
router.post(
  "/vendor/products/bulk-upload",
  authMiddleware(["vendor"]),
  upload.single("file"),
  bulkProductUploadVendor
);
router.get("/deleteFake", deleteFakeProducts);
module.exports = router;
