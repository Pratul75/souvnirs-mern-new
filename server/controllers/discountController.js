const Discount = require("../schema/discountModal");

// Get all discounts
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().sort({ createdAt: -1 });
    res.status(200).json(discounts);
  } catch (error) {
    console.error("Error occurred while fetching discounts", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const getAllDiscountsList = async (req, res) => {
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
        $or: [{ title: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }

    const discounts = await Discount.aggregate([
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

    totalData = await Discount.find(matchQuery).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    // const discounts = await Discount.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      discounts,
    });
  } catch (error) {
    console.error("Error occurred while fetching discounts", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Get a discount by ID
const getDiscountById = async (req, res) => {
  const { id } = req.params;
  try {
    const discount = await Discount.findById(id);
    if (!discount) {
      return res.status(404).json({ error: "Discount not found" });
    }
    res.status(200).json(discount);
  } catch (error) {
    console.error("Error occurred while fetching the discount", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};
const getLatestDiscout = async (req, res) => {
  try {
    const discount = await Discount.find({ status: "ACTIVE" })
      .limit(1)
      .sort({ createdAt: -1 });
    res.status(200).json(discount ? discount[0] : {});
  } catch (error) {
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Create a discount
const createDiscount = async (req, res) => {
  const {
    title,
    typeTitle,
    requirementTitle,
    requirementValue,
    eligiblityTitle,
    eligiblityValue,
    totalLimit,
    usesOneTime,
    activeDate,
    activeTime,
    endDate,
    collectionId,
    productId,
    typeValue,
    categoryId,
    status,
  } = req.body;
  if (
    !activeDate ||
    !activeTime ||
    !requirementTitle ||
    !typeTitle ||
    !totalLimit
  ) {
    return res.status(400).json("Enter all required fields");
  }
  try {
    const discount = await Discount.create({
      title,
      typeTitle,
      requirementTitle,
      requirementValue,
      eligiblityTitle,
      eligiblityValue,
      totalLimit,
      usesOneTime,
      activeDate,
      activeTime,
      endDate,
      collectionId,
      productId,
      typeValue,
      categoryId,
      status,
    });

    res.status(201).json(discount);
  } catch (error) {
    console.error("Error occurred while creating the discount", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Update a discount
const updateDiscount = async (req, res) => {
  const { id } = req.params;
  const updatedDiscount = req.body;

  try {
    const discount = await Discount.findByIdAndUpdate(id, updatedDiscount, {
      new: true,
    });

    if (!discount) {
      return res.status(404).json({ error: "Discount not found" });
    }

    res.status(200).json(discount);
  } catch (error) {
    console.error("Error occurred while updating the discount", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Delete a discount
const deleteDiscount = async (req, res) => {
  const { id } = req.params;

  try {
    const discount = await Discount.findByIdAndDelete(id.substring(1));

    if (!discount) {
      return res.status(404).json({ error: "Discount not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error occurred while deleting the discount", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};


module.exports = {
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getAllDiscounts,
  getDiscountById,
  getLatestDiscout,
  getAllDiscountsList,
};
