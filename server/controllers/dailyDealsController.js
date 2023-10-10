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

module.exports = {
  createModal,
};
