import { Menu } from "antd";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ShopNavbar = () => {
  // navbar data stored here in navbarData state
  const [navbarData, setNavbarData] = useState([]);
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

  // Recursive function to render nested submenus
  const renderSubmenus = (submenus) => {
    return submenus.map((submenu) => (
      <Link to={`${window.location.origin}/${submenu.link}`} key={submenu._id}>
        <Menu.SubMenu
          title={submenu.title}
          // icon={submenu.child && submenu.child.length > 0 ? submenu.icon : null}
        >
          {submenu.child && submenu.child.length > 0
            ? renderSubmenus(submenu.child) // Render nested child menus
            : null}
        </Menu.SubMenu>
      </Link>
    ));
  };

  return (
    <div>
      <Menu mode="horizontal">
        {navbarData.map((menu) => (
          <Menu.SubMenu
            key={menu._id}
            title={menu.title}
            // icon={menu.submenus && menu.submenus.length > 0 ? menu.icon : null}
          >
            {menu.submenus && menu.submenus.length > 0
              ? renderSubmenus(menu.submenus) // Render submenus with nested children
              : null}
          </Menu.SubMenu>
        ))}
      </Menu>
    </div>
  );
};

export default ShopNavbar;
