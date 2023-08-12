import { BsChevronDown } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
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
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        {subMenu.map((submenu) => (
          <li key={submenu._id}>
            <a className="font-bold">{submenu.title}</a>
            {submenu.child && submenu.child.length > 0 && (
              <ul className="sub-submenu">
                {submenu.child.map((child) => (
                  <li key={child._id}>
                    <a>{child.title}</a>
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
          <div key={mainmenu._id} className="dropdown join-item">
            <label tabIndex={0} className="btn m-1">
              {mainmenu.title}
              <BsChevronDown className="ml-1" />
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
