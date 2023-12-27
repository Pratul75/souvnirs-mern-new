const Order = require("../schema/orderModal");
const Product = require("../schema/productModal");
const Customer = require("../schema/customerModal");
const Vendor = require("../schema/vendorModal");
const Refund = require("../schema/refundModal");
const { roles } = require("../utils");
const mongoose = require("mongoose");
const axios = require("axios");
const nodemailer = require("nodemailer");

const Razorpay = require("razorpay");
const cartModal = require("../schema/cartModal");
const sendEmail = require("../services/mailing");
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
    // const page = parseInt(req.query.page) || 1;
    // const pageSize = parseInt(req.query.pageSize) || 10;
    // const seacrhText = req?.query?.seacrhText;
    // console.log("====>", pageSize, page);

    // const skip = (page - 1) * pageSize;
    // let totalData = 0,
    //   totalPages = 0;

    // let matchQuery = {};
    // if (seacrhText) {
    //   matchQuery = {
    //     $or: [{ order_status: { $regex: new RegExp(seacrhText, "i") } }],
    //   };
    // }
    if (req.role === "admin") {
      orders = await Order.find().sort({ createdAt: -1 }).populate("vendor_id");
      // orders = await Order.find().populate("vendor_id");
      // totalData = await Order.find(matchQuery).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    } else if (req.role === "vendor") {
      orders = await Order.find({ vendor_id: req.userId }).sort({
        createdAt: -1,
      });
    }
    res.json(orders);
  } catch (error) {
    res
      .status(400)
      .json({ message: error, error: "Failed to retrieve orders" });
  }
};

const recentOrder = async (req, res) => {
  try {
    let order;
    if (req?.role == "admin") {
      order = await Order.aggregate([
        // {
        //   $match: { vendorId: new mongoose.Types.ObjectId(req.userId) },
        // },
        {
          $lookup: {
            from: "vendors",
            localField: "vendor_id",
            foreignField: "_id",
            as: "vendors",
          },
        },
        {
          $unwind: "$vendors",
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
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: 10,
        },
      ]);
    } else {
      order = await Order.aggregate([
        {
          $match: { vendorId: new mongoose.Types.ObjectId(req.userId) },
        },
        {
          $lookup: {
            from: "vendors",
            localField: "vendor_id",
            foreignField: "_id",
            as: "vendors",
          },
        },
        {
          $unwind: "$vendors",
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
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $limit: 10,
        },
      ]);
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    let orders;
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
        $or: [{ order_status: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    if (req.role === "admin") {
      // orders = await Order.find().sort({ createdAt: -1 }).populate("vendor_id");
      orders = await Order.aggregate([
        {
          $match: matchQuery, // Apply the search query
        },
        // {
        //   $match: { vendorId: new mongoose.Types.ObjectId(req.userId) },
        // },
        {
          $lookup: {
            from: "vendors",
            localField: "vendor_id",
            foreignField: "_id",
            as: "vendors",
          },
        },
        {
          $unwind: "$vendors",
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
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);
      totalData = await Order.find(matchQuery).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    } else if (req.role === "vendor") {
      // orders = await Order.aggregate({ vendor_id: req.userId }).sort({
      //   createdAt: -1,
      // });
      orders = await Order.aggregate([
        {
          $match: { vendor_id: new mongoose.Types.ObjectId(req.userId) },
        },
        {
          $match: matchQuery, // Apply the search query
        },
        {
          $lookup: {
            from: "vendors",
            localField: "vendor_id",
            foreignField: "_id",
            as: "vendors",
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);
      totalData = await Order.find({
        vendor_id: req?.userId,
        ...matchQuery,
      }).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    }

    res.json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      orders,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error, error: "Failed to retrieve orders" });
  }
};

const getAllOrdersPaymentSuccess = async (req, res) => {
  try {
    let orders;
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
        $or: [
          { "vendors.firstName": { $regex: new RegExp(seacrhText, "i") } },
          { "vendors.lastName": { $regex: new RegExp(seacrhText, "i") } },
          { "customer.firstName": { $regex: new RegExp(seacrhText, "i") } },
          { "customer.lastName": { $regex: new RegExp(seacrhText, "i") } },
        ],
      };
    }
    if (req.role === "admin") {
      // orders = await Order.find().sort({ createdAt: -1 }).populate("vendor_id");
      orders = await Order.aggregate([
        {
          $match: { payment_status: "success" },
        },

        // {
        //   $match: { vendorId: new mongoose.Types.ObjectId(req.userId) },
        // },
        {
          $lookup: {
            from: "customers",
            foreignField: "_id",
            localField: "customer_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $lookup: {
            from: "vendors",
            foreignField: "_id",
            localField: "vendor_id",
            as: "vendors",
          },
        },
        {
          $unwind: "$vendors",
        },
        {
          $match: matchQuery, // Apply the search query
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);
      totalData = await Order.aggregate([
        {
          $match: { payment_status: "success" },
        },

        // {
        //   $match: { vendorId: new mongoose.Types.ObjectId(req.userId) },
        // },
        {
          $lookup: {
            from: "customers",
            foreignField: "_id",
            localField: "customer_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $lookup: {
            from: "vendors",
            foreignField: "_id",
            localField: "vendor_id",
            as: "vendors",
          },
        },
        {
          $unwind: "$vendors",
        },
        {
          $match: matchQuery, // Apply the search query
        },
      ]);
      totalPages = Math.ceil(totalData.length / pageSize);
    } else if (req.role === "vendor") {
      orders = await Order.find({ vendor_id: req.userId }).sort({
        createdAt: -1,
      });
    }

    res.json({
      message: "get data successfully",
      totalData: totalData.length,
      page,
      totalPages,
      orders,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error, error: "Failed to retrieve orders" });
  }
};

const customerPaymentdata = async (req, res) => {
  try {
    if (req?.role == "customer") {
      let orders = await Order.aggregate([
        {
          $match: { customer_id: new mongoose.Types.ObjectId(req.userId) },
        },
        {
          $lookup: {
            from: "customers",
            foreignField: "_id",
            localField: "customer_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
      ]);
      res.status(200).json(orders);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getShippedOrders = async (req, res) => {
  try {
    let orders;
    if (req.role === "admin") {
      orders = await Order.find({ order_status: "shipped" })
        .sort({ createdAt: -1 })
        .populate("vendor_id");
    } else if (req.role === "vendor") {
      orders = await Order.find({
        vendor_id: req.userId,
        order_status: "shipped",
      }).sort({
        createdAt: -1,
      });
    }
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve orders" });
  }
};

const getShippedOrdersList = async (req, res) => {
  try {
    let orders;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;

    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;

    let matchQuery = {};
    if (seacrhText) {
      matchQuery = {
        $or: [
          { "vendor_id.firstName": { $regex: new RegExp(seacrhText, "i") } },
          { "vendor_id.lastName": { $regex: new RegExp(seacrhText, "i") } },
          { "customer.firstName": { $regex: new RegExp(seacrhText, "i") } },
          { "customer.lastName": { $regex: new RegExp(seacrhText, "i") } },
        ],
      };
    }
    if (req.role === "admin") {
      // orders = await Order.find({ order_status: "shipped" })
      //   .sort({ createdAt: -1 })
      //   .populate("vendor_id");
      console.log("+++> ", req?.role);
      orders = await Order.aggregate([
        { $match: { order_status: "shipped" } },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "customers",
            foreignField: "_id",
            localField: "customer_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $lookup: {
            from: "vendors",
            foreignField: "_id",
            localField: "vendor_id",
            as: "vendor_id",
          },
        },
        {
          $unwind: "$vendor_id",
        },

        {
          $match: matchQuery,
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: pageSize,
        },
      ]);
      totalData = await Order.find({
        order_status: "shipped",
        ...matchQuery,
      }).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    } else if (req.role === "vendor") {
      // orders = await Order.find({
      //   vendor_id: req.userId,
      //   order_status: "shipped",
      // }).sort({
      //   createdAt: -1,
      // });
      orders = await Order.aggregate([
        {
          $match: { vendor_id: new mongoose.Types.ObjectId(req.body.userId) },
        },
        { $match: { order_status: "shipped" } },
        {
          $lookup: {
            from: "customers",
            foreignField: "_id",
            localField: "customer_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $lookup: {
            from: "vendors",
            foreignField: "_id",
            localField: "vendor_id",
            as: "vendor_id",
          },
        },
        {
          $unwind: "$vendor_id",
        },
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
      totalData = await Order.find({
        vendor_id: req.userId,
        order_status: "shipped",
        ...matchQuery,
      }).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    }
    res.json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      orders,
    });
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve orders" });
  }
};

const getReplaceOrders = async (req, res) => {
  try {
    let orders;
    if (req.role === "admin") {
      orders = await Order.find({ order_status: "replace" })
        .populate("customer_id")
        .populate("product_id")
        .sort({ createdAt: -1 })
        .populate("vendor_id");
    } else if (req.role === "vendor") {
      orders = await Order.find({
        vendor_id: req.userId,
        order_status: "replace",
      }).sort({
        createdAt: -1,
      });
    }
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve orders" });
  }
};

const getReplaceOrdersList = async (req, res) => {
  try {
    let orders;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;
    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;

    let matchQuery = {};
    if (seacrhText) {
      console.log("--->", seacrhText);
      matchQuery = {
        $or: [
          { "customer_id.firstName": { $regex: new RegExp(seacrhText, "i") } },
          { "customer_id.lastName": { $regex: new RegExp(seacrhText, "i") } },
          { "product_id.name": { $regex: new RegExp(seacrhText, "i") } },
          { courier_id: { $regex: new RegExp(seacrhText, "i") } },
        ],
      };
    }
    if (req.role === "admin") {
      // orders = await Order.find({ order_status: "replace" })
      //   .populate("customer_id")
      //   .populate("product_id")
      //   .sort({ createdAt: -1 })
      //   .populate("vendor_id");
      orders = await Order.aggregate([
        { $match: { order_status: "replace" } },
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer_id",
          },
        },
        {
          $unwind: "$customer_id",
        },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product_id",
          },
        },
        {
          $unwind: "$product_id",
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
        {
          $match: matchQuery,
        },
      ]);

      totalData = await Order.aggregate([
        { $match: { order_status: "replace" } },
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer_id",
          },
        },
        {
          $unwind: "$customer_id",
        },
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product_id",
          },
        },
        {
          $unwind: "$product_id",
        },
        {
          $match: matchQuery,
        },
      ]);
      totalPages = Math.ceil(totalData.length / pageSize);
    } else if (req.role === "vendor") {
      orders = await Order.find({
        vendor_id: req.userId,
        order_status: "replace",
      }).sort({
        createdAt: -1,
      });
    }
    res.json({
      message: "get data successfully",
      totalData: totalData.length,
      page,
      totalPages,
      orders,
    });
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
    if (req.body?.order_status == "refund") {
      let OrdeDetails = await Order.findById(req.params.id.substring(1));
      console.log(OrdeDetails);
      await Refund.create({
        orderId: OrdeDetails?._id,
        refundDetails: [
          {
            productId: OrdeDetails?.product_id,
            quantity: OrdeDetails?.quantity,
            price: OrdeDetails?.price,
          },
        ],
        totalPrice: OrdeDetails?.total_price,
        status: "PENDING",
      });
    }
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update order", error });
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
      amount: 1 * 100, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
      // 1 for automatic capture // 0 for manual capture
    };
    // const options = {
    //   amount: totalSum * 100, // amount == Rs 10
    //   currency: "INR",
    //   receipt: "receipt#1",
    //   payment_capture: 1,
    //   // 1 for automatic capture // 0 for manual capture
    // };
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
      `https://${process.env.RAZOR_PAY_KEY_ID}:FyiZ6gn5TDRQjzCWYAPhCbao@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
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
      allOrders = await Order.find();
    } else if (req.role === "vendor") {
      allOrders = await Order.find({ vendor_id: req.userId });
    } else if (req.role === "customer") {
      allOrders = await Order.aggregate([
        // {
        //   $lookup: {
        //     from: "vendors",
        //     localField: "vendor_id",
        //     foreignField: "_id",
        //     as: "vendors",
        //   },
        // },
        // {
        //   $unwind: "$vendors",
        // },
        {
          $match: {
            customer_id: new mongoose.Types.ObjectId(req?.userId),
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
          $unwind: "$product",
        },
        {
          $lookup: {
            from: "addresses",
            localField: "address_id",
            foreignField: "_id",
            as: "address",
          },
        },
        {
          $unwind: "$address",
        },
        {
          $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customer",
          },
        },
        {
          $unwind: "$customer",
        },
        {
          $sort: { createdAt: -1 },
        },
      ]);
      return res.status(200).json(allOrders);
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

const OrderByInvoice = async (req, res) => {
  try {
    console.log(req?.body);
    const { inviceId, id } = req?.body;
    const oderdetails = await Order.findOne({
      _id: new mongoose.Types.ObjectId(id),
      invoice_id: inviceId,
    })
      .populate("product_id")
      .populate("vendor_id")
      .populate("address_id");
    res.status(200).json(oderdetails);
    // console.log(oderdetails);
  } catch (error) {
    res.status(500).json(error);
  }
};

const get_orderCunt = async (req, res) => {
  try {
    const { takeBy } = req.query;
    const sevenDaysAgo = new Date();
    let data = {};
    let query;
    if (req?.role == "admin") {
      if (takeBy == "week") {
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "ordered",
        };
        const PendingOrder = await Order.find(query).countDocuments();
        data.PendingOrder = PendingOrder;

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "delivered",
        };
        const completed_order = await Order.find(query).countDocuments();
        data.completedOrder = completed_order;

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          payment_status: "pending",
        };
        const payment_Pending = await Order.find(query).countDocuments();
        data.paymentPending = payment_Pending;

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          payment_status: "success",
        };
        const totalSales = await Order.find(query).countDocuments();
        data.totalSales = totalSales;

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "delivered",
        };
        const deliveredOrder = await Order.find(query).countDocuments();

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "processing",
        };
        const OnGoingOrder = await Order.find(query).countDocuments();

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "delivered",
        };
        const TotalSales = await Order.aggregate([
          {
            createdAt: {
              $gte: sevenDaysAgo,
              $lte: new Date(), // Today's date
            },
          },
          {
            $group: {
              _id: null,
              totalPaidSum: { $sum: "$total_paid" },
            },
          },
        ]);

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "shipped",
        };
        const ShippedData = await Order.find(query).countDocuments();
        data.deliveredOrder = deliveredOrder;
        data.OnGoingOrder = OnGoingOrder;
        data.ShippedData = ShippedData;
        data.TotalSales = TotalSales[0]?.totalPaidSum;
      } else if (takeBy == "month") {
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30);
        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "ordered",
        };
        const PendingOrder = await Order.find(query).countDocuments();
        data.PendingOrder = PendingOrder;

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "delivered",
        };
        const completed_order = await Order.find(query).countDocuments();
        data.completedOrder = completed_order;

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          payment_status: "pending",
        };
        const payment_Pending = await Order.find(query).countDocuments();
        data.paymentPending = payment_Pending;

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          payment_status: "success",
        };
        const totalSales = await Order.find(query).countDocuments();
        data.totalSales = totalSales;

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "delivered",
        };
        const deliveredOrder = await Order.find(query).countDocuments();

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "processing",
        };
        const OnGoingOrder = await Order.find(query).countDocuments();

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "delivered",
        };
        const TotalSales = await Order.aggregate([
          {
            createdAt: {
              $gte: sevenDaysAgo,
              $lte: new Date(), // Today's date
            },
          },
          {
            $group: {
              _id: null,
              totalPaidSum: { $sum: "$total_paid" },
            },
          },
        ]);

        query = {
          createdAt: {
            $gte: sevenDaysAgo,
            $lte: new Date(), // Today's date
          },
          order_status: "shipped",
        };
        const ShippedData = await Order.find(query);
        data.deliveredOrder = deliveredOrder;
        data.OnGoingOrder = OnGoingOrder;
        data.ShippedData = ShippedData;
        data.TotalSales = TotalSales[0]?.totalPaidSum;
      } else {
        // sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 365);
        query = {
          order_status: "ordered",
        };
        const PendingOrder = await Order.find(query).countDocuments();
        data.PendingOrder = PendingOrder;

        query = {
          order_status: "delivered",
        };
        const completed_order = await Order.find(query).countDocuments();
        data.completedOrder = completed_order;

        query = {
          payment_status: "pending",
        };
        const payment_Pending = await Order.find(query).countDocuments();
        data.paymentPending = payment_Pending;

        query = {
          payment_status: "success",
        };
        const totalSales = await Order.find(query).countDocuments();
        data.totalSales = totalSales;

        query = {
          order_status: "delivered",
        };
        const deliveredOrder = await Order.find(query).countDocuments();

        query = {
          order_status: "processing",
        };
        const OnGoingOrder = await Order.find(query).countDocuments();

        query = {
          order_status: "delivered",
        };
        const TotalSales = await Order.aggregate([
          {
            $group: {
              _id: null,
              totalPaidSum: { $sum: "$total_paid" },
            },
          },
        ]);

        query = {
          order_status: "shipped",
        };
        const ShippedData = await Order.find(query).countDocuments();
        data.deliveredOrder = deliveredOrder;
        data.OnGoingOrder = OnGoingOrder;
        data.ShippedData = ShippedData;
        data.TotalSales = TotalSales[0]?.totalPaidSum;
      }
    }

    res.status(200).json(data);
  } catch (error) {}
};

const sendQueryByUser = async (req, res) => {
  try {
    const {
      type,
      qty,
      reason,
      customer_id,
      invoice_id,
      orderId,
      productId,
      vendor_id,
    } = req?.body;
    const findVendor = await Vendor.findById(vendor_id);
    const findOrder = await Order.findById(orderId);
    const findProduct = await Product.findById(productId);
    const findCustomer = await Customer.findById(customer_id);

    const userEmail = findCustomer?.email;
    const userName = findCustomer?.firstName + " " + findCustomer?.lastName;
    const adminEmail = "maria@souvnirs.com";
    const vendorEmail = findVendor?.email;
    const vendorname = findVendor?.email;
    const HtmlContentVendor = `<body>
    <h1>Received Query from Customer Side!</h1>
    <hr/>
    <br/>
    <p>Oder Id : ${orderId}</p>
    <p>Tracking Id: ${findOrder?.courier_id}</p>
    <p>product name : ${findProduct?.name}</p>
    <p>Quantity : ${qty}</p>
    <p>Reason : ${reason}</p>
    <br/>
    <br/>
    <h5>Thank You</h5>
    </body>`;
    const HtmlContentAdmin = `<body>
    <h1>Received Query from Customer Side!</h1>
    <hr/>
    <h4>Customer ${userName} request for ${type}</h4>
    <br/>
    <p>Oder Id : ${orderId}</p>
    <p>Tracking Id: ${findOrder?.courier_id}</p>
    <p>product name : ${findProduct?.name}</p>
    <p>Customer Email : ${userEmail}</p>
    <p>Quantity : ${qty}</p>
    <p>Reason : ${reason}</p>
    <p>Vendor Email : ${vendorEmail}</p>
    <p>Customer Email : ${vendorname}</p>
    <br/>
    <br/>
    <h5>Thank You</h5>
    </body>`;
    const HtmlContentUser = `<body>
    <h2>Your Query submit succefully!</h2>
    <br/>
    <br/>
    <h5>Thank You</h5>
    </body>`;
    sendMail(
      adminEmail,
      adminEmail,
      `Customer Query for ${type}`,
      HtmlContentAdmin
    );
    sendMail(
      adminEmail,
      vendorEmail,
      `Customer Query for ${type}`,
      HtmlContentVendor
    );
    sendMail(
      adminEmail,
      userEmail,
      `Submit Query for ${type}`,
      HtmlContentUser
    );
    // console.log({
    //   body: req?.body,
    //   findVendor,
    //   findOrder,
    //   findProduct,
    //   findCustomer,
    // });

    res.status(200).json({ message: "Query send Success!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pratul.udainiya@rechargestudio.com",
    pass: "recharge123@",
  },
});

const sendMail = async (from, to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: from ? from : "maria@souvnirs.com",
      to: to,
      subject: subject,
      html: htmlContent,
    };
    const response = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

const getRefundDetailsUser = async (req, res) => {
  try {
    const showdata = await Order.aggregate([
      {
        $match: {
          customer_id: new mongoose.Types.ObjectId(req?.userId),
          order_status: "refund",
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
        $unwind: "$product",
      },
    ]);
    res.status(200).json(showdata);
  } catch (error) {
    res.status(500).json({ error: error?.message });
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
  getShippedOrders,
  getReplaceOrders,
  getAllOrders,
  getShippedOrdersList,
  getReplaceOrdersList,
  getAllOrdersPaymentSuccess,
  OrderByInvoice,
  get_orderCunt,
  recentOrder,
  sendQueryByUser,
  customerPaymentdata,
  getRefundDetailsUser,
};
