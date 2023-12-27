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
    const collectionConditions = await CollectionCondition.aggregate([
      {
        $lookup: {
          from: "condition values",
          localField: "conditionValues",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $project: {
          "result.conditionValue": 1,
          title: 1,
          status: 1,
        },
      },
    ]);
    res.status(200).json(collectionConditions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCollectionConditionsList = async (req, res) => {
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

    const collectionConditions = await CollectionCondition.aggregate([
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "condition values",
          localField: "conditionValues",
          foreignField: "_id",
          as: "result",
        },
      },
      {
        $project: {
          "result.conditionValue": 1,
          title: 1,
          status: 1,
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

    totalData = await CollectionCondition.find(matchQuery).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    res.status(200).json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      collectionConditions,
    });
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
  getAllCollectionConditionsList,
};
