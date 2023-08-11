const { response } = require("express");
const Menu = require("../schema/menuItem");
const MainMenu = require("../schema/mainMenuModal");
const SubMenu = require("../schema/subMenuModal");

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
  const menus = await Menu.find();
  res.status(200).json(menus);
};
const createMainMenu = async (req, res) => {
  const { menuId, title, link, type } = req.body;
  const menu = await Menu.findById(menuId);
  const mainmenu = await MainMenu.create({
    link,
    title,
    type,
    menuId: menu._id,
  });
  res.status(200).json("main menu created successfully");
};
const getMainMenus = async (req, res) => {
  const mainmenus = await MainMenu.findById();
  res.status(200).json(mainmenus);
};
const createSubMenu = async (req, res) => {
  const { mainMenuId, title, link, type } = req.body;
  SubMenu.create({ mainMenuId, title, link, type });
  res.status(200).json("Sub-menu created successfully");
};
const getSubMenus = async (req, res) => {
  const subMenus = await SubMenu.find();
  res.status(200).json(subMenus);
};
module.exports = {
  getSubMenus,
  createMenu,
  getMenu,
  getMainMenus,
  createMainMenu,
};
