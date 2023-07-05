const Product = require("../schema/productModal");

// create new product
const createProduct = async (req, res) => {
  try {
    // Extract the product details from the request body
    const {
      name,
      vendorId,
      slug,
      description,
      price,
      stockQuantity,
      totalSales,
    } = req.body;

    // Create a new product object
    const product = new Product({
      name,
      vendorId,
      slug,
      description,
      price,
      stockQuantity,
      totalSales,
    });

    // Save the product to the database
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    // Get all products
    const productsList = await Product.find({});
    console.log("PRODUCT LIST: ", productsList);

    // Send the productsList to the frontend
    res.status(200).json(productsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get all products" });
  }
};
// get product based on the id
const getProduct = async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const productId = req.params.id;
    const newProductId = productId.substring(1);

    console.log("PRODUCT ID: ", newProductId);

    const product = await Product.findById(newProductId);

    console.log("PRODUCT SELECTED: ", product);
    // Check if the product exists
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Product found, send it to the frontend
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get the product" });
  }
};
// delete product based on id
const deleteProduct = async (req, res) => {
  const productId = req.params.id.substring(1);
  console.log("PRODUCT ID: ", productId);

  try {
    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      // If the product is not found, return an error
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the product" });
  }
};
// edit product
const editProduct = async (req, res) => {
  const productId = req.params.id.substring(1);
  const updatedProductData = req.body;

  try {
    // Find the product by ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      // If the product is not found, return an error
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update the product" });
  }
};

// get total products
const getProductsCount = async (req, res) => {
  try {
    // Get the total number of products
    const productsCount = await Product.countDocuments({});
    console.log("PRODUCT COUNT: ", productsCount);

    // Send the productsCount to the frontend
    res.status(200).json({ count: productsCount });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to get the total number of products" });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductsCount,
  createProduct,
  deleteProduct,
  editProduct,
};