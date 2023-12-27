const { response } = require("express");
const Category = require("../schema/categoryModal");
const Product = require("../schema/productModal");
const Order = require("../schema/orderModal");

const csv = require("csv-parser");
const fs = require("fs");
const xlsx = require("xlsx");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { default: mongoose } = require("mongoose");

// add new category
const addCategory = async (req, res) => {
  try {
    const { name, hsn_code, description, attributes, parentId, type } =
      req.body;
    if (req.body.parentId) {
      const Parent = await Category.findById(req.body.parentId);
      console.log("categoryController.js", Parent.attributes);
      const category = new Category({
        name,
        hsn_code,
        Description: description,
        parentId,
        type,
        attributes: [...Parent.attributes, ...req.body.attributes],
      });
      await category.save();
      return res.status(201).json(category);
      console.log("categoryController.js", Parent);
    } else {
      const category = new Category({ ...req.body });
      await category.save();
      res.status(201).json(category);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categoryList = await Category.find({ status: "ACTIVE" });
    res.status(200).json(categoryList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCategorieslist = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;
    console.log("====>", pageSize, page);

    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;

    let matchQuery = {};
    if (seacrhText) {
      matchQuery = {
        $or: [{ name: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    const categoryList = await Category.aggregate([
      {
        $match: matchQuery, // Apply the search query
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: pageSize,
      },
    ]);
    totalData = await Category.find(matchQuery).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    console.log("CATEGORY LIST: ", categoryList);

    res.status(200).json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      categoryList,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get category by id
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    console.log("SELECTED CATEGORY: ", category);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update category
const updateCategory = async (req, res) => {
  try {
    const existingCategory = await Category.findById(req.params.id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { attributes } = req.body;
    await Category.findByIdAndUpdate(req.params.id, {
      attributes: [...attributes],
    });
    const existingAttributeIds = existingCategory.attributes.map((attr) =>
      attr.toString()
    );
    const { name, hsn_code, status, type } = req.body;

    // Check if each attribute ID is already present in the attributes array
    // const duplicateAttributeIds = attributes.filter((attrId) =>
    //   existingAttributeIds.includes(attrId)
    // );

    // if (duplicateAttributeIds.length > 0) {
    //   return res.status(400).json({
    //     message: "Duplicate attribute IDs found",
    //     duplicateAttributeIds,
    //   });
    // }

    // Remove duplicates in the attributes array before updating
    const uniqueAttributes = attributes.filter(
      (attrId, index) => attributes.indexOf(attrId) === index
    );

    (existingCategory.name = name ?? existingCategory.name),
      (existingCategory.hsn_code = hsn_code ?? existingCategory.hsn_code),
      (existingCategory.status = status ?? existingCategory.status),
      (existingCategory.type = type ?? existingCategory.type),
      (existingCategory.attributes =
        existingCategory.attributes.concat(uniqueAttributes));
    const updatedCategory = await existingCategory.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log("categoryController.js", error);
    res.status(400).json({ error: error.message });
  }
};

// Remove an attribute ID from a category
// can create specific api in future if required
const removeAttributeFromCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId.substring(1);
    const attributeId = req.params.attributeId.substring(1);

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Find the index of the attribute ID in the attributes array
    const attributeIndex = category.attributes.indexOf(attributeId);
    if (attributeIndex === -1) {
      return res
        .status(404)
        .json({ message: "Attribute ID not found in the category" });
    }

    // Remove the attribute ID from the attributes array
    category.attributes.splice(attributeIndex, 1);

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id.substring(1);
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      res.status(400).json({ message: "No cateogry found" });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getParentCategories = async (req, res) => {
  const categories = await Category.find({ parentId: "0" });
  res.status(200).json(categories);
};

const UpdateStatus = async (req, res) => {
  const existingCategory = await Category.findById(req.params.id);
  if (!existingCategory) {
    return res.status(404).json({ message: "Category not found" });
  } else {
    const updateStatus = await Category.findByIdAndUpdate(
      req.params.id,
      req?.body
    );
    res.status(200).json(updateStatus);
  }
};

// const bulkUpdateAndUploadcategory = async (req, res) => {
//   try {
//   } catch (error) {}
// };

const isCSV = (filePath) => {
  return path.extname(filePath).toLowerCase() === ".csv";
};

const bulkCategoryUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
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
    let allData = [];
    jsonData.reduce((acc, item) => {
      allData.push(item);
    });
    let newData = allData.map((obj) => {
      let newObj = {};
      Object.keys(obj).forEach((key) => {
        newObj[key.replace(/\s/g, "")] = obj[key];
      });
      return newObj;
    });
    newData?.map(async (item, index) => {
      const findCategory = await Category.findOne({
        name: String(item?.CategoryName),
      });
      if (findCategory) {
        const findUpdateCategory = await Category.findByIdAndUpdate(
          findCategory?._id,
          {
            hsn_code: item?.HSN,
            commissionType: "PERCENTAGE",
            commissionTypeValue: item?.CommissionRate,
            gst_value: item?.GST,
            gst_type: "PERCENTAGE",
          }
        );
      } else {
        await Category.create({
          name: String(item?.CategoryName),
          hsn_code: item?.HSN,
          commissionType: "PERCENTAGE",
          commissionTypeValue: item?.CommissionRate,
          gst_value: item?.GST,
          gst_type: "PERCENTAGE",
        });
      }
    });
    // console.log(groupedData);
    res.status(200).json({
      message: "Category upadate and create successfully",
      data: newData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryByProduct = async (req, res) => {
  try {
    const { productId } = req.query;
    const OrderDetails = await Order.findById(productId);
    const findProduct = await Product.findById(OrderDetails?.product_id);
    console.log("---<", OrderDetails, findProduct, productId);
    const findCate = await Category.findById(findProduct?.categoryId); //"64c372f745f9bafaacbcf5b4"
    res.status(200).json(findCate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;
    const getData = await Product.find({
      categoryId: new mongoose.Types.ObjectId(id),
    })
      .skip(skip)
      .limit(pageSize);
    totalData = await Product.find({
      categoryId: new mongoose.Types.ObjectId(id),
    }).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    res.status(200).json({ data: getData, totalPages, totalData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductFromCategory = async (req, res) => {
  try {
    const { categoryId, productId } = req?.query;
    const findproduct = await Product.findById(productId);
    if (findproduct) {
      const delteData = await Product.findByIdAndUpdate(productId, {
        $unset: { categoryId: 1 },
      });
      res.status(200).json({ message: "delet succefully" });
    } else {
      res.status(400).json({ message: "data not found" });
    }
  } catch (error) {
    res.status(200).json({ message: error?.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  removeAttributeFromCategory,
  getParentCategories,
  UpdateStatus,
  getAllCategorieslist,
  bulkCategoryUpload,
  getCategoryByProduct,
  getCategoryDetails,
  deleteProductFromCategory,
};
