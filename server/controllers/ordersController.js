const Order = require("../schema/orderModal");
const Product = require("../schema/productModal");
const Customer = require("../schema/customerModal");
const Vendor = require("../schema/vendorModal");
const { roles } = require("../utils");
const axios = require("axios");

const Razorpay = require("razorpay");
const cartModal = require("../schema/cartModal");
const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: "FyiZ6gn5TDRQjzCWYAPhCbao",
});

// Create a new order
const addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: "Failed to create order" });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    let orders;
    if (req.role === "admin") {
      orders = await Order.find();
    } else if (req.role === "vendor") {
      orders = await Order.find({ vendor_id: req.userId });
    }
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve orders" });
  }
};

// Get a single order by ID
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id.substring(1));
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve order" });
  }
};

// Update an order by ID
const updateOrderById = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id.substring(1),
      req.body,
      {
        new: true,
      }
    );
    const { customerName, vendorName, productName } = req.body;
    if (customerName) {
      await Customer.findByIdAndUpdate(
        order.customer_id,
        {
          firstName: customerName.split(" ")[0],
          lastName: customerName.split(" ")[1],
        },
        { new: true }
      );
    }
    if (productName) {
      await Product.findByIdAndUpdate(order.product_id, { name: productName });
    }
    if (vendorName) {
      await Vendor.findByIdAndUpdate(order.vendor_id, {
        firstName: productName.split(" ")[0],
        lastName: productName.split(" ")[1],
      });
    }

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update order" });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id.substring(1));
    if (order) {
      res.json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to delete order" });
  }
};

// total sales
const getTotalSales = async (req, res) => {
  try {
    let orders;
    if (req.role === "admin") {
      orders = await Order.find();
      const totalAmount = orders.reduce(
        (sum, order) => sum + order.total_paid,
        0
      );
    } else if (req.role === "vendor") {
      orders = await Order.find({ vendor_id: req.userId });
      const totalAmount = orders.reduce(
        (sum, order) => sum + order.total_paid,
        0
      );
    }
    res.json({ totalSales: totalAmount });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve orders" });
  }
};

// total orders count
const getTotalOrders = async (req, res) => {
  try {
    let totalOrders;
    if (req.role === "admin") {
      totalOrders = await Order.countDocuments();
    } else if (req.role === "vendor") {
      totalOrders = await Order.find({ vendor_id: req.userId }).countDocuments;
    }
    res.json({ totalOrders: totalOrders });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve total orders" });
  }
};

const createOrder = async (req, res) => {
  try {
    const checkedOutItems = await cartModal
      .find({
        customer_id: req.userId,
        checkedOut: true,
      })
      .populate("product_id");

    const totalSum = checkedOutItems.reduce(
      (sum, item) => sum + item.product_id.price,
      0
    );

    const options = {
      amount: totalSum * 100, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
      // 1 for automatic capture // 0 for manual capture
    };
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (e) {
    res.status(400).json("something went wrong");
  }
};
const captureOrder = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.params);
    const response = await axios.post(
      `https://${process.env.RAZOR_PAY_KEY_ID}:"FyiZ6gn5TDRQjzCWYAPhCbao@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
      { amount: 10 * 10, currency: "INR" }
    );
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

// order table data
// this api is specific to ui for admin dashboard

const getOrderTableData = async (req, res) => {
  try {
    let allOrders;
    if (req.role === "admin") {
      allOrders = await Order.find({});
    } else if (req.role === "vendor") {
      allOrders = await Order.find({ vendor_id: req.userId });
    } else if (req.role === "customer") {
      allOrders = await Order.find({ customer_id: req.userId });
    }

    const orderData = await Promise.all(
      allOrders.map(async (order) => {
        const { _id, product_id, vendor_id, customer_id, price, invoice_id } =
          order;

        const product = await Product.findById(product_id);
        const vendor = await Vendor.findById(vendor_id);
        const customer = await Customer.findById(customer_id);

        const productName = product ? product.name : "N/A";
        const vendorName = vendor ? vendor.firstName : "N/A";
        const customerName = customer ? customer.firstName : "N/A";

        return {
          orderId: _id,
          invoiceId: invoice_id,
          productName,
          vendorName,
          customerName,
          price,
        };
      })
    );

    console.log("ORDER TABLE DATA: ", orderData);
    res.json(orderData);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve order table data" });
  }
};

module.exports = {
  addOrder,
  getOrder,
  getOrders,
  updateOrderById,
  deleteOrder,
  getTotalSales,
  getTotalOrders,
  getOrderTableData,
  createOrder,
  captureOrder,
};
