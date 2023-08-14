const AttributeType = require("../schema/attributeTypeModal");
const Product = require("../schema/productModal");
const { roles } = require("../utils");
const { success, error } = require("../utils/errorHandler");
const xlsx = require("xlsx");
const { v4: uuidv4 } = require("uuid");
const Vendor = require("../schema/vendorModal");
const Attribute = require("../schema/attributeModal");
const Category = require("../schema/categoryModal");
const { v2 } = require("../middlewares/ImageUpload");
const Media = require("../schema/mediaModal");
const mongoose = require("mongoose");

// create new product
const addMedias = async (req, res) => {
  let urls = [];
  for (let file of req.files) {
    const uploaded = await v2.uploader.upload(file.path);
    urls.push(uploaded.url);
    console.log("productController.js", uploaded);
  }
  if (req.role === "admin") {
    const media = await Media.findOneAndUpdate(
      { vendorId: req.userId },
      { $addToSet: { links: urls } },
      { upsert: true, new: true }
    );
  }
  const media = await Media.findOneAndUpdate(
    { vendorId: req.userId },
    { $addToSet: { links: urls } },
    { upsert: true, new: true }
  );

  res.status(200).json(urls.length);
};
const getAllMedia = async (req, res) => {
  let medias;
  if (req.role === "admin") {
    medias = await Media.aggregate([
      {
        $lookup: {
          from: "vendors",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendorId",
        },
      },
      {
        $unwind: {
          path: "$vendorId",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$links",
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
  }
  if (req.role === "vendor") {
    medias = await Media.findOne({ vendorId: req.userId });
  }
  res.status(200).json(medias);
};
const createProduct = async (req, res) => {
  try {
    // Extract the product details from the request body
    const {
      name,
      vendorId,
      slug,
      description,
      price,
      quantity,
      totalSales,
      tags,
      attributes,
      categoryId,
    } = req.body;
    // if (!name || !vendorId || !slug || !description || !price) {

    // }
    let imageUrl;
    let parseAtt = JSON.parse(attributes);
    try {
      imageUrl = await v2.uploader.upload(req.files[0].path, {
        timeout: 60000, // Set a longer timeout value if needed
        folder: "product_images",
      });
      // Rest of the code
    } catch (error) {
      res.status(400).json({ error: "Failed to create product" });
      // Handle the error, send an appropriate response to the client
    }

    let attArr;
    if (parseAtt.length > 0) {
      attArr = parseAtt.map((att) => att._id);
    }
    // Create a new product object
    const product = new Product({
      name,
      vendorId,
      slug,
      description,
      price,
      stockQuantity: quantity,
      totalSales,
      tags,
      attributes: attArr,
      coverImage: imageUrl.url,
      categoryId,
    });

    // Save the product to the database
    const savedProduct = await product.save();

    // for (let elem of attributeValues) {

    //   console.log('productController.js', elem);
    //   await AttributeType.create({ productId: savedProduct._id, attributeIds: attArr, attributeCombination: elem.name, price: elem.price, quantity: elem.quantity })
    // }

    res.status(201).json(success(product));
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create product" });
  }
};

const getProductsByCategorySlug = async (req, res) => {
  const { slug } = req.params;
  console.log("productController.js", slug);

  const products = await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
      },
    },
    {
      $match: {
        "category.name": "apparels",
      },
    },
    {
      $lookup: {
        from: "attributetypes",
        localField: "_id",
        foreignField: "productId",
        as: "variants",
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  // Gather unique attributes and their values
  const uniqueAttributes = {};

  products.forEach((product) => {
    product.variants.forEach((variant) => {
      Object.entries(variant).forEach(([attribute, value]) => {
        if (attribute !== "productId") {
          if (!uniqueAttributes[attribute]) {
            uniqueAttributes[attribute] = new Set();
          }

          if (Array.isArray(value)) {
            value.forEach((subValue) =>
              uniqueAttributes[attribute].add(subValue)
            );
          } else {
            uniqueAttributes[attribute].add(value);
          }
        }
      });
    });
  });

  // Convert uniqueAttributes into arrays
  Object.keys(uniqueAttributes).forEach((attribute) => {
    uniqueAttributes[attribute] = Array.from(uniqueAttributes[attribute]);
  });
  const variantComb = uniqueAttributes.variant.reduce((attributes, item) => {
    if (typeof item === "object" && !Array.isArray(item)) {
      for (const key in item) {
        if (!attributes[key]) {
          attributes[key] = [];
        }
        if (!attributes[key].includes(item[key])) {
          attributes[key].push(item[key]);
        }
      }
    }
    return attributes;
  }, {});

  res.status(200).json({ products, filters: variantComb });
};

// creating a api for creating product variant separetely because its not doable with product creation.
const createProductVariant = async (req, res) => {
  const { variant, productId, price, quantity } = req.body;

  console.log("productController.js", req.body);
  let urlArray = [];
  for (let file of req.files) {
    {
      const imageUrl = await v2.uploader.upload(req.files[0].path);
      urlArray.push(imageUrl.url);
    }
  }
  if (price.length < 1 || quantity.length < 1) {
    return res.status(200).json("success");
  }
  await AttributeType.create({
    price,
    images: urlArray,
    quantity,
    productId,
    variant: JSON.parse(variant),
  });
  res.status(200).json("success");
};

// get all products
const getProducts = async (req, res) => {
  try {
    // Get all products
    let productsList;
    if (req.role === "admin") {
      productsList = await Product.aggregate([
        {
          $lookup: {
            from: "attributetypes",
            localField: "_id",
            foreignField: "productId",
            as: "result",
          },
        },
        {
          $unwind: {
            path: "$result",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
      ]);
    } else if (req.role === "vendor") {
      productsList = await Product.find({ vendorId: req.userId });
    }
    console.log("productController.js", req.userId);

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
    const { variantId } = req.query;
    let product;
    if (variantId != "null") {
      product = await Product.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(productId) } },
        {
          $lookup: {
            from: "attributetypes",
            localField: "_id",
            foreignField: "productId",
            as: "variant",
          },
        },
        {
          $unwind: {
            path: "$variant",
          },
        },
        {
          $match: {
            "variant._id": new mongoose.Types.ObjectId(variantId),
          },
        },
      ]);
    } else {
      product = await Product.find({ _id: productId });
    }

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
  const productId = req.params.id;
  const updatedProductData = req.body;
  const { variant } = updatedProductData;
  console.log("productController.js", variant);
  let parseVariant;
  if (variant) {
    parseVariant = JSON.parse(variant);
  }

  try {
    // Find the product by ID and update it
    let resp;
    let updateData;
    if (req.file) {
      resp = await v2.uploader.upload(req.file.path);
      updateData = { ...updatedProductData, coverImage: resp.url };
    } else {
      updateData = updatedProductData;
    }
    const product = await Product.findById(productId);

    updateData.stockQuantity === "null" && delete updateData.stockQuantity;
    updateData.price === "null" && delete updateData.price;
    delete updateData._id;
    delete updateData.attributes;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      {
        new: true,
      }
    );
    if (parseVariant) {
      await AttributeType.findByIdAndUpdate(parseVariant._id, parseVariant);
    }

    if (!updatedProduct) {
      // If the product is not found, return an error
      return res.status(404).json(error("Product not found"));
    }

    res.status(200).json("product updated successfully");
  } catch (error) {
    console.error(error);
    res.status(400).json("failed to update product");
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
  const filePath = req.file.path;

  // Read the Excel file using xlsx library
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

  console.log(jsonData);
  const groupedData = jsonData.reduce((acc, item) => {
    const {
      Id,
      Title,
      Description,
      FeatureImage,
      Category,
      VendorEmail,
      tags,
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
      coverImage,
      ...rest
    } = item;

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
        coverImage,
        attributes: [
          { Color },
          { Size },
          { Quantity },
          { Set },
          { Style },
          { Material },
          { Pattern },
          { Fabric },
          { Type },
          { Flavour },
        ],
        data: [combinedData],
      };
    } else {
      acc[Id].data.push(combinedData);
    }

    return acc;
  }, {});

  for (let id in groupedData) {
    let thisdata = groupedData[id];
    let slug = uuidv4(10);
    slug = slug.slice(0, 8);
    const vendor = await Vendor.findOne({ email: thisdata.VendorEmail });
    let attributes = thisdata.attributes.flatMap((obj) =>
      Object.keys(obj).filter((key) => obj[key] !== undefined)
    );
    let attributeIds = [];
    for (let attribute of attributes) {
      let att = await Attribute.findOne({ name: attribute });
      attributeIds.push(att._id);
    }
    const category = await Category.findOne({ name: thisdata.Category });

    const productCreated = await Product.create({
      description: thisdata.Description,
      name: thisdata.Title,
      slug,
      vendorId: vendor._id,
      tags: thisdata.tags.split("/"),
      attributes: attributeIds,
      categoryId: category._id,
      coverImage: thisdata.FeatureImage,
    });
    console.log(productCreated);
    for (let variant of thisdata.data) {
      console.log("productController.js", variant);
      for (const key in variant.variant) {
        if (variant.variant[key] === undefined) {
          delete variant.variant[key];
        }
      }
      const created = await AttributeType.create({
        productId: productCreated._id,
        attributeIds,
        variant: variant.variant,
        quantity: variant.Quantity,
        price: variant.Price,
        images: variant.VariantsImages.split("~"),
      });
      console.log("productController.js");
    }
  }
  console.log("productController.js", workbook);
  res.status(200).json("bulk upload successfull");
};

module.exports = {
  getProducts,
  getProduct,
  getProductsCount,
  createProduct,
  deleteProduct,
  bulkProductUpload,
  editProduct,
  checkProductsFromIds,
  createProductVariant,
  addMedias,
  getProductsByCategorySlug,
  getAllMedia,
};
