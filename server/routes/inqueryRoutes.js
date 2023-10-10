const router = require("express").Router();
const { createInquey } = require("../controllers/inquaryController");
const authMiddleware = require("../middlewares");

router.post(
  "/create/inquery",
  authMiddleware(["vendor", "admin", "customer"]),
  createInquey
);

module.exports = router;
