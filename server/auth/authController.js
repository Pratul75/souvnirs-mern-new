const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Vendor = require("../schema/vendorModal");
const Customer = require("../schema/customerModal");
const Admin = require("../schema/adminModal");
const { error, success } = require("../utils/errorHandler");
const Address = require("../schema/addressModal");
const { transporter } = require("../services/mailing");
const secretKey = "aspdijr230wefn203wqiokn_eww9rijn"; // Replace with your secret key for JWT

// Register API for vendors and users
const registerVendor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      otp,
      otpStatus,
      mobile,
      status,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const isExists = await Vendor.findOne({ email });
    if (isExists) {
      return res
        .status(400)
        .json({ error: "vendor with provided email address already exists." });
    }

    // Create the vendor in the database
    await Vendor.create({
      firstName,
      lastName,
      email,
      otp,
      otpStatus,
      mobile,
      status,
      password: hashedPassword,
    });

    // Find the newly created vendor
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res
        .status(400)
        .json({ error: "Vendor not found after registration" });
    }

    // Generate and send the JWT token to the front end
    const token = jwt.sign({ id: vendor._id, role: "vendor" }, secretKey, {
      expiresIn: "7h", // Token expiration time
    });
    transporter.send({
      from: "utkarsh.pawar@rechargestudio.com",
      to: "pratul.udainiya@rechargestudio.com",
      subject: "vendor registered",
      text: `hello testing`,
    });

    res.status(200).json(success("vendor registered successfully"));
  } catch (error) {
    console.error("Error registering vendor:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const registerCustomer = async (req, res) => {
  try {
    const { city, pincode, country } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const customer = await Customer.create({
      ...req.body,
      password: hashedPassword,
    });
    Address.create({
      customer_id: customer._id,
      city,
      pin_code: pincode,
      country,
    });
    const token = jwt.sign({ role: "customer", id: customer._id }, secretKey, {
      expiresIn: "7h",
    });

    res.status(200).json({ message: "User registered successfully!", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    const user = vendor ? null : await Customer.findOne({ email });
    const admin = vendor || user ? null : await Admin.findOne({ email: email });
    if (!vendor && !user && !admin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const foundUser = vendor || user || admin;
    // Check if the password matches the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    if (!passwordMatch) {
      return res.status(400).json(error("Invalid Credentials"));
    }
    // Generate and send the JWT token to the front end with appropriate role
    let role;
    let a;
    if (vendor) {
      role = "vendor";
      a = vendor
    } else if (user) {
      role = "customer";
      a = user
    } else if (admin) {
      role = "admin";
      a = admin;
    }
    const token = jwt.sign({ id: foundUser._id, role, userName: `${a.firstName} ${a.lastName}` }, secretKey, {
      expiresIn: "7h", // Token expiration time
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

module.exports = {
  registerVendor,
  registerCustomer,
  loginUser,
};
