const router = require("express").Router();
const {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
} = require("../controllers/adminController");

router.delete("/admin/delete-admin/:id", deleteAdmin);
router.post("/admin/create-admin", createAdmin);
router.get("/admin/get-all-admins", getAllAdmins);

module.exports = router;
