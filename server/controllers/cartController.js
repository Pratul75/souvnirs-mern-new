const { default: mongoose } = require("mongoose");
const Cart = require("../schema/cartModal");

// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const { role } = req;
    let carts;
    if (role === "admin") {
      carts = await Cart.find();
    }
    if (role === "vendor") {
      const aggregationQuery = [
        {
          $match: {
            status: "ACTIVE",
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: {
            path: "$product",
          },
        },
        {
          $match: {
            "product.vendorId": new mongoose.Types.ObjectId(req.userId),
          },
        },
      ];
      carts = await Cart.aggregate(aggregationQuery);
    }
    if (role === "customer") {
      carts = await Cart.find({ customer_id: req.userId })
    }
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

// Get a specific cart by ID
const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id.substring(1));
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

// Create a new cart
const addCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

// Update an existing cart
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id.substring(1),
      req.body,
      {
        new: true,
      }
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

// Delete a cart
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id.substring(1));
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(400).json({ error: "Internal server error" });
  }
};

module.exports = { addCart, getAllCarts, getCartById, deleteCart, updateCart };
