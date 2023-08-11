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
  const data = await Menu.aggregate([
    {
      $match: {
        title: "navbar",
      },
    },
    {
      $lookup: {
        from: "main menus",
        localField: "_id",
        foreignField: "menuId",
        as: "mainMenu",
      },
    },
    {
      $unwind: "$mainMenu",
    },
    {
      $lookup: {
        from: "sub menus",
        localField: "mainMenu._id",
        foreignField: "mainMenuId",
        as: "mainMenu.submenus",
      },
    },
    {
      $unwind: {
        path: "$mainMenu.submenus",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "child menus",
        localField: "mainMenu.submenus._id",
        foreignField: "subMenuId",
        as: "mainMenu.submenus.childMenus",
      },
    },
    {
      $group: {
        _id: "$_id",
        title: {
          $first: "$title",
        },
        mainMenu: {
          $push: {
            title: "$mainMenu.title",
            link: "$mainMenu.link",
            submenus: {
              $cond: {
                if: "$mainMenu.submenus",
                then: "$mainMenu.submenus",
                else: [],
              },
            },
          },
        },
      },
    },
  ]);
  console.log();
  res.status(200).json(data);
};
module.exports = {
  getSubMenus,
  createChildMenu,
  createMenu,
  getMenu,
  getMainMenus,
  createMainMenu,
  createSubMenu,
  getNavbarData,
};
