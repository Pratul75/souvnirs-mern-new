const { default: mongoose } = require("mongoose");
const Customer = require("../schema/customerModal");
const bcrypt = require("bcrypt");
// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      mobile,
      //   organizationName,
      //   organizationType,
      //   country,
      //   city,
      //   pincode,
      //   orderTypeInterested,
      //   otp,
      //   otpStatus,
      //   status,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobile,
      //   organizationName,
      //   organizationType,
      //   country,
      //   city,
      //   pincode,
      //   orderTypeInterested,
      //   otp,
      //   otpStatus,
      //   status,
    });

    const savedCustomer = await newCustomer.save();

    res.json({ success: true, customer: savedCustomer });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ success: false, error: "Failed to create customer" });
  }
};

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}).sort({ createdAt: -1 });
    res.json({ success: true, customers });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to get customers" });
  }
};

const getCustomersList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;
    console.log("====>", pageSize, page);

    const skip = (page - 1) * pageSize;
    let totalData = 0,
      totalPages = 0;

    let matchQuery = {};
    if (seacrhText) {
      console.log("--->", seacrhText);
      matchQuery = {
        $or: [{ firstName: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    const customers = await Customer.aggregate([
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

    totalData = await Customer.find(matchQuery).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    // const customers = await Customer.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      customers,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to get customers" });
  }
};

// Get a customer by ID
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const aggQuery = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id.substring(1)),
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "_id",
          foreignField: "customer_id",
          as: "address",
        },
      },
      {
        $unwind: {
          path: "$address",
          preserveNullAndEmptyArrays: true,
        },
      },
    ];

    const customer = await Customer.aggregate(aggQuery);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    res.json({ success: true, customer: customer[0] });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to get customer" });
  }
};

// Update a customer by ID
const updateCustomerById = async (req, res) => {
  try {
    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }
    let customer;
    if (req.body.password) {
      customer = await Customer.findByIdAndUpdate(
        req.params.id.substring(1),
        { $set: { ...req.body, password: hashedPassword } },
        { new: true }
      );
    } else {
      customer = await Customer.findByIdAndUpdate(
        req.params.id.substring(1),
        { $set: req.body },
        { new: true }
      );
    }

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    res.json({ success: true, customer });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ success: false, error: "Failed to update customer" });
  }
};

// Delete a customer by ID
const deleteCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(
      req.params.id.substring(1)
    );
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ success: false, error: "Failed to delete customer" });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  getCustomersList,
};
