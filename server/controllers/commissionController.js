const Category = require("../schema/categoryModal");
const Commission = require("../schema/commissionModal"); // Import your Commission model

// Create a new commission
const createCommission = async (req, res) => {
  try {
    const commission = new Commission(req.body);
    const { categoryId, commissionType, commissionTypeValue } = req.body;
    await Category.findByIdAndUpdate(categoryId, {
      commissionType,
      commissionTypeValue,
    });
    res.status(201).json(commission);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all commissions
const getAllCommissions = async (req, res) => {
  try {
    const commissions = await Category.find({
      commissionTypeValue: { $exists: true },
    }).sort({ updatedAt: -1 });
    res.json(commissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllCommissionslist = async (req, res) => {
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
        $or: [{ name: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    const commissions = await Category.aggregate([
      {
        $match: matchQuery,
      },
      {
        $match: {
          commissionTypeValue: { $exists: true },
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

    totalData = await Category.find({
      commissionTypeValue: { $exists: true },
      ...matchQuery, // Apply the search query
    }).countDocuments();

    totalPages = Math.ceil(totalData / pageSize);
    // const commissions = await Category.find({
    //   commissionTypeValue: { $exists: true },
    // }).sort({ updatedAt: -1 });
    res.json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      commissions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read a single commission by ID
const getCommissionById = async (req, res) => {
  try {
    const commission = await Commission.findById(req.params.id);
    if (!commission) {
      return res.status(404).json({ error: "Commission not found" });
    }
    res.json(commission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a commission by ID
const updateCommissionById = async (req, res) => {
  try {
    const commission = await Category.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!commission) {
      return res.status(404).json({ error: "Commission not found" });
    }
    res.status(201).json(commission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a commission by ID
const deleteCommissionById = async (req, res) => {
  try {
    const commission = await Commission.findByIdAndRemove(req.params.id);
    if (!commission) {
      return res.status(404).json({ error: "Commission not found" });
    }
    res.status(200).json({ message: "Commission deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCommission,
  getAllCommissions,
  getCommissionById,
  updateCommissionById,
  deleteCommissionById,
  getAllCommissionslist,
};
