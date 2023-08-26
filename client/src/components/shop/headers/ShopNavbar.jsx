import { useEffect, useRef, useState } from "react";
import API_WRAPPER from "../../../api";
import { nanoid } from "nanoid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const ShopNavbar = () => {
  const variants = {
    hidden: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
    },
  };

  const [menuData, setMenuData] = useState([]);
  const [dropdownToggle, setDropdownToggle] = useState(false);
  const [toggledMenuItem, setToggledMenuItem] = useState({});

  const menuRef = useRef(null); // Ref for the toggled menu

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

  const handleDropdownEnter = (menuItem) => {
    setDropdownToggle(true);
    setToggledMenuItem(menuItem);
    console.log("SELECTED MENU ITEM:", menuItem);
  };

  const handleDropdownLeave = () => {
    // setDropdownToggle(false);
  };

  const handleDocumentClick = () => {
    setDropdownToggle(false);
  };

  useEffect(() => {
    getNavbarData();
    window.addEventListener("click", handleDocumentClick);

    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    getNavbarData();
  }, []);

  useEffect(() => {
    console.log("TOGGLED MENU ITEM :", toggledMenuItem.submenus);
  }, [dropdownToggle, toggledMenuItem]);

  return (
    <div className="relative">
      <div className="navbar bg-base-200 p-0">
        <div className="navbar-start">
          <a className="text-lg px-2 bg-shopPrimaryColor py-[16.5px] h-full text-white">
            All Categories
          </a>
        </div>
        <div className="navbar-center gap-4">
          {menuData?.map((menuItem) => (
            <div
              onMouseEnter={() => handleDropdownEnter(menuItem)}
              onMouseLeave={handleDropdownLeave}
              key={nanoid()}
            >
              <h1 className="text-xs">{menuItem.title}</h1>
              <div></div>
            </div>
          ))}
        </div>
        <div className="navbar-end"></div>
      </div>

      {dropdownToggle && (
        <div className="w-full z-50 flex justify-center fixed  left-0 right-0 transition">
          <div
            id="toggled-menu"
            className=" p-4 bg-violet-400   mt-4 rounded-xl px-16 w-3/4 "
          >
            <div className="grid grid-cols-5">
              {toggledMenuItem.submenus.map((submenu) => {
                return (
                  <div key={nanoid()}>
                    <Link
                      to={submenu.link}
                      className="text-md hover:bg-base-100 text-shopPrimaryColor rounded-full px-2 py-1 cursor-pointer"
                    >
                      {submenu.title}
                    </Link>
                    <div>
                      {submenu.child && (
                        <div className="flex flex-col gap-2">
                          {submenu.child.map((childItem) => {
                            return (
                              <Link
                                to={childItem.link}
                                className="text-xs pl-2 px-2 py-1 hover:bg-base-200 hover:rounded-lg cursor-pointer text-white hover:text-shopPrimaryColor"
                                key={nanoid()}
                              >
                                {childItem.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopNavbar;
