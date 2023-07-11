const Cart = require("../schema/cartModal");

// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.json(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).json({ error: "Internal server error" });
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
    res.json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
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
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addCart, getAllCarts, getCartById, deleteCart, updateCart };
