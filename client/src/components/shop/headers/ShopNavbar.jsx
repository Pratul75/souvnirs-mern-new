import React, { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import { motion } from "framer-motion";
const ShopNavbar = () => {
  const [menuData, setMenuData] = useState([]);
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: {
      duration: 1000,
    },
  };

  const getNavbarData = async () => {
    try {
      const response = await API_WRAPPER.get("/getNavbarMenu");
      if (response.status === 200) {
        setMenuData(response.data);
        console.log("NAVBAR DATA:", response.data);
      }
    } catch (error) {
      console.error("Error fetching navbar data:", error);
    }
  };

  useEffect(() => {
    getNavbarData();
  }, []);

  const renderChildMenu = (childMenu) => (
    <ul className="pl-4 mt-2 space-y-1">
      {childMenu.map((childItem) => (
        <li key={childItem._id} className="hover:text-blue-500">
          <a href={childItem.link}>{childItem.title}</a>
        </li>
      ))}
    </ul>
  );

  const renderSubMenu = (subMenu) => (
    <div tabIndex={0} className=" dropdown dropdown-hover px-4 block  ">
      <div className=" ">
        <summary className="font-semibold">{subMenu.title}</summary>
        <span className="dropdown-content bg-white z-20 ">
          {subMenu.child.length > 0 && renderChildMenu(subMenu.child)}
        </span>
      </div>
    </div>
  );

  const renderMenu = (menu) => (
    <motion.li
      key={menu._id}
      className="relative group menu"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <a
        href={menu.link}
        className="block py-2 px-4 hover:bg-blue-100 transition duration-300"
      >
        {menu.title}
      </a>
      {menu.submenus.length > 0 && (
        <div className="hidden group-hover:block w-96 absolute left-full top-0 mt-1 z-10 p-2 rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between flex-wrap">
            {menu.submenus.map((subMenu) => (
              <div key={subMenu._id} className="w-1/4 p-2 ">
                <a
                  href={subMenu.link}
                  className="block py-2 px-4 hover:bg-blue-100 transition duration-300"
                >
                  {subMenu.child.length > 0 ? null : subMenu.title}
                </a>
                <span>
                  {subMenu.child.length > 0 && renderSubMenu(subMenu)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.li>
  );

  return (
    <nav className="py-4 flex items-center">
      <div className="container mx-auto">
        <ul className="flex">{menuData.map((menu) => renderMenu(menu))}</ul>
      </div>
    </nav>
  );
};

export default ShopNavbar;
