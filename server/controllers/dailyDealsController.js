const mongoose = require("mongoose");
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
          endDate: { $first: "$endDate" },
          endTime: { $first: "$endTime" },
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

const getDailyDealsData = async (req, res) => {
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
          endDate: { $first: "$endDate" },
          endTime: { $first: "$endTime" },
          total_time: { $first: "$total_time" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
        },
      },
      {
        $match: matchQuery,
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
    totalData = await DailyDealModal.find(matchQuery).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    res.status(201).json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      modelData,
    });
  } catch (err) {
    console.log("err", err.message);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const checkProductList = async (req, res) => {
  try {
    console.log("req.query.productId", req.query.productId);
    const productData = await DailyDealModal.find({
      productId: new mongoose.Types.ObjectId(req.query.productId),
    });
    if (productData.length > 0) {
      res.status(200).json({ success: true, data: productData });
    } else {
      res.status(200).json({ success: false, data: productData });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createModal,
  getModalData,
  getDailyDealsData,
  checkProductList,
};
