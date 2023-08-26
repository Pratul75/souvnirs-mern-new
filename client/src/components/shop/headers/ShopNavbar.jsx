import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
const ShopNavbar = () => {
  const [menuData, setMenuData] = useState([]);
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

  const renderChildMenu = (childMenu) => {
    return (
      <ul className="pl-4 mt-2 space-y-1">
        {childMenu.map((childItem) => (
          <li key={childItem._id} className="hover:text-blue-500">
            <a href={childItem.link}>{childItem.title}</a>
          </li>
        ))}
      </ul>
    );
  };

  const renderSubMenu = (subMenu) => {
    return (
      <div className="py-2 px-4  block">
        <details className="">
          <summary className="font-semibold">{subMenu.title}</summary>
          {subMenu.child.length > 0 && renderChildMenu(subMenu.child)}
        </details>
      </div>
    );
  };

  const renderMenu = (menu) => {
    return (
      <li key={menu._id} className="relative group menu">
        <a
          href={menu.link}
          className="block py-2 px-4 hover:bg-blue-100 transition duration-300"
        >
          {menu.title}
        </a>
        {menu.submenus.length > 0 && (
          <div className="hidden group-hover:block w-96 absolute left-full top-0 mt-1    z-10 p-2 rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between flex-wrap">
              {menu.submenus.map((subMenu) => (
                <div key={subMenu._id} className="w-1/2 p-2">
                  <a
                    href={subMenu.link}
                    className="block py-2 px-4 hover:bg-blue-100 transition duration-300"
                  >
                    {subMenu.child.length > 0 ? null : subMenu.title}
                  </a>
                  {subMenu.child.length > 0 && renderSubMenu(subMenu)}
                </div>
              ))}
            </div>
          </div>
        )}
      </li>
    );
  };

  return (
    <nav className=" py-4 flex items-center">
      <div className="container mx-auto ">
        <ul className="flex  ">{menuData.map((menu) => renderMenu(menu))}</ul>
      </div>
    </nav>
  );
};

export default ShopNavbar;
