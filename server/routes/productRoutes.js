const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.post("/products/add-product", createProduct);
router.get("/products/get-all-products", getProducts);
router.get("/products/get-single-product/:id", getProduct);
router.delete("/products/delete-product/:id", deleteProduct);
router.put("/products/edit-product/:id", editProduct);

module.exports = router;
