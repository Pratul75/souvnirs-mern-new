const Collection = require("../schema/collectionModal");
const Product = require("../schema/productModal");
const ConditionValue = require("../schema/conditionValueModal");
const { getOperator } = require("../utils");
const Vendor = require("../schema/vendorModal");
const Category = require("../schema/categoryModal");

// Create a new collection
const createCollection = async (req, res) => {
  try {
    console.log("REQUEST BODY: ", req.body);
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).json(collection);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to create collection", message: error.message });
  }
};

// Get all collections
const getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find({status: "ACTIVE"})
      .populate("conditionValue")
      .sort({ createdAt: -1 });
    res.status(200).json(collections);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve collections" });
  }
};

const getAllCollectionsList = async (req, res) => {
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
      console.log("--->", seacrhText);
      matchQuery = {
        $or: [{ title: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    // const collections = await Collection.find()
    //   .populate("conditionValue")
    //   .sort({ createdAt: -1 });
    const collections = await Collection.aggregate([
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "Condition Value",
          localField: "conditionValue",
          foreignField: "_id",
          as: "conditionValue",
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

    totalData = await Collection.find(matchQuery).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    res.status(200).json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      collections,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve collections" });
  }
};

// Get a single collection by ID
const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id.substring(1));
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve collection" });
  }
};

// Update a collection by ID
const updateCollectionById = async (req, res) => {
  // activeProducts: productId,
  try {
    const getPrevData = await Collection.findById(req.params.id.substring(1));
    let collection;
    let bodyData = req.body;
    if (getPrevData) {
      if (bodyData?.activeProducts) {
        let getPrevActiveProduct = [
          ...getPrevData.activeProducts,
          req.body.activeProducts,
        ];
        bodyData.activeProducts = getPrevActiveProduct;
      } else if (bodyData?.deactiveProducts) {
        let getPrevDeacProduct = [
          ...getPrevData.deactiveProducts,
          req.body.deactiveProducts,
        ];
        bodyData.deactiveProducts = getPrevDeacProduct;
      }
      collection = await Collection.findByIdAndUpdate(
        req.params.id.substring(1),
        bodyData,
        {
          new: true,
          runValidators: true,
        }
      );
    }
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(400).json({ error: "Failed to update collection" });
  }
};

// Delete a collection by ID
const deleteCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findByIdAndDelete(
      req.params.id.substring(1)
    );

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete collection" });
  }
};

const getRawDataForFilter = async (req, res) => {
  try {
    let { conditionsArray } = req.body; // Assuming you have the array of conditions in req.body
    let { checkAll } = req.body; // value will be any or all
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

    conditionsArray?.map((item, index) => {
      conditionsArray[index].inputValue =
        conditionsArray[index]?.selectedTitle == "Price"
          ? Number(conditionsArray[index]?.inputValue)
          : conditionsArray[index]?.inputValue;

      conditionsArray[index].selectedTitle =
        conditionsArray[index]?.selectedTitle == "Price"
          ? "price"
          : conditionsArray[index]?.selectedTitle;
    });
    // Create an array to store the filtered products
    let filteredProducts = [];
    // Create a query object with an empty $and array
    let query = {};
    console.log("_______---->", conditionsArray);
    if (checkAll == "all") {
      query.$and = [];
      for (const condition of conditionsArray) {
        let { selectedTitle, conditionValue, inputValue } = condition;

        // Query the "ConditionValue" schema to get the actual value based on conditionValue
        const actualConditionValue = await ConditionValue.findById(
          conditionValue
        );

        if (actualConditionValue) {
          // Replace the conditionValue with the actual value
          condition.conditionValue = actualConditionValue.conditionValue;

          // Get the MongoDB query keyword using the operatorString
          const operator = getOperator(condition.conditionValue);
          // Build the query object for the current condition
          let categories;
          if (selectedTitle == "category") {
            categories = await Category.find({
              name: { $regex: inputValue, $options: "i" },
            });
            const categoryIds = categories.map((c) => c._id);
            filteredProducts = await Product.find({
              categoryId: { $in: categoryIds },
            });
          }
          let vendors;
          if (selectedTitle === "vendor") {
            vendors = await Vendor.find({
              $or: [
                { firstName: { $regex: inputValue, $options: "i" } }, // Case-insensitive search in the name field
                { email: { $regex: inputValue, $options: "i" } }, // Case-insensitive search in the email field
              ],
            });
            const vendorIds = vendors.map((vendor) => vendor._id);
            if (condition.conditionValue === "contains") {
              filteredProducts = await Product.find({
                vendorId: { $in: vendorIds },
              });
            } else {
              filteredProducts = await Product.find({
                vendorId: { $nin: vendorIds },
              });
            }
            // res.json(filteredProducts);
            // return;
          }

          if (condition.conditionValue == "start with") {
            inputValue = new RegExp(`^${inputValue}`, "i");
          } else if (condition.conditionValue === "end with") {
            inputValue = new RegExp(`${inputValue}$`, "gi");
          } else if (condition.conditionValue === "contains") {
            inputValue = new RegExp(inputValue, "gi");
          } else if (condition.conditionValue === "does not contain") {
            inputValue = new RegExp(inputValue, "gi");
          }
          const conditionQuery = {
            [selectedTitle]: { [operator]: inputValue },
          };

          // Push the condition query to the $and array
          query.$and.push(conditionQuery);
        }
      }
    } else {
      query.$or = [];
      for (const condition of conditionsArray) {
        let { selectedTitle, conditionValue, inputValue } = condition;

        // Query the "ConditionValue" schema to get the actual value based on conditionValue
        const actualConditionValue = await ConditionValue.findById(
          conditionValue
        );

        if (actualConditionValue) {
          // Replace the conditionValue with the actual value
          condition.conditionValue = actualConditionValue.conditionValue;

          // Get the MongoDB query keyword using the operatorString
          const operator = getOperator(condition.conditionValue);
          // Build the query object for the current condition
          let categories;
          if (selectedTitle == "category") {
            categories = await Category.find({
              name: { $regex: inputValue, $options: "i" },
            });
            const categoryIds = categories.map((c) => c._id);
            filteredProducts = await Product.find({
              categoryId: { $in: categoryIds },
            });
          }
          let vendors;
          if (selectedTitle === "vendor") {
            vendors = await Vendor.find({
              $or: [
                { firstName: { $regex: inputValue, $options: "i" } }, // Case-insensitive search in the name field
                { email: { $regex: inputValue, $options: "i" } }, // Case-insensitive search in the email field
              ],
            });
            const vendorIds = vendors.map((vendor) => vendor._id);
            if (condition.conditionValue === "contains") {
              filteredProducts = await Product.find({
                vendorId: { $in: vendorIds },
              });
            } else {
              filteredProducts = await Product.find({
                vendorId: { $nin: vendorIds },
              });
            }
            // res.json(filteredProducts);
            // return;
          }

          if (condition.conditionValue == "start with") {
            inputValue = new RegExp(`^${inputValue}`, "i");
          } else if (condition.conditionValue === "end with") {
            inputValue = new RegExp(`${inputValue}$`, "gi");
          } else if (condition.conditionValue === "contains") {
            inputValue = new RegExp(inputValue, "gi");
          } else if (condition.conditionValue === "does not contain") {
            inputValue = new RegExp(inputValue, "gi");
          }
          const conditionQuery = {
            [selectedTitle]: { [operator]: inputValue },
          };
          // console.log("conditionQuery---->", conditionQuery);

          // Push the condition query to the $and array
          query.$or.push(conditionQuery);
        }
      }
    }

    // console.log("========>", query);
    // Make a request to the "Products" collection using the constructed query
    // filteredProducts = await Product.find({ name: { $regex: /^o/i } });
    console.log("=======================>", query);
    const someMoreProducts = await Product.aggregate([
      { $match: query },
      { $match: matchQuery },
      { $skip: skip },
      { $limit: pageSize },
    ]);
    filteredProducts = [...someMoreProducts, ...filteredProducts];
    totalData = await Product.find({
      ...query,
      ...matchQuery,
    }).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    // Return the filtered products or send a response to the client
    res.json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      filteredProducts,
    });
  } catch (error) {
    res.status(400).json({ msg: "somthing went wrong", error });
  }
};

module.exports = {
  getRawDataForFilter,
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollectionById,
  deleteCollectionById,
  getAllCollectionsList,
};
