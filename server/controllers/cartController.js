const { default: mongoose } = require("mongoose");
const Cart = require("../schema/cartModal");
const { response } = require("express");
const AttributeType = require("../schema/attributeTypeModal");

// Get all carts
const getAllCarts = async (req, res) => {
  try {
    const { role } = req;
    let carts;
    if (role === "admin") {
      carts = await Cart.aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: {
            path: "$customer",
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
        // {
        //   $project: {
        //     name: {
        //       $concat: ["$customer.firstName", "  ", "$customer.lastName"],
        //     },
        //     product_name: 1,
        //     customer_id: 1,
        //     product_quantity: 1,
        //     product_price: 1,
        //   },
        // },
      ]);
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
      carts = await Cart.find({ customer_id: req.userId });
    }
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    await Cart.create({
      product_id: productId,
      quantity: +quantity,
      customer_id: req.userId,
    });
    res.status(200).json("added to cart");
  } catch (e) {
    res.status(400).json("something went wrong");
  }
};
const getMycartItems = async (req, res) => {
  try {
    const carts = await Cart.find({
      customer_id: req.userId,
      checkedOut: false,
    }).populate("product_id");
    res.status(200).json(carts);
  } catch (e) {
    res.status(400).json("something went wrong");
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
    res.status(400).json({ error: "somthing went wrong" });
  }
};

// Create a new cart
const createCustomerCart = async (req, res) => {
  try {
    const { userId } = req;
    const { productId, quantity, variant } = req.body;

    const Variant = await AttributeType.findOne({
      productId,
      variant,
    });
    if (variant) {
      const created = await Cart.findOneAndUpdate(
        {
          customer_id: userId,
          product_id: productId,
          variant_id: Variant?._id,
          checkedOut: false,
        },
        {
          $inc: { product_quantity: +quantity },
        },
        { upsert: true, new: true }
      );
    } else {
      const created = await Cart.findOneAndUpdate(
        {
          customer_id: userId,
          product_id: productId,
          checkedOut: false,
        },
        {
          $inc: { product_quantity: +quantity },
        },
        { upsert: true, new: true }
      );
    }
    res.status(200).json("Cart Updated Successfully");
  } catch (e) {
    res.status(400).json("something went wrong");
  }
};
const addCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(400).json({ error: "somthing went wrong" });
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
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const checkout = async (req, res) => {
  const existingItemsInCart = await Cart.updateMany(
    {
      customer_id: req.userId,
      checkedOut: false,
    },
    {
      checkedOut: true,
    },
    { new: true }
  );
  res.status(200).json("cart updated successfully");
};

const getCheckedOutItems = async (req, res) => {
  const checkedOutItems = await Cart.find({
    customer_id: req.userId,
    checkedOut: true,
  }).populate("product_id");
  res.status(200).json(checkedOutItems);
};

// Delete a cart
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.status(200).json("deleted successfully");
  } catch (error) {
    console.error("Error deleting cart:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};
const updateCustomerCart = async (req, res) => {
  const { id, quantity } = req.body;

  const updated = await Cart.findByIdAndUpdate(
    id,
    {
      product_quantity: +quantity,
    },
    { new: true }
  );
  res.status(200).json("updated Successfully");
};

module.exports = {
  addItemToCart,
  addCart,
  getAllCarts,
  updateCustomerCart,
  getCartById,
  deleteCart,
  updateCart,
  getMycartItems,
  createCustomerCart,
  checkout,
  getCheckedOutItems,
};
