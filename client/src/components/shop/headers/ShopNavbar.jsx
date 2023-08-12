import { BsChevronDown } from "react-icons/bs";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";

const ShopNavbar = () => {
  const [navbarData, setNavbarData] = useState([]);
  const location = useLocation();
  console.log("LOCATION OBJ: ", location);
  const navigate = useNavigate();

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
      <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 overflow-y-auto max-h-[20rem] absolute left-0 mt-1">
        {subMenu.map((submenu) => (
          <li key={submenu._id}>
            <Link
              to={`${window.location.origin}/${submenu.link}`}
              className="font-bold block py-2 px-3 hover:bg-gray-100 hover:text-primary"
            >
              {submenu.title}
            </Link>
            {submenu.child && submenu.child.length > 0 && (
              <ul className="sub-submenu pl-2">
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
