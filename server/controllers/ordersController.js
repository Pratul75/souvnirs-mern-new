const Order = require("../schema/orderModal");
const Product = require("../schema/productModal");
const Customer = require("../schema/customerModal");
const Vendor = require("../schema/vendorModal");
// Create a new order
const addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
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
    res.status(500).json({ error: "Failed to retrieve order" });
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
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
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
    res.status(500).json({ error: "Failed to delete order" });
  }
};

// total sales
const getTotalSales = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalAmount = orders.reduce(
      (sum, order) => sum + order.total_paid,
      0
    );
    res.json({ totalSales: totalAmount });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};

// total orders count
const getTotalOrders = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders: totalOrders });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve total orders" });
  }
};

// order table data
// this api is specific to ui for admin dashboard

const getOrderTableData = async (req, res) => {
  try {
    const allOrders = await Order.find({});

    const orderData = await Promise.all(
      allOrders.map(async (order) => {
        const { product_id, vendor_id, customer_id, price, invoice_id } = order;

        const product = await Product.findById(product_id);
        const vendor = await Vendor.findById(vendor_id);
        const customer = await Customer.findById(customer_id);

        const productName = product ? product.name : "N/A";
        const vendorName = vendor ? vendor.firstName : "N/A";
        const customerName = customer ? customer.firstName : "N/A";

        return {
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
    res.status(500).json({ error: "Failed to retrieve order table data" });
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
};
