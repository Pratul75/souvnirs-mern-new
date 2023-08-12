import { BsChevronDown } from "react-icons/bs";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ShopNavbar = () => {
  const [navbarData, setNavbarData] = useState([]);
  const location = useLocation();
  console.log("LOCATION OBJ: ", location);

  const getNavbarData = async () => {
    const response = await API_WRAPPER.get("/getNavbarMenu");
    if (response.status === 200) {
      setNavbarData(response.data);
      console.log("NAVBAR DATA: ", response.data);
    }
  };

  useEffect(() => {
    getNavbarData();
  }, []);

  const renderSubMenu = (subMenu) => {
    return (
      <ul className="w-96 max-w-[1200px] flex-wrap menu dropdown-content flex flex-row  p-2 shadow bg-base-100 z-[1] rounded-box">
        {subMenu.map((submenu) => (
          <li key={submenu._id}>
            <Link
              to={`${window.location.origin}/${submenu.link}`}
              className="font-bold block py-2 px-3 hover:bg-gray-100 hover:text-primary"
            >
              {submenu.title}
            </Link>
            {submenu.child && submenu.child.length > 0 && (
              <ul className="menu pl-2">
                {submenu.child.map((child) => (
                  <li key={child._id}>
                    <Link
                      to={`${window.location.origin}/${child.link}`}
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
