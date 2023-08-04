const AttributeType = require("../schema/attributeTypeModal");
const Product = require("../schema/productModal");
const { roles } = require("../utils");
const { success, error } = require("../utils/errorHandler");
const xlsx = require("xlsx")
const { v4: uuidv4 } = require('uuid');
const Vendor = require("../schema/vendorModal");
const Attribute = require("../schema/attributeModal");
const Category = require("../schema/categoryModal");

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
      productsList = await Product.aggregate([
        {
          '$lookup': {
            'from': 'attributetypes',
            'localField': '_id',
            'foreignField': 'productId',
            'as': 'result'
          }
        }, {
          '$unwind': {
            'path': '$result'
          }
        }, {
          '$sort': {
            '_id': -1
          }
        }
      ]);

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
const bulkProductUpload = async (req, res) => {
  try {


    const filePath = req.file.path;

    // Read the Excel file using xlsx library
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    console.log(jsonData);
    const groupedData = jsonData.reduce((acc, item) => {
      const { Id, Title, Description, FeatureImage, Category, VendorEmail, tags, Color, Size, Quantity, Set, Style, Material, Pattern, Fabric, Type, Flavour, ...rest } = item;

      const variantData = {
        Color,
        Size,
        Quantity,
        Set,
        Style,
        Material,
        Pattern,
        Fabric,
        Type,
        Flavour,
      };

      const combinedData = { ...rest, variant: variantData };

      if (!acc[Id]) {
        acc[Id] = {
          Id,
          Title,
          Description,
          FeatureImage,
          VendorEmail,
          tags,
          Category,
          attributes: [{ Color }, { Size }, { Quantity }, { Set }, { Style }, { Material }, { Pattern }, { Fabric }, { Type }, { Flavour }],
          data: [combinedData],
        };
      } else {
        acc[Id].data.push(combinedData);
      }

      return acc;
    }, {});



    for (let id in groupedData) {
      let thisdata = groupedData[id]
      let slug = uuidv4(10)
      slug = slug.slice(0, 8)
      const vendor = await Vendor.findOne({ email: thisdata.VendorEmail })
      let attributes = thisdata.attributes.flatMap(obj => Object.keys(obj).filter(key => obj[key] !== undefined));
      let attributeIds = []
      for (let attribute of attributes) {

        let att = await Attribute.findOne({ name: attribute })
        attributeIds.push(att._id)
      }
      const category = await Category.findOne({ name: thisdata.Category })

      const productCreated = await Product.create({ description: thisdata.Description, name: thisdata.Title, slug, vendorId: vendor._id, tags: thisdata.tags.split("/"), attributes: attributeIds, categoryId: category._id })
      console.log(productCreated);
      for (let variant of thisdata.data) {
        console.log('productController.js', variant);
        let variants = Object.entries(variant.variant)
          .filter(([key, value]) => value !== undefined)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        console.log(variants);
        const { ProductQuantity } = variant
        const created = await AttributeType.create({ productId: productCreated._id, attributeIds, variant: variants, quantity: ProductQuantity, price: variant.Price, images: variant.VariantsImages.split("/") })
        console.log('productController.js',);
      }
    }
    console.log('productController.js', workbook);
    res.status(200).json("bulk upload successfull")
  } catch (e) {
    console.log('productController.js', e);
  }
}

module.exports = {
  getProducts,
  getProduct,
  getProductsCount,
  createProduct,
  deleteProduct,
  bulkProductUpload,
  editProduct,
  checkProductsFromIds,
};
