const Menu = require("../schema/menuItem");

const createMenu = async () => {
  const { title } = req.body;
  const createdMenu = await Menu.create({ title });
  res.status(200).json(createdMenu);
};
const getMenu = async () => {
  const menus = await Menu.find();
  res.status(200).json(menus);
};
module.exports = { createMenu };
