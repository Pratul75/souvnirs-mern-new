const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Vendor = require("../schema/vendorModal");
const Customer = require("../schema/customerModal");
const Admin = require("../schema/adminModal");
const { error, success } = require("../utils/errorHandler");
const Address = require("../schema/addressModal");
const { transporter } = require("../services/mailing");
const axios = require("axios");
const secretKey = "aspdijr230wefn203wqiokn_eww9rijn";
var SibApiV3Sdk = require("sib-api-v3-sdk");
const sendEmail = require("../services/mailing");
const { response } = require("express");

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

    await sendEmail(
      "pratul.udainiya@rechargestudio.com",
      "new vendor registered",
      `vendor with email address: ${vendor.email} and name: ${vendor.firstName} ${vendor.lastName}`
    );

    // Generate and send the JWT token to the front end
    const token = jwt.sign({ id: vendor._id, role: "vendor" }, secretKey, {
      expiresIn: "7h", // Token expiration time
    });

    res.status(200).json({ message: "vendor registered successfully", token });
  } catch (error) {
    console.error("Error registering vendor:", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};

const registerCustomer = async (req, res) => {
  try {
    const { city, pinCode, country, email } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const alreadyExists = await Customer.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json("customer with given email already exists");
    }
    const customer = await Customer.create({
      ...req.body,
      password: hashedPassword,
    });
    Address.create({
      customer_id: customer._id,
      city,
      pin_code: pinCode,
      country,
    });
    const token = jwt.sign({ role: "customer", id: customer._id }, secretKey, {
      expiresIn: "7h",
    });
    await sendEmail(
      "pratul.udainiya@rechargestudio.com",
      "New Customer Registered",
      `Customer with following email address registered: ${customer.email}`
    );
    await sendEmail(
      email,
      "Welcome to Souvnirs",
      "Sign in to see exciting deals"
    );
    res.status(200).json({ message: "User registered successfully!", token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(400).json({ error: "somthing went wrong", msg: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Email: ", email, "Password: ", password);

    // check if email exists in any of the models
    const customer = await Customer.findOne({ email });
    const vendor = await Vendor.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (!customer && !vendor && !admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    let role;
    if (admin) {
      role = "admin";
    } else if (vendor) {
      role = "vendor";
    } else {
      role = "customer";
    }

    // Check if the password is correct
    const user = customer || vendor || admin;
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("USER: ", user, "PASSWORD MATCH: ", passwordMatch);
    // if (!passwordMatch) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // Generate a JWT token with the role and a 7-hour expiry
    const token = jwt.sign({ email, role, id: user._id }, secretKey, {
      expiresIn: "7h",
    });

    // Send the token as a response
    res.status(200).json({ token });
  } catch (error) {
    // Handle any errors that occur during the execution of the function
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerVendor,
  registerCustomer,
  loginUser,
};
