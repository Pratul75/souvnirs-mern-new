const authMiddleware = require("../middlewares");
const router = require("express").Router();
const {
  createCommission,
  deleteCommissionById,
  getAllCommissions,
  getCommissionById,
  updateCommissionById,
} = require("../controllers/commissionController");

router.post(
  "/commission/create-commission",
  authMiddleware(["vendor", "admin", "customer"]),
  createCommission
);

router.get(
  "/commission/get-all-commissions",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllCommissions
);

router.get(
  "/commission/get-commission-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getCommissionById
);

router.put(
  "/commission/commission-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  updateCommissionById
);

router.delete(
  "/commission/delete-commission-by-id/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  deleteCommissionById
);

module.exports = router;
