const Vendor = require("../schema/vendorModal");

// Create a new vendor
const createVendor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile } = req.body;

    // Create a new vendor instance
    const vendor = new Vendor({
      firstName,
      lastName,
      email,
      password,
      mobile,
    });

    // Save the vendor to the database
    await vendor.save();

    res.status(201).json({ success: true, data: vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to create vendor" });
  }
};

// Get all vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json({ success: true, data: vendors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to get vendors" });
  }
};

// Get a single vendor by ID
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id.substring(1));
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found" });
    }
    res.json({ success: true, data: vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to get vendor" });
  }
};

// Update a vendor by ID
const updateVendor = async (req, res) => {
  try {
    const { firstName, lastName, email, password, mobile } = req.body;

    const vendor = await Vendor.findById(req.params.id.substring(1));
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found" });
    }

    vendor.firstName = firstName;
    vendor.lastName = lastName;
    vendor.email = email;
    vendor.password = password;
    vendor.mobile = mobile;

    await vendor.save();

    res.json({ success: true, data: vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to update vendor" });
  }
};

// Delete a vendor by ID
const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id.substring(1));
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found" });
    }

    res.json({ success: true, message: "Vendor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to delete vendor" });
  }
};

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};
