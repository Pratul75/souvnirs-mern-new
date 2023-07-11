const Refund = require("../schema/refundModal");
const Product = require("../schema/productModal");

// Get all refunds
const getAllRefunds = async (req, res) => {
  try {
    const refunds = await Refund.find();
    res.status(200).json(refunds);
  } catch (error) {
    console.error("Error fetching refunds:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a specific refund by ID
const getRefundById = async (req, res) => {
  try {
    const refund = await Refund.findById(req.params.id.substring(1));
    if (!refund) {
      return res.status(404).json({ error: "Refund not found" });
    }
    res.json(refund);
  } catch (error) {
    console.error("Error fetching refund:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new refund
const addRefund = async (req, res) => {
  try {
    const { orderId, productId, quantity, price, totalPrice, status } =
      req.body;

    // Retrieve product information based on productId
    const products = await Product.find({ _id: { $in: productId } });
    if (products.length !== productId.length) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const refund = new Refund({
      orderId,
      productId,
      quantity,
      price,
      totalPrice,
      status,
    });

    const savedRefund = await refund.save();
    res.status(201).json(savedRefund);
  } catch (error) {
    console.error("Error creating refund:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update an existing refund
const updateRefund = async (req, res) => {
  try {
    const { orderId, productId, quantity, price, totalPrice, status } =
      req.body;

    // Retrieve product information based on productId
    const products = await Product.find({ _id: { $in: productId } });
    if (products.length !== productId.length) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const refund = await Refund.findByIdAndUpdate(
      req.params.id.substring(1),
      {
        orderId,
        productId,
        quantity,
        price,
        totalPrice,
        status,
      },
      { new: true }
    );
    if (!refund) {
      return res.status(404).json({ error: "Refund not found" });
    }
    res.json(refund);
  } catch (error) {
    console.error("Error updating refund:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a refund
const deleteRefund = async (req, res) => {
  try {
    const refund = await Refund.findByIdAndDelete(req.params.id.substring(1));
    if (!refund) {
      return res.status(404).json({ error: "Refund not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting refund:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addRefund,
  updateRefund,
  deleteRefund,
  getAllRefunds,
  getRefundById,
};
