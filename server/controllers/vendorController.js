const Vendor = require("../schema/vendorModal");
const Store = require("../schema/storeModal");
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

    vendor.firstName = firstName ?? vendor.firstName;
    vendor.lastName = lastName ?? vendor.lastName;
    vendor.email = email ?? vendor.email;
    vendor.password = password ?? vendor.password;
    vendor.mobile = mobile ?? vendor.mobile;

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
    const vendorId = req.params.id.substring(1);

    // Check if vendor exists
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found" });
    }

    // Check if vendor's ID exists in the Store collection with the key "vendorId"
    const store = await Store.findOneAndDelete({ vendorId });
    if (store) {
      console.log(`Store with vendorId ${vendorId} has been deleted.`);
    }

    // Delete the vendor
    await Vendor.findByIdAndDelete(vendorId);

    res.json({ success: true, message: "Vendor deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to delete vendor" });
  }
};

// get vendor count
const getVendorsCount = async (req, res) => {
  try {
    // get total number of vendors
    const vendorsCount = await Vendor.countDocuments({});
    console.log("VENDOR COUNT: ", vendorsCount);

    res.status(200).json({ count: vendorsCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to get the total number of vendors" });
  }
};

module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  getVendorsCount,
  updateVendor,
  deleteVendor,
};
