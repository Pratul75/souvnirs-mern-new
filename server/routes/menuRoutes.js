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
  getDataById,
  UpdateMenue,
  getFooterMenu,
  getAllMenu,
  UpdateMenueOne,
  getMenuALl,
  EditSubMenu,
} = require("../controllers/menuController");
const authMiddleware = require("../middlewares");

const router = require("express").Router();
router.post(
  "/menu/create",
  authMiddleware(["vendor", "admin", "customer"]),
  createMenu
);

router.post(
  "/menu/edit/menu",
  authMiddleware(["vendor", "admin", "customer"]),
  EditSubMenu
);

router.get("/menu", authMiddleware(["vendor", "admin", "customer"]), getMenu);
router.get(
  "/menu/list/show",
  authMiddleware(["vendor", "admin", "customer"]),
  getMenuALl
);

router.get(
  "/all/menu",
  authMiddleware(["vendor", "admin", "customer"]),
  getAllMenu
);

router.delete("/menu/delete/:id", authMiddleware(["admin"]), UpdateMenueOne);

router.get(
  "/menuById/:id",
  authMiddleware(["vendor", "admin", "customer"]),
  getDataById
);
router.delete("/menu/:id", authMiddleware(["admin"]), deleteMenu);
router.patch("/update/menu/:id", authMiddleware(["admin"]), UpdateMenue);

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
router.get("/getFooterMenu", getFooterMenu);
module.exports = router;
