const router = require("express").Router();
const {
  createInquey,
  getInquey,
  getAllInquey,
  getDetailsInquery,
  UpdateInqueryData,
} = require("../controllers/inquaryController");
const authMiddleware = require("../middlewares");

router.post(
  "/create/inquery",
  authMiddleware(["vendor", "admin", "customer"]),
  createInquey
);

router.post(
  "/edit/data/inquery",
  authMiddleware(["vendor", "admin", "customer"]),
  UpdateInqueryData
);

router.get(
  "/get/inquery",
  authMiddleware(["vendor", "admin", "customer"]),
  getInquey
);

router.get(
  "/get/inquery/list",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllInquey
);

router.get(
  "/get/inquery/details",
  authMiddleware(["vendor", "admin", "customer"]),
  getDetailsInquery
);

module.exports = router;
