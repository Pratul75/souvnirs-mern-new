const AttributeType = require("../schema/attributeTypeModal");
const Product = require("../schema/productModal");
const { roles } = require("../utils");
const { success, error } = require("../utils/errorHandler");

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
      tags,
      attributes,
      attributeValues
    } = req.body;

    let attArr = attributes.map(att => att.name)
    // Create a new product object
    const product = new Product({
      name,
      vendorId,
      slug,
      description,
      price,
      stockQuantity,
      totalSales,
      tags,
      attributes: attArr
    });

    // Save the product to the database
    const savedProduct = await product.save();


    for (let elem of attributeValues) {

      console.log('productController.js', elem);
      await AttributeType.create({ productId: savedProduct._id, attributeIds: attArr, attributeCombination: elem.name, price: elem.price, quantity: elem.quantity })
    }

    res.status(201).json(success("product created successfully"));
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create product" });
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    // Get all products
    let productsList;
    if (req.role === "admin") {
      productsList = await Product.find({}).sort({ createdAt: -1 });

    }
    else if (req.role === "vendor") {
      productsList = await Product.find({ vendorId: req.userId });
    }
    console.log('productController.js', req.userId)

    // Send the productsList to the frontend
    console.log("PRODUCT LIST: ", productsList);
    res.status(200).json(productsList);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to get all products" });
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
    res.status(400).json({ error: "Failed to get the product" });
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
      return res.status(404).json(error("product not found"));
    }

    res.status(200).json(success("product deleted successfully"));
  } catch (error) {
    console.error(error);
    res.status(400).json(error("failed to delete product"));
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
      return res.status(404).json(error("Product not found"));
    }

    res.status(200).json(success("product updated successfully"));
  } catch (error) {
    console.error(error);
    res.status(400).json(error("failed to update product"))
  };
}
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
      .status(400)
      .json({ error: "Failed to get the total number of products" });
  }
};

const checkProductsFromIds = async (req, res) => {
  try {
    const { productIds } = req.body;

    // Find products with matching IDs
    const products = await Product.find({
      _id: { $in: productIds },
    });

    // Extract the names of the found products
    const productNames = products.map((product) => product.name);

    res.status(200).json(productNames);
  } catch (error) {
    console.error("Error occurred while checking products:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductsCount,
  createProduct,
  deleteProduct,
  editProduct,
  checkProductsFromIds,
};
