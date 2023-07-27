const Discount = require("../schema/discountModal");

// Get all discounts
const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (error) {
    console.error("Error occurred while fetching discounts", error);
    res.status(400).json({ error: "Internal server error" });
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
    res.status(400).json({ error: "Internal server error" });
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
    categoryId,
    status,
  } = req.body;

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
      categoryId,
      status,
    });

    res.status(201).json(discount);
  } catch (error) {
    console.error("Error occurred while creating the discount", error);
    res.status(400).json({ error: "Internal server error" });
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
    res.status(400).json({ error: "Internal server error" });
  }
};

// Delete a discount
const deleteDiscount = async (req, res) => {
  const { id } = req.params;

  try {
    const discount = await Discount.findByIdAndDelete(id);

    if (!discount) {
      return res.status(404).json({ error: "Discount not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error occurred while deleting the discount", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

module.exports = {
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getAllDiscounts,
  getDiscountById,
};
