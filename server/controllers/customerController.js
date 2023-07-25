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
      .status(500)
      .json({ success: false, error: "Failed to create customer" });
  }
};

// Get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.json({ success: true, customers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to get customers" });
  }
};

// Get a customer by ID
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id.substring(1));
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    res.json({ success: true, customer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to get customer" });
  }
};

// Update a customer by ID
const updateCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id.substring(1),
      { $set: req.body },
      { new: true }
    );
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    res.json({ success: true, customer });
  } catch (error) {
    console.error(error);
    res
      .status(500)
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
      .status(500)
      .json({ success: false, error: "Failed to delete customer" });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
