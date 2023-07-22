const router = require("express").Router();
const {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
} = require("../controllers/adminController");

router.post("/admin/create-admin", createAdmin);
router.delete("/admin/delete-admin", deleteAdmin);
router.get("/admin/get-all-admins", getAllAdmins);

module.exports = router;
