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
  const mainmenus = await MainMenu.find().sort({ _id: -1 });
  res.status(200).json(mainmenus);
};
const createSubMenu = async (req, res) => {
  for (let elem of req.body) {
    const { heading: title, link, type, typeValue, mainMenuId } = elem;

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
  const subMenus = await SubMenu.find().sort({ _id: -1 });
  res.status(200).json(subMenus);
};
const createChildMenu = async (req, res) => {
  for (let elem of req.body) {
    const { heading: title, link, type, typeValue, subMenuId } = elem;

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
  const Menu.aggregate()
};
module.exports = {
  getSubMenus,
  createChildMenu,
  createMenu,
  getMenu,
  getMainMenus,
  createMainMenu,
  createSubMenu,
};
