const {
  createMenu,
  getMenu,
  getMainMenus,
  createMainMenu,
  getSubMenus,
  createSubMenu,
  createChildMenu,
  getNavbarData,
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
router.get(
  "/sub-menu",
  authMiddleware(["vendor", "admin", "customer"]),
  getSubMenus
);
router.post("/main-menu/create", authMiddleware(["admin"]), createMainMenu);
router.post("/sub-menu/create", authMiddleware(["admin"]), createSubMenu);
router.post("/child-menu/create", authMiddleware(["admin"]), createChildMenu);
router.get("/getNavbarMenu", getNavbarData);
module.exports = router;
