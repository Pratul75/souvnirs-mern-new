const { createMenu } = require("../controllers/menuController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();
router.post(
  "/menu/create",
  authMiddleware(["vendor", "admin", "customer"]),
  createMenu
);
router.get("/menu", authMiddleware(["vendor", "admin", "customer"]), getMenu);
module.exports = router;
