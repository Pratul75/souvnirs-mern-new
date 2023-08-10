const {
  createMenu,
  getMenu,
  getMainMenus,
  createMainMenu,
} = require("../controllers/menuController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();
router.post(
  "/menu/create",
  authMiddleware(["vendor", "admin", "customer"]),
  createMenu
);
router.get("/menu", authMiddleware(["vendor", "admin", "customer"]), getMenu);

router.get(
  "/main-menu",
  authMiddleware(["vendor", "admin", "customer"]),
  getMainMenus
);
router.post("/main-menu/create", authMiddleware(["admin"]), createMainMenu);
module.exports = router;
