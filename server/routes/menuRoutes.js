const {
  createMenu,
  getMenu,
  getMainMenus,
  createMainMenu,
  getSubMenus,
  createSubMenu,
  createChildMenu,
  getNavbarData,
  deleteMenu,
  getChildMenus,
  editMainMenu,
  getMainMenuData,
} = require("../controllers/menuController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();
router.post(
  "/menu/create",
  authMiddleware(["vendor", "admin", "customer"]),
  createMenu
);
router.get("/menu", authMiddleware(["vendor", "admin", "customer"]), getMenu);
router.delete("/menu/:id", authMiddleware(["admin"]), deleteMenu);

router.get(
  "/main-menu",
  authMiddleware(["vendor", "admin", "customer"]),
  getMainMenus
);
router.put(
  "/main-menu/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  editMainMenu
);
router.get("/main-menu/:id", authMiddleware(["admin"]), getMainMenuData);
router.get(
  "/sub-menu",
  authMiddleware(["vendor", "admin", "customer"]),
  getSubMenus
);
router.get(
  "/child-menu",
  authMiddleware(["vendor", "admin", "customer"]),
  getChildMenus
);
router.post("/main-menu/create", authMiddleware(["admin"]), createMainMenu);
router.post("/sub-menu/create", authMiddleware(["admin"]), createSubMenu);
router.post("/child-menu/create", authMiddleware(["admin"]), createChildMenu);
router.get("/getNavbarMenu", getNavbarData);
module.exports = router;
