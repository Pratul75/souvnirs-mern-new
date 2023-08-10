const { response } = require("express");
const Menu = require("../schema/menuItem");

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
module.exports = { createMenu, getMenu };
