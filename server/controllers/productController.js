const AttributeType = require("../schema/attributeTypeModal");
const Product = require("../schema/productModal");
const { roles } = require("../utils");
const { success, error } = require("../utils/errorHandler");
const path = require("path");
const xlsx = require("xlsx");
const { v4: uuidv4 } = require("uuid");
const Vendor = require("../schema/vendorModal");
const Attribute = require("../schema/attributeModal");
const Category = require("../schema/categoryModal");
const { v2 } = require("../middlewares/ImageUpload");
const Media = require("../schema/mediaModal");
const mongoose = require("mongoose");
const Collection = require("../schema/collectionModal");
const sendEmail = require("../services/mailing");
const csv = require("csv-parser");
const fs = require("fs");
const { response } = require("express");

// create new product
const addMedias = async (req, res) => {
  let urls = [];
  for (let file of req.files) {
    // const uploaded = await v2.uploader.upload(file.path);
    urls.push(file.filename);
    // console.log("productController.js", uploaded);
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
          createdAt: -1, // Sort by createdAt field in descending order (newest first)
        },
      },
    ]);
  }
  if (req.role === "vendor") {
    medias = await Media.find({ vendorId: req.userId });
  }

  res.status(200).json(medias);
};

const getAllMediaList = async (req, res) => {
  let medias;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const seacrhText = req?.query?.seacrhText;
  const sortBy = req?.query?.sortBy;
  const name = req?.query?.name;

  const skip = (page - 1) * pageSize;
  let totalData = 0,
    totalPages = 0;

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
        $addFields: {
          links: {
            $reverseArray: "$links",
          },
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
      {
        $skip: Number(skip),
      },
      {
        $limit: Number(pageSize),
      },
    ]);
    totalData = await Media.aggregate([
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
    ]);
    totalPages = Math.ceil(totalData.length / pageSize);
  }
  if (req.role === "vendor") {
    medias = await Media.aggregate([
      { $match: { vendorId: new mongoose.Types.ObjectId(req.userId) } },
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
        $addFields: {
          links: {
            $reverseArray: "$links",
          },
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
      {
        $skip: Number(skip),
      },
      {
        $limit: Number(pageSize),
      },
    ]);
    totalData = await Media.aggregate([
      { $match: { vendorId: new mongoose.Types.ObjectId(req.userId) } },
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
    ]);
    totalPages = Math.ceil(totalData.length / pageSize);
    // medias = await Media.find({ vendorId: req.userId });
  }
  console.log(medias);
  res.status(200).json({
    message: "get data successfully",
    totalData: totalData.length,
    page,
    totalPages,
    medias,
  });
};

const deleteMedia = async (req, res) => {
  try {
    let { id } = req.params;
    let { url } = req?.query;
    let checkdetails = await Media.findById(id);
    if (checkdetails) {
      const filterData = checkdetails?.links?.filter((item) => item !== url);
      const media = await Media.findByIdAndUpdate(id, { links: filterData });
      res
        .status(200)
        .json({ message: "Media delete  successfully", success: true });
    } else {
      res.status(400).json({ message: "Media not found", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: error?.message, success: false });
  }
};
const createProduct = async (req, res) => {
  try {
    console.log(req.role);
    // Extract the product details from the request body
    let {
      status,
      name,
      mrp,
      vendorId,
      slug,
      description,
      price,
      quantity,
      totalSales,
      tags,
      attributes,
      categoryId,
      customization,
      readyToShip,
      freeShipping,
      commission,
      minquantity,
      sku,
      stockQuantity,
      uniqueKey,
    } = req.body;
    console.log("++++>>>>>>>>>===>", req.body);
    // if (!name || !vendorId || !slug || !description || !price) {

    // }
    if (req.role == "vendor") {
      vendorId = req.userId;
    }
    let imageUrl = req.file.filename;
    let parseAtt = JSON.parse(attributes);
    customization = JSON.parse(customization);
    // try {
    //   imageUrl = await v2.uploader.upload(req.files[0].path, {
    //     timeout: 60000, // Set a longer timeout value if needed
    //     folder: "product_images",
    //   });
    //   // Rest of the code
    // } catch (error) {
    //   res.status(400).json({ error: "Failed to create product" });
    //   // Handle the error, send an appropriate response to the client
    // }

    let attArr;
    if (parseAtt.length > 0) {
      attArr = parseAtt.map((att) => att._id);
    }
    let details = {};
    if (req.role === "admin") {
      details = {
        status: "PENDING",
        name,
        vendorId,
        slug,
        description,
        price,
        stockQuantity: quantity,
        totalSales,
        tags,
        attributes: attArr,
        coverImage: imageUrl,
        categoryId,
        customization,
        readyToShip,
        freeShipping,
        commission,
        sku,
        minquantity,
        uniqueKey,
      };
    } else {
      details = {
        status: "PENDING",
        name,
        vendorId,
        slug,
        description,
        price,
        stockQuantity,
        totalSales,
        tags,
        attributes: attArr,
        coverImage: imageUrl,
        categoryId,
        customization,
        readyToShip,
        freeShipping,
        commission,
        sku,
        mrp: mrp ? mrp : 0,
        minquantity,
        uniqueKey,
      };
    }
    // Create a new product object
    const product = new Product(details);

    // Save the product to the database
    const savedProduct = await product.save();

    // for (let elem of attributeValues) {

    //   console.log('productController.js', elem);
    //   await AttributeType.create({ productId: savedProduct._id, attributeIds: attArr, attributeCombination: elem.name, price: elem.price, quantity: elem.quantity })
    // }

    res.status(201).json(success(product));
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Failed to create product", msg: error.message });
  }
};
const alterApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved, comment } = req.body;
    let updatedProduct;
    const findProduct = await Product.findById(id);
    if (findProduct?.status == "PENDING" && approved == true) {
      updatedProduct = await Product.findByIdAndUpdate(
        id,
        { approved: approved, comment: comment, status: "ACTIVE" },
        { new: true }
      );
    } else if (findProduct?.status == "ACTIVE" && approved == false) {
      updatedProduct = await Product.findByIdAndUpdate(
        id,
        { approved: approved, comment: comment, status: "DEACTIVE" },
        { new: true }
      );
    } else if (findProduct?.status == "DEACTIVE" && approved == true) {
      updatedProduct = await Product.findByIdAndUpdate(
        id,
        { approved: approved, comment: comment, status: "ACTIVE" },
        { new: true }
      );
    } else {
      updatedProduct = await Product.findByIdAndUpdate(
        id,
        { approved: approved, comment: comment },
        { new: true }
      );
    }
    const vendor = await Vendor.findById(updatedProduct.vendorId);
    if (vendor) {
      if (approved === false) {
        await sendEmail(
          vendor.email,
          "product disapproved",
          "product with the following name " +
            updatedProduct.name +
            " is disapproved. with comment - " +
            comment
        );
        console.log("hj");
      } else {
        sendEmail(
          vendor.email,
          "product disapproved",
          "product with the following name " +
            updatedProduct.name +
            " is approved."
        );
      }
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json("something went wrong");
  }
};
const GetAllPageNumberByCategory = async (data) => {
  try {
    const { slug } = data;
    const { priceMax, priceMin, sort, bulkFilter } = data;
    let page = Number(data?.page) || 1;
    let pageSize = data?.pageSize || 10;
    const skip = (page - 1) * pageSize;
    const getCategpryId = await Category.findOne({ name: slug });

    const aggregratePipeline = [
      {
        $match: {
          categoryId: getCategpryId?._id,
        },
      },
      {
        $match: {
          status: "ACTIVE",
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
    ];

    if (bulkFilter && bulkFilter[0]?.values?.length > 0) {
      aggregratePipeline.push({
        $unwind: "$variants",
      });
      let orConditions = bulkFilter.map((filter) => {
        let orCondition = {};
        orCondition[`variants.variant.${filter.key}`] = { $in: filter.values };
        return orCondition;
      });

      aggregratePipeline.push({
        $match: {
          $or: orConditions,
        },
      });
    }

    let priceData = await Product.aggregate(
      bulkFilter.length > 0
        ? [
            ...aggregratePipeline,
            {
              $group: {
                _id: null,
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" },
              },
            },
          ]
        : [
            ...aggregratePipeline,
            {
              $unwind: "$variants",
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" },
              },
            },
          ]
    );

    if (priceMin && priceMax) {
      let matchQuery = {
        $or: [
          {
            "variants.price": {
              $gte: priceMin,
              $lte: priceMax,
            },
          },
          {
            price: {
              $gte: priceMin,
              $lte: priceMax,
            },
          },
        ],
      };
      if (!bulkFilter && bulkFilter[0]?.values?.length == 0) {
        aggregratePipeline.push({
          $unwind: "$variants",
        });
        aggregratePipeline.push({
          $match: matchQuery,
        });
      } else {
        matchQuery = {
          $or: [
            {
              "variants.price": {
                $gte: priceMin,
                $lte: priceMax,
              },
            },
            {
              price: {
                $gte: priceMin,
                $lte: priceMax,
              },
            },
          ],
        };
        aggregratePipeline.push({
          $match: matchQuery,
        });
      }
    }
    let totalData = await Product.aggregate([
      ...aggregratePipeline,
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    let totalPage = Math.ceil(totalData[0]?.count / pageSize);
    return {
      totalData,
      lastPage: totalPage,
      maxPrice: priceData[0]?.maxPrice,
      minPrice: priceData[0]?.minPrice,
    };
  } catch (error) {
    return { err: error.message };
  }
};

const getAllProductByFilter = async (req, res) => {
  try {
    const { slug } = req.params;
    const { priceMax, priceMin, sort, bulkFilter } = req.body;
    let page = Number(req?.body?.page) || 1;
    let pageSize = req?.body?.pageSize || 10;
    const skip = (page - 1) * pageSize;
    const getCategpryId = await Category.findOne({ name: slug });

    const aggregationPipeline = [
      {
        $match: {
          categoryId: getCategpryId?._id,
        },
      },
      {
        $match: {
          status: "ACTIVE",
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
        $sort: { price: -1 },
      },
    ];

    if (bulkFilter && bulkFilter[0]?.values?.length > 0) {
      aggregationPipeline.push({
        $unwind: "$variants",
      });
      let orConditions = bulkFilter.map((filter) => {
        let orCondition = {};
        orCondition[`variants.variant.${filter.key}`] = { $in: filter.values };
        return orCondition;
      });

      aggregationPipeline.push({
        $match: {
          $or: orConditions,
        },
      });
    }
    if (priceMin && priceMax) {
      let matchQuery = {
        $or: [
          {
            "variants.price": {
              $gte: priceMin,
              $lte: priceMax,
            },
          },
          {
            price: {
              $gte: priceMin,
              $lte: priceMax,
            },
          },
        ],
      };
      if (!bulkFilter && bulkFilter[0]?.values?.length == 0) {
        aggregationPipeline.push({
          $unwind: "$variants",
        });
        aggregationPipeline.push({
          $match: matchQuery,
        });
      } else {
        matchQuery = {
          $or: [
            {
              "variants.price": {
                $gte: priceMin,
                $lte: priceMax,
              },
            },
            {
              price: {
                $gte: priceMin,
                $lte: priceMax,
              },
            },
          ],
        };
        aggregationPipeline.push({
          $match: matchQuery,
        });
      }
    }
    aggregationPipeline.push(
      {
        $skip: skip,
      },
      {
        $limit: pageSize,
      }
    );
    const finalProducts = await Product.aggregate(aggregationPipeline);
    const filterDatas = await Product.aggregate([
      {
        $match: {
          categoryId: getCategpryId?._id,
        },
      },
      {
        $match: {
          status: "ACTIVE",
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
        $unwind: {
          path: "$variants",
        },
      },
      {
        $project: {
          variant: {
            $objectToArray: "$variants.variant",
          },
        },
      },
      {
        $unwind: {
          path: "$variant",
        },
      },
      {
        $group: {
          _id: "$variant.k",
          values: { $addToSet: "$variant.v" },
        },
      },
      {
        $group: {
          _id: null,
          variants: {
            $push: {
              k: "$_id",
              v: "$values",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          filters: {
            $arrayToObject: "$variants",
          },
        },
      },
    ]);

    let dataFilter = await GetAllPageNumberByCategory({
      ...req?.params,
      ...req?.body,
    });
    res.status(200).json({
      products: finalProducts,
      filters: filterDatas[0]?.filters ? filterDatas[0]?.filters : {},
      max: 0,
      maxPrice: dataFilter?.maxPrice ? dataFilter?.maxPrice : 0,
      minPrice: dataFilter?.minPrice ? dataFilter?.minPrice : 0,
      lastPage: dataFilter?.lastPage,
      dataFilter,
    });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const getProductsByCategorySlug = async (req, res) => {
  const { data, page, sort } = req.body;
  const { priceMax, priceMin } = req.body;
  const { slug } = req.params;

  const getCategpryId = await Category.findOne({ name: slug });

  const attributesArray = data;
  const aggregationPipeline = [
    {
      $match: {
        categoryId: getCategpryId?._id,
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
      $sort: { price: -1 },
    },
  ];

  const filterDatas = await Product.aggregate([
    {
      $match: {
        categoryId: getCategpryId?._id,
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
      $unwind: {
        path: "$variants",
      },
    },
    {
      $project: {
        variant: {
          $objectToArray: "$variants.variant",
        },
      },
    },
    {
      $unwind: {
        path: "$variant",
      },
    },
    {
      $group: {
        _id: "$variant.k",
        values: { $addToSet: "$variant.v" },
      },
    },
    {
      $group: {
        _id: null,
        variants: {
          $push: {
            k: "$_id",
            v: "$values",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        filters: {
          $arrayToObject: "$variants",
        },
      },
    },
  ]);

  if (attributesArray.some((attribute) => attribute.values.length > 0)) {
    const orConditions = attributesArray.map((attribute) => {
      const key = attribute.key;
      const values = attribute.values;
      return {
        $or: values.map((value) => ({
          $eq: ["$$variant.variant." + key, value.trim()],
        })),
      };
    });

    aggregationPipeline.push({
      $addFields: {
        filteredVariants: {
          $filter: {
            input: "$variants",
            as: "variant",
            cond: { $or: orConditions },
          },
        },
      },
    });

    aggregationPipeline.push({
      $match: {
        "filteredVariants.0": { $exists: true },
      },
    });
  }

  if (sort && sort == "new") {
    aggregationPipeline.push({
      $sort: { _id: -1 },
    });
  }

  const products = await Product.aggregate(aggregationPipeline);

  let filteredProducts = products.filter((product) => {
    if (product.variants && product.variants.length > 0) {
      return product.variants.some(
        (variant) => variant.price >= priceMin && variant.price <= priceMax
      );
    } else {
      return product.price >= priceMin && product.price <= priceMax;
    }
  });
  if (sort && sort == "htl") {
    // dilter high to low
    filteredProducts = filteredProducts.sort((a, b) => {
      if (a.variants.length > 0 && b.variants.length > 0) {
        return b.variants[0].price - a.variants[0].price;
      } else if (a.variants.length > 0 && b.variants.length == 0) {
        return b.price - a.variants[0].price;
      } else if (a.variants.length == 0 && b.variants.length > 0) {
        return b.variants[0].price - a.price;
      } else {
        return b.price - a.price;
      }
    });
  } else if (sort && sort == "lth") {
    // filter low to high
    filteredProducts = filteredProducts.sort((a, b) => {
      if (a.variants.length > 0 && b.variants.length > 0) {
        return a.variants[0].price - b.variants[0].price;
      } else if (a.variants.length > 0 && b.variants.length == 0) {
        return a.variants[0].price - b.price;
      } else if (a.variants.length == 0 && b.variants.length > 0) {
        return a.price - b.variants[0].price;
      } else {
        return a.price - b.price;
      }
    });
  }

  const uniqueAttributes = {};

  products.forEach((product) => {
    if (product.variants.length > 0) {
      product.variants.forEach((variant) => {
        variant.variant &&
          Object.entries(variant.variant).forEach(([attribute, value]) => {
            if (attribute !== "productId") {
              if (!uniqueAttributes[attribute]) {
                uniqueAttributes[attribute] = new Set();
              }

              if (Array.isArray(value)) {
                value.forEach((subValue) =>
                  uniqueAttributes[attribute].add(subValue.trim())
                );
              } else {
                console.log(value);
                uniqueAttributes[attribute].add(String(value).trim());
              }
            }
          });
      });
    }
  });

  const variantComb = Object.entries(uniqueAttributes).reduce(
    (attributes, [attribute, values]) => {
      attributes[attribute] = Array.from(values);
      return attributes;
    },
    {}
  );

  const lastPage = Math.ceil(filteredProducts.length / 10);
  const finalProducts = filteredProducts.slice(10 * (page - 1), 10 * page);

  res.status(200).json({
    products: finalProducts,
    filters: filterDatas[0]?.filters,
    max: Math.max(...products.map((product) => product.price), 0),
    lastPage,
  });
};

const getAllItems = async (req, res) => {
  try {
    const { slug } = req.params;
    const { priceMax, priceMin, sort, bulkFilter } = req.body;
    let page = Number(req?.body?.page) || 1;
    let pageSize = req?.body?.pageSize || 10;
    const skip = (page - 1) * pageSize;

    let matchquerys = {};
    if (sort == "recommended") {
      matchquerys = { minquantity: -1 };
    } else if (sort == "new") {
      matchquerys = { _id: -1 };
    } else if (sort == "discount") {
      matchquerys = { _id: 1 };
    } else if (sort == "htl") {
      matchquerys = { price: -1 };
    } else if (sort == "lth") {
      matchquerys = { price: 1 };
    } else if (sort == "rating") {
      matchquerys = { _id: -1 };
    }

    let aggregationPipeline = [
      {
        $match: {
          title: slug,
        },
      },
    ];

    let products = await Collection.aggregate(aggregationPipeline);
    let arrayData = products[0]?.activeProducts;
    let aggregratePipeline = [
      {
        $match: {
          _id: { $in: arrayData.map((id) => new mongoose.Types.ObjectId(id)) },
        },
      },
      {
        $match: {
          status: "ACTIVE",
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
    ];
    if (bulkFilter && bulkFilter[0]?.values?.length > 0) {
      aggregratePipeline.push({
        $unwind: "$variants",
      });
      let orConditions = bulkFilter.map((filter) => {
        let orCondition = {};
        orCondition[`variants.variant.${filter.key}`] = { $in: filter.values };
        return orCondition;
      });

      aggregratePipeline.push({
        $match: {
          $or: orConditions,
        },
      });
    }
    if (priceMin && priceMax) {
      let matchQuery = {
        $or: [
          {
            "variants.price": {
              $gte: priceMin,
              $lte: priceMax,
            },
          },
          {
            price: {
              $gte: priceMin,
              $lte: priceMax,
            },
          },
        ],
      };
      if (!bulkFilter && bulkFilter[0]?.values?.length == 0) {
        aggregratePipeline.push({
          $unwind: "$variants",
        });
        aggregratePipeline.push({
          $match: matchQuery,
        });
      } else {
        matchQuery = {
          $or: [
            {
              "variants.price": {
                $gte: priceMin,
                $lte: priceMax,
              },
            },
            {
              price: {
                $gte: priceMin,
                $lte: priceMax,
              },
            },
          ],
        };
        aggregratePipeline.push({
          $match: matchQuery,
        });
      }
    }
    aggregratePipeline.push(
      {
        $sort: matchquerys,
      },
      {
        $skip: skip,
      },
      {
        $limit: pageSize,
      }
    );
    products = await Product.aggregate(aggregratePipeline);
    res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(500).json({ msg: error?.message });
  }
};

const getProductListshowAdmin = async (req, res) => {
  try {
    const { slug } = req.params;
    let page = Number(req?.body?.page) || 1;
    let pageSize = req?.body?.pageSize || 10;
    let seacrhText = req?.body?.seacrhText;

    const skip = (page - 1) * pageSize;
    let aggregationPipeline = [
      {
        $match: {
          title: slug,
        },
      },
    ];
    let matchQuery = {};
    if (seacrhText) {
      matchQuery = {
        ...matchQuery,
        $or: [{ name: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    let products = await Collection.aggregate(aggregationPipeline);
    let arrayData = products[0]?.activeProducts;

    let aggregratePipeline = [
      {
        $match: {
          _id: {
            $in: arrayData.map((id) => new mongoose.Types.ObjectId(id)),
          },
        },
      },
      {
        $match: matchQuery,
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
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ];
    const filteredProducts = await Product.aggregate(aggregratePipeline);
    const totalPage = Math.ceil(filteredProducts.length / pageSize);
    aggregationPipeline.push(
      {
        $skip: skip,
      },
      {
        $limit: pageSize,
      }
    );
    products = await Product.aggregate(aggregratePipeline);
    res.status(200).json({ data: products, totalPage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFilterList = async (req, res) => {
  const { slug } = req.params;
  const { priceMax, priceMin, sort, bulkFilter } = req.body;

  try {
    const aggregationPipeline = [
      {
        $match: {
          title: slug,
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "activeProducts",
          foreignField: "_id",
          as: "products",
        },
      },
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $match: {
          "products.status": "ACTIVE",
        },
      },
      {
        $lookup: {
          from: "attributetypes",
          localField: "products._id",
          foreignField: "productId",
          as: "variants",
        },
      },
      {
        $unwind: {
          path: "$variants",
        },
      },
      {
        $project: {
          variant: {
            $objectToArray: "$variants.variant",
          },
        },
      },
      {
        $unwind: {
          path: "$variant",
        },
      },
      {
        $group: {
          _id: "$variant.k",
          values: { $addToSet: "$variant.v" },
        },
      },
      {
        $group: {
          _id: null,
          variants: {
            $push: {
              k: "$_id",
              v: "$values",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          filters: {
            $arrayToObject: "$variants",
          },
        },
      },
    ];
    const filterData = await Collection.aggregate(aggregationPipeline);
    return res.status(200).json(filterData);
  } catch (error) {
    return res.status(500).json({ msg: error.msg });
  }
};

const GetAllPageNumberByCollection = async (req, res) => {
  try {
    const { slug } = req.params;
    const { priceMax, priceMin, sort, bulkFilter } = req.body;
    let page = Number(req?.body?.page) || 1;
    let pageSize = req?.body?.pageSize || 10;
    const skip = (page - 1) * pageSize;

    let aggregationPipeline = [
      {
        $match: {
          title: slug,
        },
      },
    ];

    let products = await Collection.aggregate(aggregationPipeline);
    let arrayData = products[0]?.activeProducts;
    let aggregratePipeline = [
      {
        $match: {
          _id: { $in: arrayData.map((id) => new mongoose.Types.ObjectId(id)) },
        },
      },
      {
        $match: {
          status: "ACTIVE",
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
    ];

    if (bulkFilter && bulkFilter[0]?.values?.length > 0) {
      aggregratePipeline.push({
        $unwind: "$variants",
      });
      let orConditions = bulkFilter.map((filter) => {
        let orCondition = {};
        orCondition[`variants.variant.${filter.key}`] = { $in: filter.values };
        return orCondition;
      });

      aggregratePipeline.push({
        $match: {
          $or: orConditions,
        },
      });
    }

    let priceData = await Product.aggregate(
      bulkFilter.length > 0
        ? [
            ...aggregratePipeline,
            {
              $match: {
                status: "ACTIVE",
              },
            },
            {
              $group: {
                _id: null,
                // minPrice: { $min: "price" },
                // maxPrice: { $max: "price" },
                minPrice: { $min: "$variants.price" },
                maxPrice: { $max: "$variants.price" },
              },
            },
          ]
        : [
            ...aggregratePipeline,
            {
              $unwind: "$variants",
            },
            {
              $match: {
                status: "ACTIVE",
              },
            },
            {
              $group: {
                _id: null,
                count: { $sum: 1 },
                minPrice: { $min: "$variants.price" },
                maxPrice: { $max: "$variants.price" },
                // minPrice: { $min: "price" },
                // maxPrice: { $max: "price" },
              },
            },
          ]
    );

    if (priceMin && priceMax) {
      let matchQuery = {
        $or: [
          {
            "variants.price": {
              $gte: priceMin,
              $lte: priceMax,
            },
          },
          {
            price: {
              $gte: priceMin,
              $lte: priceMax,
            },
          },
        ],
      };
      if (!bulkFilter && bulkFilter[0]?.values?.length == 0) {
        aggregratePipeline.push({
          $unwind: "$variants",
        });
        aggregratePipeline.push({
          $match: matchQuery,
        });
      } else {
        matchQuery = {
          $or: [
            {
              "variants.price": {
                $gte: priceMin,
                $lte: priceMax,
              },
            },
            {
              price: {
                $gte: priceMin,
                $lte: priceMax,
              },
            },
          ],
        };
        aggregratePipeline.push({
          $match: matchQuery,
        });
      }
    }
    let totalData = await Product.aggregate([
      ...aggregratePipeline,
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    console.log("priceData=>", priceData);
    let totalPage = Math.ceil(totalData[0]?.count / pageSize);
    res.status(200).json({
      totalData,
      lastPage: totalPage,
      maxPrice: priceData[0]?.maxPrice,
      minPrice: priceData[0]?.minPrice,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getProductsByCollectionSlug = async (req, res) => {
  const { data, priceMax, priceMin, page, sort, condition, bulkFilter } =
    req.body;
  // function convertFiltersArrayToObject(filtersArray) {
  //   const filtersObject = {};

  //   filtersArray.forEach((filter) => {
  //     const lowerCaseKey = filter.key.toLowerCase().trim();
  //     filtersObject[lowerCaseKey] = filter.values.map((value) => value.trim());
  //   });

  //   return filtersObject;
  // }
  const { slug } = req.params;
  console.log("productController.js", slug);

  let aggregationPipeline;

  const attributesArray = data;

  // if (attributesArray.some((attribute) => attribute.values.length > 0)) {
  //   aggregationPipeline = [
  //     {
  //       $match: {
  //         title: slug,
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "products",
  //         localField: "activeProducts",
  //         foreignField: "_id",
  //         as: "products",
  //       },
  //     },
  //     {
  //       $unwind: {
  //         path: "$products",
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "attributetypes",
  //         localField: "_id",
  //         foreignField: "productId",
  //         as: "variants",
  //       },
  //     },
  //     {
  //       $addFields: {
  //         filteredVariants: {
  //           $filter: {
  //             input: "$variants",
  //             as: "variant",
  //             cond: {
  //               $or: attributesArray.map((attribute) => {
  //                 const key = attribute.key;
  //                 const values = attribute.values;
  //                 return {
  //                   $or: values.map((value) => ({
  //                     $eq: ["$$variant.variant." + key, value],
  //                   })),
  //                 };
  //               }),
  //             },
  //           },
  //         },
  //       },
  //     },

  //     {
  //       $sort: { createdAt: -1 },
  //     },
  //   ];
  // } else {
  aggregationPipeline = [
    {
      $match: {
        title: slug,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "activeProducts",
        foreignField: "_id",
        as: "products",
      },
    },
    {
      $unwind: {
        path: "$products",
      },
    },
    {
      $lookup: {
        from: "attributetypes",
        localField: "products._id",
        foreignField: "productId",
        as: "variants",
      },
    },
  ];
  // }

  const products = await Collection.aggregate(aggregationPipeline);
  // console.log(products);
  let filteredProducts = [];
  // if (data?.length > 0 && data[0]?.values.length > 0) {
  //   data[0]?.values?.forEach((element, index) => {
  //     let filteredData = products.filter((product) => {
  //       return product?.variants.some((item) => {
  //         console.log("+++___>", item);
  //         if (item.variant?.Color) {
  //           return item.variant["Color"] == data[0]?.values[index];
  //         }
  //       });
  //     });
  //     filteredProducts = [...filteredProducts, ...filteredData];
  //   });
  // } else {
  //   filteredProducts = products;
  // }

  if (bulkFilter && bulkFilter.length > 0) {
    const itemMatchesFilters = (item, filters) => {
      return filters.every((filter) => {
        const filterKey = filter.key;
        const filterValues = filter.values;

        // Check if the item has variants
        if (item.variants && item.variants.length > 0) {
          return item.variants.some((variant) => {
            console.log("++>", variant);
            if (variant.hasOwnProperty("variant")) {
              return filterValues.includes(variant.variant[filterKey]);
            }
          });
        }
        return false;
      });
    };

    // Filter the data based on the bulkFilter conditions
    filteredProducts = products.filter((item) =>
      itemMatchesFilters(item, bulkFilter)
    );
  } else {
    filteredProducts = products;
  }

  let maxPrice = 0;
  let minPrice = Number.MAX_VALUE;

  // Loop through the data to find the max and min prices
  products.forEach((item) => {
    if (item?.products?.price) {
      if (item?.products?.price > maxPrice) {
        maxPrice = item?.products.price;
      }
      if (item?.products?.price < minPrice) {
        minPrice = item?.products.price;
      }
    } else {
      item.variants.forEach((variant) => {
        if (variant.price > maxPrice) {
          maxPrice = variant.price;
        }
        if (variant.price < minPrice) {
          minPrice = variant.price;
        }
      });
    }
  });

  // Create an object to store the max and min prices

  if (priceMin && priceMax) {
    filteredProducts = filteredProducts.filter((product) => {
      if (product?.products?.price) {
        return (
          product?.products?.price >= priceMin &&
          product?.products?.price <= priceMax
        );
      } else {
        return product?.variants.some((item) => {
          return item?.price >= priceMin && item?.price <= priceMax;
        });
      }
    });
  }
  if (sort && sort == "htl") {
    // filteredProducts = products.filter((product) => {
    //   if (product.variants && product.variants.length > 0) {
    //     return product.variants.some(
    //       (variant) => variant.price >= priceMin && variant.price <= priceMax
    //     );
    //   } else {
    //     return (
    //       product.products.price >= priceMin && product.products.price <= priceMax
    //     );
    //   }
    // });

    filteredProducts = filteredProducts.sort((a, b) => {
      if (a.variants.length > 0 && b.variants.length > 0) {
        return b.variants[0].price - a.variants[0].price;
      } else if (a.variants.length > 0 && b.variants.length == 0) {
        return b.price - a.variants[0].price;
      } else if (a.variants.length == 0 && b.variants.length > 0) {
        return b.variants[0].price - a.price;
      } else {
        return b.price - a.price;
      }
    });
  } else if (sort && sort == "lth") {
    filteredProducts = filteredProducts.sort((a, b) => {
      if (a.variants.length > 0 && b.variants.length > 0) {
        return a.variants[0].price - b.variants[0].price;
      } else if (a.variants.length > 0 && b.variants.length == 0) {
        return a.variants[0].price - b.price;
      } else if (a.variants.length == 0 && b.variants.length > 0) {
        return a.price - b.variants[0].price;
      } else {
        return a.price - b.price;
      }
    });
  }

  // Gather unique attributes and their values
  const uniqueAttributes = {};

  products.forEach((product) => {
    if (product.variants.length > 0) {
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
    }
  });

  // Convert uniqueAttributes into arrays
  Object.keys(uniqueAttributes).forEach((attribute) => {
    uniqueAttributes[attribute] = Array.from(uniqueAttributes[attribute]);
  });
  let filtersData = await getAllFilterList({ ...req.body, ...req.params });
  const lastPage = Math.ceil(filteredProducts.length / 10);
  let finalProducts = filteredProducts.slice(10 * (page - 1), 10 * page);
  res.status(200).json({
    products: finalProducts,
    filters: filtersData[0]?.filters,
    lastPage,
    maxPrice: maxPrice,
    minPrice: minPrice,
  });
};

const getProductsByFilter = async (req, res) => {
  const { data } = req.body;
  const { priceMax } = req.body;
  function convertFiltersArrayToObject(filtersArray) {
    const filtersObject = {};

    filtersArray.forEach((filter) => {
      const lowerCaseKey = filter.key.toLowerCase().trim();
      filtersObject[lowerCaseKey] = filter.values.map((value) => value.trim());
    });

    return filtersObject;
  }
  const { slug } = req.params;
  console.log("productController.js", slug);

  let aggregationPipeline;

  const attributesArray = data;

  if (attributesArray.some((attribute) => attribute.values.length > 0)) {
    aggregationPipeline = [
      {
        $lookup: {
          from: "attributetypes",
          localField: "_id",
          foreignField: "productId",
          as: "variants",
        },
      },
      {
        $addFields: {
          filteredVariants: {
            $filter: {
              input: "$variants",
              as: "variant",
              cond: {
                $or: attributesArray.map((attribute) => {
                  const key = attribute.key;
                  const values = attribute.values;
                  return {
                    $or: values.map((value) => ({
                      $eq: ["$$variant.variant." + key, value],
                    })),
                  };
                }),
              },
            },
          },
        },
      },
      {
        $match: {
          "filteredVariants.0": { $exists: true },
          price: {
            $lt: +priceMax,
          },
        },
      },
      {
        $sort: {
          price: -1,
        },
      },
    ];
  } else {
    aggregationPipeline = aggregationPipeline = [
      {
        $lookup: {
          from: "attributetypes",
          localField: "_id",
          foreignField: "productId",
          as: "variants",
        },
      },
      {
        $match: {
          price: {
            $lt: +priceMax,
          },
        },
      },
      {
        $sort: {
          price: -1,
        },
      },
    ];
  }

  const products = await Product.aggregate(aggregationPipeline);

  // Gather unique attributes and their values
  const uniqueAttributes = {};

  products.forEach((product) => {
    if (product && product.variants && product.variants.length > 0) {
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
    }
  });

  // Convert uniqueAttributes into arrays
  Object.keys(uniqueAttributes).forEach((attribute) => {
    uniqueAttributes[attribute] = Array.from(uniqueAttributes[attribute]);
  });
  const variantComb =
    uniqueAttributes.variant &&
    uniqueAttributes.variant.reduce((attributes, item) => {
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

  res.status(200).json({ products: products, filters: variantComb });
};
// creating a api for creating product variant separetely because its not doable with product creation.
const createProductVariant = async (req, res) => {
  try {
    console.log("++++>", req?.body);
    let { variant, productId, price, quantity, mrp, uniqueKey, QTY } = req.body;
    variant = JSON.parse(variant);
    let { data, ...variantName } = variant;
    if (QTY == "undefined") {
      QTY = 0;
    }
    console.log("productController.js", req.body);
    let urlArray = [];
    for (let file of req.files) {
      {
        // const imageUrl = await v2.uploader.upload(req.files[0].path);
        urlArray.push(file.filename);
      }
    }
    if (mrp.length < 1 || quantity.length < 1) {
      return res.status(200).json("success");
    }
    await AttributeType.create({
      mrp,
      QTY,
      images: urlArray,
      quantity,
      productId,
      price,
      uniqueKey,
      variant: variantName,
      dynamic_price: data,
    });
    res.status(200).json("success");
  } catch (err) {
    console.log("productController.js", err);
  }
};
const getSearchProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json("something went wrong");
  }
};

// get all products
const getVendorProducts = async (req, res) => {
  try {
    let productsList = await Product.find({ vendorId: req.userId });
    res.status(200).json(productsList);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProducts = async (req, res) => {
  try {
    let productsList;
    if (req.role && req.role === "vendor") {
      // Fetch most recently added 30 products for the vendor
      // productsList = await Product.find({ vendorId: req.userId })
      //   .sort({ createdAt: -1 })
      //   .limit(30);
      productsList = await Product.aggregate([
        {
          $match: { vendorId: req.userId },
        },
        {
          $lookup: {
            from: "attributes",
            localField: "attributes",
            foreignField: "_id",
            as: "variant",
          },
        },
        {
          $sort: { createdAt: -1 }, // Sort by creation date in descending order
        },
        {
          $limit: 100,
        },
      ]).exec();
    } else if (req.role === "vendor") {
      // Fetch most recently added 30 products with variants
      productsList = await Product.aggregate([
        {
          $lookup: {
            from: "attributes",
            localField: "attributes",
            foreignField: "_id",
            as: "variant",
          },
        },
        {
          $sort: { createdAt: -1 }, // Sort by creation date in descending order
        },
        {
          $limit: 30,
        },
      ]).exec();
    } else {
      productsList = await Product.aggregate([
        {
          $match: { status: "ACTIVE" },
        },
        {
          $lookup: {
            from: "attributes",
            localField: "attributes",
            foreignField: "_id",
            as: "variant",
          },
        },
        {
          $lookup: {
            from: "attributetypes",
            localField: "_id",
            foreignField: "productId",
            as: "result",
          },
        },
        {
          $sort: { createdAt: -1 }, // Sort by creation date in descending order
        },
        {
          $limit: 30,
        },
      ]).exec();
    }

    res.status(200).json(productsList);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to get products" });
  }
};

const getProductsList = async (req, res) => {
  try {
    let productsList;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;
    console.log("====>", pageSize, page);

    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;

    let matchQuery = {};
    if (seacrhText) {
      console.log("--->", seacrhText);
      matchQuery = {
        $or: [{ name: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    if (req.role && req.role === "vendor") {
      // Fetch most recently added 30 products for the vendor
      // productsList = await Product.find({ vendorId: req.userId })
      //   .sort({ createdAt: -1 })
      //   .limit(30);
      productsList = await Product.aggregate([
        {
          $match: { vendorId: new mongoose.Types.ObjectId(req.userId) },
        },
        {
          $match: matchQuery,
        },
        {
          $lookup: {
            from: "attributes",
            localField: "attributes",
            foreignField: "_id",
            as: "variant",
          },
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);
      totalData = await Product.find({
        vendorId: req?.userId,
        ...matchQuery,
      }).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    } else {
      // Fetch most recently added 30 products with variants
      productsList = await Product.aggregate([
        {
          $match: matchQuery,
        },
        {
          $lookup: {
            from: "attributes",
            localField: "attributes",
            foreignField: "_id",
            as: "variant",
          },
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);
      totalData = await Product.find(matchQuery).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    }

    res.status(200).json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      productsList,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to get products" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let productsList;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;
    const sortBy = req?.query?.sortBy;
    const name = req?.query?.name;

    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;

    let matchQuery = {};
    if (req.query?.vendorId) {
      matchQuery = {
        vendorId: new mongoose.Types.ObjectId(req.query?.vendorId),
      };
    }
    if (seacrhText) {
      matchQuery = {
        ...matchQuery,
        $or: [{ name: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }

    let sortQuery = { createdAt: -1 };
    let matchQueries = {};
    if (name && sortBy) {
      if (name === "Price") {
        if (sortBy === "low to high") {
          sortQuery = { price: 1 };
        } else if (sortBy === "high to low") {
          sortQuery = { price: -1 };
        }
      } else if (name === "Name") {
        if (sortBy === "A to Z") {
          sortQuery = { name: 1 };
        } else if (sortBy === "Z to A") {
          sortQuery = { name: -1 };
        }
      } else if (name === "Status") {
        if (sortBy === "Active") {
          matchQueries = { status: "ACTIVE" };
        } else if (sortBy === "Deactive") {
          matchQueries = { status: "DEACTIVE" };
        } else if (sortBy === "Pending") {
          matchQueries = { status: "PENDING" };
        }
      } else if (name === "Inventory") {
        if (sortBy === "High to Low") {
          sortQuery = { stockQuantity: -1 };
        } else if (sortBy === "Low to High") {
          sortQuery = { stockQuantity: 1 };
        }
      } else if (name == "Created") {
        if (sortBy == "Oldest First") {
          sortQuery = { createdAt: 1 };
        } else if (sortBy == "Newest First") {
          sortQuery = { createdAt: -1 };
        }
      } else if (name == "Updated") {
        if (sortBy == "Oldest First") {
          sortQuery = { updatedAt: 1 };
        } else if (sortBy == "Newest First") {
          sortQuery = { updatedAt: -1 };
        }
      } else if (name == "Vendor") {
        if (sortBy === "A to Z") {
          sortQuery = { "vendor.firstName": 1 };
        } else if (sortBy === "Z to A") {
          sortQuery = { "vendor.firstName": -1 };
        }
      }
    }
    if (req.role && req.role === "vendor") {
      productsList = await Product.aggregate([
        {
          $match: matchQuery,
        },
        {
          $match: matchQueries,
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $match: { vendorId: new mongoose.Types.ObjectId(req.userId) },
        },
        {
          $lookup: {
            from: "attributes",
            localField: "attributes",
            foreignField: "_id",
            as: "variant",
          },
        },
        {
          $sort: sortQuery,
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]).exec();
      totalData = await Product.find({ vendorId: req.userId }).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    } else {
      productsList = await Product.aggregate([
        {
          $match: matchQuery, // Apply the search query
        },
        {
          $match: matchQueries,
        },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $lookup: {
            from: "attributes",
            localField: "attributes",
            foreignField: "_id",
            as: "variant",
          },
        },
        {
          $lookup: {
            from: "vendors",
            localField: "vendorId",
            foreignField: "_id",
            as: "vendor",
          },
        },
        {
          $unwind: "$vendor",
        },
        {
          $sort: sortQuery,
        },
        {
          $skip: Number(skip),
        },
        {
          $limit: Number(pageSize),
        },
      ]).exec();
      totalData = await Product.find({
        ...matchQuery,
        ...matchQueries,
      }).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    }

    // Check if the requested page is greater than the total pages and adjust it
    res.status(200).json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      productsList,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error, error: "Failed to get products" });
  }
};

const getProductsAdmin = async (req, res) => {
  try {
    // Extract pageNumber and pageSize from req.query or set default values
    const pageNumber = req.query.pageNumber
      ? parseInt(req.query.pageNumber)
      : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 30;

    let productsList;
    let totalProductsCount;

    if (req.role && req.role === "vendor") {
      // Fetch products for the vendor with pagination
      productsList = await Product.find({ vendorId: req.userId })
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);

      // Get the total count of products for the vendor
      totalProductsCount = await Product.countDocuments({
        vendorId: req.userId,
      });
    } else {
      // Fetch products with variants and pagination
      productsList = await Product.aggregate([
        {
          $lookup: {
            from: "attributetypes",
            localField: "_id",
            foreignField: "productId",
            as: "variant",
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: (pageNumber - 1) * pageSize,
        },
        {
          $limit: pageSize,
        },
      ]).exec();

      // Get the total count of all products
      totalProductsCount = await Product.countDocuments({});
    }

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalProductsCount / pageSize);

    res.status(200).json({
      productsList,
      pageNumber,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to get products" });
  }
};

// get product based on the id
const getProduct = async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const productId = req.params.id;
    const { variantId } = req.query;
    let product;

    product = await Product.findById(productId);

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

const editProductVariant = async (req, res) => {
  try {
    const { productId } = req.params;
    let { variant, quantity, price, QTY, images, uniqueKey, mrp } = req.body;
    if (QTY == "undefined") {
      QTY = 0;
    }
    console.log(">>>>>>>>>>>", req?.body);
    variant = JSON.parse(variant);
    let { data, ...variantName } = variant;
    let urls = [];
    if (req.files.length > 0) {
      for (let file of req.files) {
        // const uploaded = await v2.uploader.upload(file.path);
        urls.push(file.filename);
        // console.log("productController.js", uploaded);
      }
    }
    // await AttributeType.deleteMany({
    //   uniqueKey: uniqueKey,
    // });
    let check = await AttributeType.findOne({
      uniqueKey: uniqueKey,
      productId: productId,
    });

    if (check) {
      const variantFound = await AttributeType.findOneAndUpdate(
        {
          uniqueKey: uniqueKey,
          productId: productId,
        },
        {
          price,
          quantity,
          mrp,
          QTY,
          dynamic_price: data,
          variant: variantName,
          uniqueKey: uniqueKey,
          images: req.files.length > 0 ? urls : images,
          productId: productId,
        },
        { upsert: true, new: true }
      );
    } else {
      let uniqueNumber = uniqueKey.trim().split(",")[0];
      await Product.findByIdAndUpdate(productId, { uniqueKey: uniqueNumber });
      let checkAttributePresent = await AttributeType.findOne({
        productId: productId,
      });

      if (!checkAttributePresent?.uniqueKey) {
        await AttributeType.deleteMany({ productId: productId });
      }

      await AttributeType.create({
        mrp,
        images: urls,
        quantity,
        QTY,
        productId,
        price,
        uniqueKey,
        variant: variantName,
        dynamic_price: data,
      });
    }
    res.status(200).json({ message: "Product create succefully", productId });
  } catch (e) {
    console.log("productController.js", e);
  }
};

const getProductVariants = async (req, res) => {
  const { productId } = req.params;
  const products = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(productId),
      },
    },
    {
      $lookup: {
        from: "attributetypes",
        localField: "_id",
        foreignField: "productId",
        as: "result",
      },
    },
  ]);
  res.status(200).json(products[0]);
};

// edit product
const editProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;
  const { variant } = updatedProductData;

  try {
    // Find the product by ID and update it
    let parseVariant;
    if (variant && variant.length > 0) {
      parseVariant = variant;
    }
    let resp;
    let updateData;
    console.log("++++>>>>>>???", req.files);
    if (req.file) {
      // resp = await v2.uploader.upload(req.file.path);
      updateData = { ...updatedProductData, coverImage: req.file.filename };
    } else {
      updateData = updatedProductData;
    }

    const product = await Product.findById(productId);
    if (product) {
      updateData.stockQuantity === "null" && delete updateData.stockQuantity;
      updateData.price === "null" && delete updateData.price;
      delete updateData._id;
      delete updateData.attributes;
      console.log("productController.js", {
        variant,
        productId,
        product,
        updateData,
      });
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        {
          new: true,
        }
      );
      if (parseVariant && Array.isArray(parseVariant)) {
        parseVariant.map(async (item, index) => {
          await AttributeType.findByIdAndUpdate(item._id, item);
        });
      } else {
        await AttributeType.findByIdAndUpdate(parseVariant?._id, parseVariant);
      }
    } else {
      return res.status(404).json(error("Product not found"));
    }

    res.status(200).json("product updated successfully");
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ msg: "failed to update product", error: error?.message });
  }
};

const editProductInvantory = async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body?.editedProduct;
  const { variant } = updatedProductData;
  const uniqueKey = updatedProductData?.uniqueKey;
  const varientstore = req.body?.varientstore;
  console.log("varientstore", varientstore);
  try {
    // Find the product by ID and update it
    let parseVariant;
    if (variant && variant.length > 0) {
      parseVariant = variant;
    }
    let resp;
    let updateData;
    console.log("++++>>>>>>???", req.files);
    if (req.file) {
      // resp = await v2.uploader.upload(req.file.path);
      updateData = { ...updatedProductData, coverImage: req.file.filename };
    } else {
      updateData = updatedProductData;
    }

    const product = await Product.findById(productId);
    if (product) {
      updateData.stockQuantity === "null" && delete updateData.stockQuantity;
      updateData.price === "null" && delete updateData.price;
      delete updateData._id;
      delete updateData.attributes;
      console.log("productController.js", {
        variant,
        productId,
        product,
        updateData,
      });
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updateData,
        {
          new: true,
        }
      );
      if (varientstore) {
        varientstore.map(async (item, index) => {
          await AttributeType.findByIdAndUpdate(item._id, item);
        });
      }
      // else {
      //   await AttributeType.findByIdAndUpdate(parseVariant?._id, parseVariant);
      // }
    } else {
      return res.status(404).json(error("Product not found"));
    }

    res.status(200).json("product updated successfully");
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ msg: "failed to update product", error: error?.message });
  }
};

const updateProductstcock = async (req, res) => {
  const products = await Product.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send(products);
};

const editProductInventory = async (req, res) => {
  try {
    let { id } = req.params;
    let updateProduct = await Product.findByIdAndUpdate(id, req?.body);
    res
      .status(200)
      .json({ message: "update product succefully", product: updateProduct });
  } catch (error) {
    res.status(500).json({ err: error.message });
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

const getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  const product = await Product.aggregate([
    {
      $match: {
        slug: slug,
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
  ]);
  await sendEmail();
  res.status(200).json(product[0]);
};

const isCSV = (filePath) => {
  return path.extname(filePath).toLowerCase() === ".csv";
};

const bulkProductUpload = async (req, res) => {
  const filePath = req.file.path;
  const { venderId } = req?.body;
  let jsonData = [];

  if (isCSV(filePath)) {
    // If it's a CSV file, read it using csv-parser
    jsonData = await new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    });
  } else {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    jsonData = xlsx.utils.sheet_to_json(worksheet);
  }

  if (venderId == 1) {
    jsonData.map(async (item) => {
      let vendor = await Vendor.findOne({ email: item.VendorEmail });
      if (!vendor) {
        vendor = await Vendor.create({
          firstName: item.VendorEmail,
          email: item.VendorEmail,
          password: "123456",
        });
      }
    });
    return res.status(200).send({ msg: "vender create succefuly", jsonData });
  }

  // return res.json(jsonData);

  const groupedData = jsonData.reduce((acc, item) => {
    const {
      ID,
      Title,
      Description,
      FeatureImage,
      Category,
      Mrp,
      VendorEmail,
      Price,
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
      ProductQuantity,
      sku,
      minQuantity,
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
    // return res.status(200).json(jsonData);

    const combinedData = { ...rest, variant: variantData };

    if (!acc[ID]) {
      acc[ID] = {
        ID,
        Title,
        Description,
        FeatureImage: [FeatureImage],
        VendorEmail,
        tags,
        Category,
        Mrp,
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
      const variantKeys = Object.keys(variantData);
      const allNull = variantKeys.every(
        (key) => variantData[key] === undefined
      );

      if (allNull) {
        acc[ID].price = Price;
        acc[ID].stockQuantity = ProductQuantity;
        acc[ID].mrp = Mrp;
      }
    } else {
      if (FeatureImage) {
        acc[ID].FeatureImage.push(FeatureImage);
      }
      acc[ID].data.push(combinedData);
    }

    return acc;
  }, {});

  // return res.status(200).send(groupedData);

  for (let id in groupedData) {
    let thisdata = groupedData[id];
    //  return res.status(200).send(groupedData);
    let slug = uuidv4(10);
    slug = slug.slice(0, 8);
    /**
     * @email:
     */

    if (!thisdata.VendorEmail) {
      continue;
    } else {
      let vendor = await Vendor.findOne({ email: thisdata.VendorEmail });
      if (!vendor) {
        vendor = await Vendor.create({
          firstName: thisdata.VendorEmail,
          email: thisdata.VendorEmail,
          password: "123456",
        });
      }
      let attributes;
      attributes = thisdata.attributes.flatMap((obj) =>
        Object.keys(obj).filter((key) => obj[key] !== undefined)
      );
      let attributeIds = [];
      for (let attribute of attributes) {
        let att = await Attribute.findOne({ name: attribute });
        attributeIds.push(att._id);
      }
      let category;
      if (thisdata.Category) {
        category = await Category.findOne({ name: thisdata.Category });

        if (!category) {
          category = await Category.create({
            name: thisdata.Category,
            attributes: attributeIds,
          });
        }
      }
      let uniqueKey =
        Math.floor(Math.random() * 2033434326503 + Math.random()) +
        125058667897778;
      const productDatasingle = {
        description: thisdata.Description ?? " ",
        name: thisdata.Title,
        slug,
        price: thisdata.price,
        stockQuantity: thisdata.stockQuantity,
        mrp: thisdata.mrp,
        vendorId: vendor._id,
        tags: thisdata.tags.split(","),
        attributes: attributeIds,
        categoryId: category._id,
        coverImage: thisdata.FeatureImage[0],
        images: thisdata.FeatureImage,
        uniqueKey,
      };
      const productCreated = await Product.create(productDatasingle);
      console.log("-->", productCreated);
      for (let variant of thisdata.data) {
        let index = thisdata.data.indexOf(variant);
        for (const key in variant.variant) {
          if (variant.variant[key] === undefined) {
            delete variant.variant[key];
          }
        }
        if (Object.keys(variant.variant).length == 0) {
          continue;
        }
        const created = await AttributeType.create({
          productId: productCreated._id,
          attributeIds,
          uniqueKey: `${uniqueKey},${index}`,
          variant: variant.variant,
          quantity: variant.ProductQuantity,
          price: variant.price ? variant.price : thisdata.price,
          images:
            variant.VariantsImages && variant.VariantsImages.length > 0
              ? variant.VariantsImages.split("~")
              : [],
        });
        console.log("productController.js");
      }
      let postCollctin = await getCollectionDataz(productCreated);
    }
    // filter price and put data in collections
  }
  // console.log("productController.js", workbook);
  res.status(200).json("bulk upload successfull");
};

const bulkProductUploadVendor = async (req, res) => {
  const filePath = req.file.path;
  const { venderId } = req?.body;
  const userId = req?.userId;
  let jsonData = [];

  if (isCSV(filePath)) {
    // If it's a CSV file, read it using csv-parser
    jsonData = await new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results))
        .on("error", reject);
    });
  } else {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    jsonData = xlsx.utils.sheet_to_json(worksheet);
  }

  const groupedData = jsonData.reduce((acc, item) => {
    const {
      ID,
      Title,
      Description,
      FeatureImage,
      Category,
      Mrp,
      VendorEmail,
      Price,
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
      ProductQuantity,
      sku,
      minQuantity,
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
    // return res.status(200).json(jsonData);

    const combinedData = { ...rest, variant: variantData };

    if (!acc[ID]) {
      acc[ID] = {
        ID,
        Title,
        Description,
        FeatureImage: [FeatureImage],
        VendorEmail,
        tags,
        Category,
        Mrp,
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
      const variantKeys = Object.keys(variantData);
      const allNull = variantKeys.every(
        (key) => variantData[key] === undefined
      );

      if (allNull) {
        acc[ID].price = Price;
        acc[ID].stockQuantity = ProductQuantity;
        acc[ID].mrp = Mrp;
      }
    } else {
      if (FeatureImage) {
        acc[ID].FeatureImage.push(FeatureImage);
      }
      acc[ID].data.push(combinedData);
    }

    return acc;
  }, {});

  // return res.status(200).send(groupedData);

  for (let id in groupedData) {
    let thisdata = groupedData[id];
    //  return res.status(200).send(groupedData);
    let slug = uuidv4(10);
    slug = slug.slice(0, 8);
    /**
     * @email:
     */

    if (!thisdata.VendorEmail) {
      continue;
    } else {
      let checkVendor = await Vendor.findById(userId);
      let vendor = await Vendor.findOne({ email: thisdata.VendorEmail });
      if (checkVendor && vendor && checkVendor?.email == vendor?.email) {
        let attributes;
        attributes = thisdata.attributes.flatMap((obj) =>
          Object.keys(obj).filter((key) => obj[key] !== undefined)
        );
        let attributeIds = [];
        for (let attribute of attributes) {
          let att = await Attribute.findOne({ name: attribute });
          attributeIds.push(att._id);
        }
        let category;
        if (thisdata.Category) {
          category = await Category.findOne({ name: thisdata.Category });

          if (!category) {
            category = await Category.create({
              name: thisdata.Category,
              attributes: attributeIds,
            });
          }
        }
        let uniqueKey =
          Math.floor(Math.random() * 2033434326503 + Math.random()) +
          125058667897778;
        const productDatasingle = {
          description: thisdata.Description ?? " ",
          name: thisdata.Title,
          slug,
          price: thisdata.price,
          stockQuantity: thisdata.stockQuantity,
          mrp: thisdata.mrp,
          vendorId: vendor._id,
          tags: thisdata.tags.split(","),
          attributes: attributeIds,
          categoryId: category._id,
          coverImage: thisdata.FeatureImage[0],
          images: thisdata.FeatureImage,
          uniqueKey,
        };
        const productCreated = await Product.create(productDatasingle);
        for (let variant of thisdata.data) {
          let index = thisdata.data.indexOf(variant);
          console.log("productController.js", variant);
          for (const key in variant.variant) {
            if (variant.variant[key] === undefined) {
              delete variant.variant[key];
            }
          }
          if (Object.keys(variant.variant).length == 0) {
            continue;
          }
          const created = await AttributeType.create({
            productId: productCreated._id,
            attributeIds,
            uniqueKey: `${uniqueKey},${index}`,
            variant: variant.variant,
            quantity: variant.ProductQuantity,
            price: variant.Price ? variant.Price : thisdata.price,
            images:
              variant.VariantsImages && variant.VariantsImages.length > 0
                ? variant.VariantsImages.split("~")
                : [],

            // uniqueKey: `${uniqueKey},${}`,
          });
          console.log("productController.js");
        }
        let postCollctin = await getCollectionDataz(productCreated);
      }
    }
    // filter price and put data in collections
  }
  // console.log("productController.js", workbook);
  res.status(200).json("bulk upload successfull");
};

const deleteFakeProducts = async (req, res) => {
  // const products = await Product.aggregate([])
  //
  variants = await AttributeType.find({ variant: { $exists: false } });

  res.status(200).json("bulk delete successfull");
};

const getCollectionDataz = async (productData) => {
  const collectionsData = await Collection.find()
    .populate("conditionValue")
    .sort({ createdAt: -1 });

  collectionsData.map(async (items, index) => {
    let checkpresent = checkdataFilter(productData, items);
    if (checkpresent) {
      let checkCollection = await Collection.findById(items?._id);
      if (checkCollection) {
        let prevData = [...checkCollection.activeProducts, productData?._id];
        await Collection.findByIdAndUpdate(items?._id, {
          activeProducts: prevData,
        });
      }
    }
  });

  return collectionsData;
  // return  validateForCollection(
  //   productData?._id,
  //   productData,
  //   collectionsData
  // );
};

const checkdataFilter = (variateData, category) => {
  let categoryKeys = category?.collectionConditionId || [];
  categoryKeys = categoryKeys
    .map((value) => value.trim())
    .filter((value, index, self) => self.indexOf(value) === index);
  let methods = category?.conditionValue || []; // Use empty array as default value if category?.conditionValue is undefined
  let matchvalue = category?.inputValue || [];
  let checkPresent = categoryKeys.map((item, index) => {
    if (item == "Price") {
      let mainPrice = Number(variateData?.price);
      let checkpresnetPrice = false;
      if (matchvalue.length === 2) {
        // Check if matchvalue has two values
        let minValue = Number(matchvalue[0]);
        let maxValue = Number(matchvalue[1]);
        checkpresnetPrice = mainPrice >= minValue && mainPrice <= maxValue;
      } else if (matchvalue.length === 1) {
        let minValue = Number(matchvalue[0]);
        checkpresnetPrice = mainPrice >= minValue;
      }
      return checkpresnetPrice;
    } else {
      return methods.map((method, inx) => {
        let isMatch = false;
        let isContainsData = variateData[item] || "";
        matchvalue.forEach((str) => {
          if (method?.conditionValue == "contains") {
            isMatch = isContainsData.includes(str);
          } else if (method?.conditionValue == "end with") {
            isMatch = isContainsData.endsWith(str);
          } else if (method?.conditionValue == "start with") {
            isMatch = isContainsData.startsWith(str);
          } else if (method?.conditionValue == "does not contain") {
            isMatch = !isContainsData.startsWith(str);
          } else if (method?.conditionValue == "is empty") {
            isMatch = isContainsData.isEmpty();
          } else if (method?.conditionValue == "is not empty") {
            isMatch = !isContainsData.isEmpty();
          }
        });
        return isMatch;
      });
    }
  });

  let responce = false;
  if (Array.isArray(checkPresent)) {
    checkPresent = checkPresent
      .join(",")
      .split(",")
      .map((ite) => JSON.parse(ite));
    checkPresent.map((item) => {
      if (Boolean(item) == Boolean(true)) {
        responce = Boolean(true);
      }
    });
  } else {
    responce = Boolean(checkPresent);
  }
  return Boolean(responce);
};

const SearchProducts = async (req, res) => {
  try {
    let { seacrhText } = req?.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    let matchQuery = {
      $or: [{ name: { $regex: new RegExp(seacrhText, "i") } }],
    };
    let products = await Product.find({ ...matchQuery, status: "ACTIVE" })
      .skip(skip)
      .limit(pageSize);
    let totaldata = await Product.find({
      ...matchQuery,
      status: "ACTIVE",
    }).countDocuments();
    let totalPages = Math.ceil(totaldata / pageSize);
    res.status(200).send({ products, totalPages });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

const getProductBudgetRecenltTrending = async (req, res) => {
  try {
    const BudgetProduct = await Product.aggregate([
      {
        $match: { status: "ACTIVE" },
      },
      {
        $lookup: {
          from: "attributes",
          localField: "attributes",
          foreignField: "_id",
          as: "variant",
        },
      },
      {
        $lookup: {
          from: "attributetypes",
          localField: "_id",
          foreignField: "productId",
          as: "result",
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $match: {
          $or: [
            {
              "result.price": {
                $gte: 0,
                $lte: 1000,
              },
            },
            {
              price: {
                $gte: 0,
                $lte: 1000,
              },
            },
          ],
        },
      },
      {
        $limit: 30,
      },
    ]);

    const RecentProduct = await Product.find({ status: "ACTIVE" })
      .sort("created")
      .limit(30);

    const TrendingProduct = await Product.find({ status: "ACTIVE" })
      .sort("created")
      .limit(30);

    res.status(200).json({
      budgetProducts: BudgetProduct,
      RecentProduct,
      TrendingProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId, collectiontitle } = req?.body;
    console.log("-->", { productId, collectiontitle });
    let findCollection = await Collection.findOne({
      title: collectiontitle,
    });
    let activeProduct = [...findCollection?.activeProducts];
    const filterdata = activeProduct?.filter((ite) => ite !== productId);
    await Collection.findOneAndUpdate(
      { title: collectiontitle },
      {
        activeProducts: filterdata,
      }
    );
    console.log("-->", {
      productId,
      collectiontitle,
      filterdata,
      productId,
      activeProduct: activeProduct[0],
    });

    res.status(200).json({ message: "delete data suuccesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
  getProductsByCollectionSlug,
  getProductsByFilter,
  getSearchProducts,
  deleteFakeProducts,
  getProductBySlug,
  getProductVariants,
  editProductVariant,
  getVendorProducts,
  alterApproval,
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
};
