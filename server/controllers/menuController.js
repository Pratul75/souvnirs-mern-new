const { response } = require("express");
const Menu = require("../schema/menuItem");
const MainMenu = require("../schema/mainMenuModal");
const SubMenu = require("../schema/subMenuModal");
const SubMenuChild = require("../schema/subMenuChild");

const createMenu = async (req, res) => {
  const { title } = req.body;
  const titleExists = await Menu.findOne({ title });
  if (titleExists) {
    response.status(400).json("title Already exist");
  }
  const createdMenu = await Menu.create({ title });
  res.status(200).json(createdMenu);
};
const getMenu = async (req, res) => {
  const menus = await Menu.find().sort({ _id: -1 });
  res.status(200).json(menus);
};
const createMainMenu = async (req, res) => {
  const { menuId, title, link, type } = req.body;
  if (!menuId) {
    return res.status(400).json("selecting menu is required");
  }
  const menu = await Menu.findById(menuId);
  const mainmenu = await MainMenu.create({
    link,
    title,
    type: type ?? "collection",
    menuId: menu._id,
  });
  res.status(200).json("main menu created successfully");
};
const getMainMenus = async (req, res) => {
  const mainmenus = await MainMenu.find().sort({ _id: -1 }).populate("menuId");

  res.status(200).json(mainmenus);
};
const createSubMenu = async (req, res) => {
  for (let elem of req.body) {
    const { heading: title, link, type, typeValue, mainMenuId } = elem;
    if (!mainMenuId) {
      return res.status(400).json("selecting main menu is required");
    }
    const subs = await SubMenu.create({
      title,
      link,
      type,
      typeValue,
      mainMenuId,
    });
    console.log(subs);
  }
  res.status(200).json("Sub-menu created successfully");
};
const getSubMenus = async (req, res) => {
  const subMenus = await SubMenu.find().sort({ _id: -1 }).populate();
  res.status(200).json(subMenus);
};
const getChildMenus = async (req, res) => {
  const subMenus = await SubMenuChild.find()
    .sort({ _id: -1 })
    .populate("subMenuId");
  res.status(200).json(subMenus);
};
const createChildMenu = async (req, res) => {
  for (let elem of req.body) {
    const { heading: title, link, type, typeValue, subMenuId } = elem;
    if (!subMenuId) {
      return res.status(400).json("selecting sub Menu is required");
    }
    const subs = await SubMenuChild.create({
      title,
      link,
      type,
      typeValue,
      subMenuId,
    });
    console.log(subs);
  }
  res.status(200).json("Sub-menu created successfully");
};
const getNavbarData = async (req, res) => {
  try {
    const menu = await Menu.findOne({ title: "navbar" }).lean();
    const mainMenuIds = await MainMenu.find(
      { menuId: menu._id },
      "_id title"
    ).lean();

    const mainMenuPromises = mainMenuIds.map(async (mainMenu) => {
      const mainMenuObj = { ...mainMenu };
      const subMenus = await SubMenu.find({ mainMenuId: mainMenu._id }).lean();

      const subMenuPromises = subMenus.map(async (subMenu) => {
        const subMenuObj = { ...subMenu };
        subMenuObj.child = await SubMenuChild.find({
          subMenuId: subMenu._id,
        }).lean();
        return subMenuObj;
      });

      mainMenuObj.submenus = await Promise.all(subMenuPromises);
      return mainMenuObj;
    });

    const finalData = await Promise.all(mainMenuPromises);

    res.status(200).json(finalData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteMenu = async () => {
  const { id } = req.params;
  const deleted = await Menu.findByIdAndDelete(id);
  if (deleted.deleteCount > 0) {
    return res.status(200).json("Menu deleted successfully");
  }
};

// Assuming you have your models and database connections set up properly
// const Menu = require('./models/Menu');
// const MainMenu = require('./models/MainMenu');
// const SubMenu = require('./models/SubMenu');
// const ChildMenu = require('./models/ChildMenu');

module.exports = {
  getSubMenus,
  createChildMenu,
  createMenu,
  getMenu,
  getMainMenus,
  createMainMenu,
  createSubMenu,
  getNavbarData,
  deleteMenu,
  getChildMenus,
};
