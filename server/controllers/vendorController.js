const Vendor = require("../schema/vendorModal");
const Store = require("../schema/storeModal");
const { roles } = require("../utils");
const storeModal = require("../schema/storeModal");
const { default: mongoose } = require("mongoose");
// Create a new vendor
const bcrypt = require("bcrypt");
const createVendor = async (req, res) => {
  try {
    //   mobile: selectedRow?.mobile,
    //   organizationName: selectedRow?.store?.organization_name,
    //   organizationType: selectedRow?.store?.organization_type,
    //   country: selectedRow?.store?.country,
    //   city: selectedRow?.store?.city,
    //   pincode: selectedRow?.store?.pin_code,
    //   status: selectedRow?.status,
    const {
      firstName,
      lastName,
      email,
      password,
      mobile,
      organizationType,
      organizationName,
      city,
      pincode,
      status,
      country,
    } = req.body;
    const checkVendor = await Vendor.findOne({ email: email });
    if (checkVendor) {
      return res
        .status(400)
        .json({ success: false, error: "Email already present" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new vendor instance
    const vendor = new Vendor({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      mobile,
    });

    // Save the vendor to the database
    let vendordata = await vendor.save();
    console.log("vendordata", vendordata);
    if (vendordata) {
      let storeData = await storeModal.create({
        vendorId: vendordata._id,
        organization_name: organizationName,
        organization_type: organizationType,
        country,
        pinCode: pincode,
        city,
      });
      console.log("storeData", storeData);
    }

    res.status(200).json({ success: true, data: vendor });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to create vendor" });
  }
};

// Get all vendors
const getVendors = async (req, res) => {
  try {
    let vendors;
    if (req.role === "admin") {
      vendors = await Vendor.aggregate([
        {
          $lookup: {
            from: "stores",
            localField: "_id",
            foreignField: "vendor_id",
            as: "store",
          },
        },
        {
          $unwind: {
            path: "$store",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]).sort({ createdAt: -1 });
    } else if (req.role === "vendor") {
      vendors = await Vendor.find({ _id: req.userId });
    }
    res.json({ success: true, data: vendors });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to get vendors" });
  }
};

const getVendorsList = async (req, res) => {
  try {
    let vendors;
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
    if (req.role === "admin") {
      vendors = await Vendor.aggregate([
        {
          $match: matchQuery,
        },
        {
          $lookup: {
            from: "stores",
            localField: "_id",
            foreignField: "vendorId",
            as: "store",
          },
        },
        {
          $unwind: {
            path: "$store",
            preserveNullAndEmptyArrays: true,
          },
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
      totalData = await Vendor.find(matchQuery).countDocuments();
      totalPages = Math.ceil(totalData / pageSize);
    } else if (req.role === "vendor") {
      vendors = await Vendor.find({ _id: req.userId });
    }
    res.json({ success: true, totalData, page, totalPages, data: vendors });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to get vendors" });
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
    res.status(400).json({ success: false, error: "Failed to get vendor" });
  }
};

// Update a vendor by ID
const updateVendor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      mobile,
      organizationType,
      organizationName,
      city,
      pincode,
      status,
      country,
    } = req.body;

    const vendor = await Vendor.findById(req.params.id.substring(1));
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, error: "Vendor not found" });
    }
    const hashedPassword = await bcrypt.hash(password ?? vendor.password, 10);

    vendor.firstName = firstName ?? vendor.firstName;
    vendor.lastName = lastName ?? vendor.lastName;
    vendor.email = email ?? vendor.email;
    vendor.password = hashedPassword;
    vendor.mobile = mobile ?? vendor.mobile;
    vendor.status = status ?? vendor.status;

    let vendorUpdate = await vendor.save();
    console.log({ vendorUpdate });
    const present = await storeModal.findOne({
      vendorId: new mongoose.Types.ObjectId(vendor._id),
    });
    if (present) {
      const updatedStore = await storeModal.findOneAndUpdate(
        { vendorId: new mongoose.Types.ObjectId(vendor._id) },
        {
          organization_name: organizationName,
          organization_type: organizationType,
          country,
          pinCode: pincode,
          city,
        },
        { upsert: true, new: true }
      );
    } else {
      await storeModal.create({
        vendorId: vendor._id,
        organization_name: organizationName,
        organization_type: organizationType,
        country,
        pinCode: pincode,
        city,
      });
    }

    res.json({ success: true, data: vendor });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Failed to update vendor" });
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
    res.status(400).json({ success: false, error: "Failed to delete vendor" });
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
      .status(400)
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
  getVendorsList,
};
