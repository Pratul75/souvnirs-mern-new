const router = require("express").Router();
const { createAdmin, deleteAdmin } = require("../controllers/adminController");

router.post("/admin/create-admin", createAdmin);
router.delete("/admin/delete-admin", deleteAdmin);

module.exports = router;
