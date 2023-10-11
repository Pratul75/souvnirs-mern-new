const DailyDealModal = require("../schema/dailyDealsModel");

// Controller to create a new coupon
const createModal = async (req, res) => {
  try {
    const newCoupon = new DailyDealModal(req.body);
    const savedCoupon = await newCoupon.save();
    res.status(201).json(savedCoupon);
  } catch (err) {
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const getModalData = async (req, res) => {
  try {
    const modelData = await DailyDealModal.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "CategoriesData",
        },
      },
      // {
      //   $unwind: "$CategoriesData",
      // },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productsData",
        },
      },
      // {
      //   $unwind: "$productsData",
      // },
      {
        $lookup: {
          from: "collections",
          localField: "collectionId",
          foreignField: "_id",
          as: "callectionsData",
        },
      },
      // {
      //   $unwind: "$callectionsData",
      // },
      {
        $group: {
          _id: "$_id",
          categoryId: { $addToSet: "$CategoriesData" },
          productId: { $addToSet: "$productsData" },
          collectionId: { $addToSet: "$callectionsData" },
          title: { $first: "$title" },
          requirementTitle: { $first: "$requirementTitle" },
          requirementValue: { $first: "$requirementValue" },
          totalLimit: { $first: "$totalLimit" },
          typeTitle: { $first: "$typeTitle" },
          typeValue: { $first: "$typeValue" },
          combinations: { $first: "$combinations" },
          status: { $first: "$status" },
          activeDate: { $first: "$activeDate" },
          activeTime: { $first: "$activeTime" },
          total_time: { $first: "$total_time" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
    ]);
    res.status(201).json(modelData);
  } catch (err) {
    console.log("err", err.message);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

module.exports = {
  createModal,
  getModalData,
};
