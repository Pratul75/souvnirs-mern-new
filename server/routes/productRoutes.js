const {
  createProduct,
  getProducts,
  getProduct,
  getProductsCount,
  deleteProduct,
  editProduct,
  checkProductsFromIds,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/products/add-product", createProduct);
router.get("/products/get-all-products", getProducts);
router.get("/products/get-single-product/:id", getProduct);
router.get("/products/get-products-count", getProductsCount);
router.delete("/products/delete-product/:id", deleteProduct);
router.put("/products/edit-product/:id", editProduct);
router.post("/products/product-name-based-on-ids", checkProductsFromIds);
module.exports = router;

