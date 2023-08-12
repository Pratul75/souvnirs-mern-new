import { BsChevronDown } from "react-icons/bs";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShopNavbar = () => {
  const [navbarData, setNavbarData] = useState([]);

  const getNavbarData = async () => {
    const response = await API_WRAPPER.get("/getNavbarMenu");
    if (response.status === 200) {
      setNavbarData(response.data);
    }
  };

  useEffect(() => {
    getNavbarData();
  }, []);

  const renderSubMenu = (subMenu) => {
    return (
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 overflow-y-auto max-h-[20rem]">
        {subMenu.map((submenu) => (
          <li key={submenu._id}>
            <Link
              to={submenu.link}
              className="font-bold block py-2 px-3 hover:bg-gray-100 hover:text-primary"
            >
              {submenu.title}
            </Link>
            {submenu.child && submenu.child.length > 0 && (
              <ul className="sub-submenu pl-2">
                {submenu.child.map((child) => (
                  <li key={child._id}>
                    <Link
                      to={child.link}
                      className="block py-1 px-2 hover:bg-gray-100 hover:text-primary"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mx-16 flex justify-between w-full border-[1px] bg-base-200">
      <div className="join">
        {navbarData?.map((mainmenu) => (
          <div
            key={mainmenu._id}
            className="dropdown dropdown-hover join-item relative"
          >
            <label tabIndex={0} className="btn m-1 cursor-pointer">
              {mainmenu.title}
              {mainmenu.submenus && mainmenu.submenus.length > 0 && (
                <BsChevronDown className="ml-1" />
              )}
            </label>
            {mainmenu.submenus &&
              mainmenu.submenus.length > 0 &&
              renderSubMenu(mainmenu.submenus)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopNavbar;
