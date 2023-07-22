const bcrypt = require("bcrypt");
const Admin = require("../schema/adminModal");

// Create a new admin
const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ message: "Admin created successfully!", admin: newAdmin });
  } catch (error) {
    console.error("Error creating admin:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

// Delete an admin by ID
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAdmin = await Admin.findByIdAndDelete(id);

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully!" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const adminsList = await Admin.find({});
    res.status(200).json(adminsList);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal ServerERror", message: error.message });
  }
};

module.exports = {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
};
