const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/productController");

const router = require("express").Router();

router.get("/", async (req, res) => {
  return res.send("Hello");
});
// add a product
router.post("/products/add-product", createProduct);
// get all products
router.get("/products/get-all-products", getProducts);
// get single product based on id
router.get("/products/get-single-product/:id", getProduct);
// delete a product based on id
router.delete("/products/delete-product/:id", deleteProduct);
// edit a product based on id
router.put("/products/edit-product/:id", editProduct);

module.exports = router;
