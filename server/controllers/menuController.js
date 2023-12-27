const { response } = require("express");
const Menu = require("../schema/menuItem");
const MainMenu = require("../schema/mainMenuModal");
const SubMenu = require("../schema/subMenuModal");
const SubMenuChild = require("../schema/subMenuChild");
const mongoose = require("mongoose");
// const ObjectId = require("mongoose").Types.ObjectId;

const createMenu = async (req, res) => {
  const { title } = req.body;
  const titleExists = await Menu.findOne({ title });
  if (titleExists) {
    response.status(400).json("title Already exist");
  }
  const createdMenu = await Menu.create({ title });
  res.status(200).json(createdMenu);
};

////////////////////??????????
const getMenu = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;
    const skip = (page - 1) * pageSize;
    console.log(")", req.query, skip);
    let totalData = 0,
      totalPages = 0,
      matchQuery = {};
    if (seacrhText) {
      matchQuery = {
        $or: [{ title: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    console.log("matchQuery==>", matchQuery);

    const menus = await Menu.aggregate([
      {
        $match: matchQuery, // Apply the search query
      },
      {
        $sort: { createdAt: -1 }, // Sort by creation date in descending order
      },
      {
        $skip: Number(skip),
      },
      {
        $limit: Number(pageSize),
      },
    ]);

    totalData = await Menu.find(matchQuery).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getMenuALl = async (req, res) => {
  try {
    const menus = await Menu.aggregate([
      {
        $sort: { createdAt: -1 }, // Sort by creation date in descending order
      },
    ]);

    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllMenu = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const seacrhText = req?.query?.seacrhText;
    const skip = (page - 1) * pageSize;
    console.log(")", req.query, skip);
    let totalData = 0,
      totalPages = 0,
      matchQuery = {};
    if (seacrhText) {
      matchQuery = {
        $or: [{ title: { $regex: new RegExp(seacrhText, "i") } }],
      };
    }
    console.log("matchQuery==>", matchQuery);

    const menus = await Menu.aggregate([
      {
        $match: matchQuery, // Apply the search query
      },
      {
        $sort: { createdAt: -1 }, // Sort by creation date in descending order
      },
      {
        $skip: Number(skip),
      },
      {
        $limit: Number(pageSize),
      },
    ]);

    totalData = await Menu.find(matchQuery).countDocuments();
    totalPages = Math.ceil(totalData / pageSize);
    res.status(200).json({
      message: "get data successfully",
      totalData,
      page,
      totalPages,
      menus,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createMainMenu = async (req, res) => {
  const { menuId, title, link, type, position } = req.body;
  if (!menuId) {
    return res.status(400).json("selecting menu is required");
  }
  if (!title) {
    return res.status(400).json("title is required");
  }
  const menu = await Menu.findById(menuId);

  const mainmenu = await MainMenu.create({
    link,
    title,
    position,
    type: type ?? "collection",
    menuId: menu._id,
  });
  res.status(200).json({
    message: "main menu created successfully",
    createdMenu: mainmenu,
  });
};

const getMainMenus = async (req, res) => {
  const mainmenus = await MainMenu.find().sort({ _id: -1 }).populate("menuId");

  res.status(200).json(mainmenus);
};

// Update a main menu item by ID
const getMainMenuData = async (req, res) => {
  try {
    const { id } = req.params;
    const mainMenuData = await MainMenu.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "sub menus",
          let: {
            mainMenuId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$mainMenuId", "$$mainMenuId"],
                },
              },
            },
            {
              $lookup: {
                from: "child menus",
                localField: "_id",
                foreignField: "subMenuId",
                as: "childmenus",
              },
            },
          ],
          as: "submenus",
        },
      },
    ]);

    console.log(id);
    res.status(200).json(mainMenuData);
  } catch (e) {
    res.status(400).json("something went wrong");
  }
};

const editMainMenu = async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const { title, status, position } = req.body;

    const updatedMenuItem = await MainMenu.findByIdAndUpdate(
      menuItemId,
      {
        $set: {
          title,
          status,
          position,
        },
      },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ error: "Main menu item not found." });
    }

    res.json(updatedMenuItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the main menu item." });
  }
};

const createSubMenu = async (req, res) => {
  for (let elem of req.body) {
    let { title, link, type, typeValue, mainMenuId } = elem;
    if (!mainMenuId) {
      return res.status(400).json("selecting main menu is required");
    }
    if (!title) {
      title = "s";
      // return res.status(400).json("title is required");
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

const EditSubMenu = async (req, res) => {
  for (let elem of req.body) {
    let { title, link, type, typeValue, mainMenuId } = elem;
    if (!mainMenuId) {
      return res.status(400).json("selecting main menu is required");
    }
    if (!title) {
      title = "s";
      // return res.status(400).json("title is required");
    }
    const subs = await MainMenu.findByIdAndUpdate(req?.body[0]?.subId, {
      title,
      link,
      type,
      typeValue,
      mainMenuId,
    });
    console.log(subs);
  }
  return res.status(200).json("Sub-menu Updare successfully");
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
    if (!title) {
      return res.status(400).json("title is required");
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
    const mainMenuIds = await MainMenu.find({ menuId: menu._id })
      .select("_id title position")
      .sort({ _id: -1 })
      .lean();

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
    res
      .status(500)
      .json({ error: "Internal server error", error_msg: error.message });
  }
};

const getFooterMenu = async (req, res) => {
  try {
    const menu = await Menu.findOne({ title: "footer" }).lean();
    const mainMenuIds = await MainMenu.find({ menuId: menu._id })
      .select("_id title position")
      .sort({ _id: -1 })
      .lean();

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

const deleteMenu = async (req, res) => {
  const { id } = req.params;
  const deleted = await MainMenu.findByIdAndDelete(id);
  if (deleted) {
    return res
      .status(200)
      .json({ message: "Menu deleted successfully", response: deleted });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  const menus = await MainMenu.find({
    menuId: new mongoose.Types.ObjectId(id),
  }).sort({
    _id: -1,
  });
  res.status(200).json(menus);
};

const UpdateMenue = async (req, res) => {
  const { id } = req.params;
  const UpdateData = await Menu.findByIdAndUpdate(id, req.body);
  res.status(200).json(UpdateData);
};

const UpdateMenueOne = async (req, res) => {
  const { id } = req.params;
  const UpdateData = await Menu.findByIdAndDelete(id);
  res.status(200).json(UpdateData);
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
};
