const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Vendor = require("../schema/vendorModal");
const Customer = require("../schema/customerModal");
const Admin = require("../schema/adminModal");
const secretKey = "aspdijr230wefn203wqiokn_eww9rijn"; // Replace with your secret key for JWT
// Mocked admin data (You can use a real database in your application)
const admin = {
  id: 1,
  username: "admin",
  password: "$2b$10$jW4Kgb0L0gq9T7do/Wt1JuaIa3Q2Wb.4CL8N.5bONU9hDNjppwztO", // Password: "adminpassword"
};

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
        .status(500)
        .json({ error: "Vendor not found after registration" });
    }

    // Generate and send the JWT token to the front end
    const token = jwt.sign({ id: vendor._id, role: "vendor" }, secretKey, {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ message: "Vendor registered successfully!", token });
  } catch (error) {
    console.error("Error registering vendor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login API for vendors and users
const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, vendor.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: vendor._id, role: "vendor" }, secretKey, {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in vendor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await Customer.create({ username, password: hashedPassword });

    res.status(200).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Customer.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, role: "user" }, secretKey, {
      expiresIn: "1h", // Token expiration time
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Admin login API
const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin by username in the database
    const admin = await Admin.findOne({ username });

    // Check if the admin exists in the database
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // Check if the password matches the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate and send the JWT token to the front end
    const token = jwt.sign({ id: admin._id, role: "admin" }, secretKey, {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerVendor,
  vendorLogin,
  userLogin,
  registerUser,
  adminLogin,
};
