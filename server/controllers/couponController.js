const CouponModal = require("../schema/couponModal");

// Controller to create a new coupon
const createModal = async (req, res) => {
  try {
    const newCoupon = new CouponModal(req.body);
    const savedCoupon = await newCoupon.save();
    res.status(201).json(savedCoupon);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await CouponModal.find();
    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get a specific coupon by ID
const getCouponById = async (req, res) => {
  try {
    const coupon = await CouponModal.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to update a specific coupon by ID
const updateCouponById = async (req, res) => {
  try {
    const updatedCoupon = await CouponModal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(updatedCoupon);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to delete a specific coupon by ID
const deleteCouponById = async (req, res) => {
  try {
    const deletedCoupon = await CouponModal.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(deletedCoupon);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createModal,
  getAllCoupons,
  getCouponById,
  updateCouponById,
  deleteCouponById,
};