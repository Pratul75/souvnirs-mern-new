const Collection = require("../schema/collectionModal");
const Product = require("../schema/productModal");
const ConditionValue = require("../schema/conditionValueModal");
const { getOperator } = require("../utils");
const Vendor = require("../schema/vendorModal");

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
    const collections = await Collection.find().sort({ createdAt: -1 });
    res.status(200).json(collections);
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
  try {
    const collection = await Collection.findByIdAndUpdate(
      req.params.id.substring(1),
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
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
    const conditionsArray = req.body; // Assuming you have the array of conditions in req.body
    console.log("CONDITIONS ARRAY: ", conditionsArray);

    // Create an array to store the filtered products
    let filteredProducts = [];
    // Create a query object with an empty $and array
    const query = {
      $and: [],
    };

    for (const condition of conditionsArray) {
      let { selectedTitle, conditionValue, inputValue } = condition;

      // Query the "ConditionValue" schema to get the actual value based on conditionValue
      const actualConditionValue = await ConditionValue.findById(
        conditionValue
      );
      console.log("ACTUAL CONDITION VALUES: ", actualConditionValue);

      if (actualConditionValue) {
        // Replace the conditionValue with the actual value
        condition.conditionValue = actualConditionValue.conditionValue;

        // Get the MongoDB query keyword using the operatorString
        const operator = getOperator(condition.conditionValue);
        console.log("CONDITION OPERATOR STRING: ", condition.conditionValue);

        // Build the query object for the current condition
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
          res.json(filteredProducts);
          return;
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

    // Make a request to the "Products" collection using the constructed query
    // filteredProducts = await Product.find({ name: { $regex: /^o/i } });

    filteredProducts = await Product.find(query);

    // Return the filtered products or send a response to the client
    console.log("PRODUCTS FILTERED ARRAY: ", filteredProducts);
    res.json(filteredProducts);
  } catch (error) {
    console.error("Error occurred while filtering products", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

module.exports = {
  getRawDataForFilter,
  createCollection,
  getAllCollections,
  getCollectionById,
  updateCollectionById,
  deleteCollectionById,
};
