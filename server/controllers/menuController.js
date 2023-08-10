const { response } = require("express");
const Menu = require("../schema/menuItem");
const MainMenu = require("../schema/mainMenuModal");

const createMenu = async () => {
  const { title } = req.body;
  const titleExists = await Menu.findOne({ title });
  if (titleExists) {
    response.status(400).json("title Already exist");
  }
  const createdMenu = await Menu.create({ title });
  res.status(200).json(createdMenu);
};
const getMenu = async () => {
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
module.exports = { createMenu, getMenu, getMainMenus, createMainMenu };
