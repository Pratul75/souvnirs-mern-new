const CollectionCondition = require("../schema/collectionConditionsModal");

// Create a new CollectionCondition
const createCollectionCondition = async (req, res) => {
  try {
    const collectionCondition = new CollectionCondition(req.body);
    await collectionCondition.save();
    res.status(201).json(collectionCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all CollectionConditions
const getAllCollectionConditions = async (req, res) => {
  try {
    const collectionConditions = await CollectionCondition.find();
    res.status(200).json(collectionConditions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single CollectionCondition by ID
const getCollectionConditionById = async (req, res) => {
  try {
    const collectionCondition = await CollectionCondition.findById(
      req.params.id.substring(1)
    );
    if (!collectionCondition) {
      return res.status(404).json({ error: "CollectionCondition not found" });
    }
    res.json(collectionCondition);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a CollectionCondition by ID
const updateCollectionConditionById = async (req, res) => {
  try {
    const existingCC = await CollectionCondition.findById(
      req.params.id.substring(1)
    );
    // const collectionCondition = await CollectionCondition.findByIdAndUpdate(
    //   req.params.id.substring(1),
    //   req.body,
    //   { new: true }
    // );
    if (!existingCC) {
      return res.status(404).json({ error: "CollectionCondition not found" });
    }
    const { title, status, conditionValues } = req.body;
    existingCC.title = title ?? existingCC.title;
    existingCC.status = status ?? existingCC.status;
    let upCV = conditionValues.map((val) => val.value);
    existingCC.conditionValues = upCV;
    const updatedCC = existingCC.save();
    res.status(200).json(updatedCC);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a CollectionCondition by ID
const deleteCollectionCondition = async (req, res) => {
  try {
    const collectionCondition = await CollectionCondition.findByIdAndDelete(
      req.params.id.substring(1)
    );
    if (!collectionCondition) {
      return res.status(404).json({ error: "CollectionCondition not found" });
    }
    res.json({ message: "CollectionCondition deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCollectionCondition,
  getAllCollectionConditions,
  getCollectionConditionById,
  deleteCollectionCondition,
  updateCollectionConditionById,
};
