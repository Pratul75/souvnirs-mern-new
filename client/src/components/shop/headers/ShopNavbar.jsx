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
      <div className="py-2 px-4 w-96 grid grid-cols-2 bg-gray-100">
        <details className="">
          <summary className="font-semibold">{subMenu.title}</summary>
          {subMenu.child.length > 0 && renderChildMenu(subMenu.child)}
        </details>
      </div>
    );
  };

  const renderMenu = (menu) => {
    return (
      <li key={menu._id} className="relative group">
        <a
          href={menu.link}
          className="block py-2 px-4 hover:bg-blue-100 transition duration-300"
        >
          {menu.title}
        </a>
        {menu.submenus.length > 0 && (
          <div className="hidden group-hover:block absolute left-full top-0 mt-1 bg-white border border-gray-300 shadow-lg z-10 p-2 rounded-lg">
            {menu.submenus.map((subMenu) => (
              <div key={subMenu._id}>
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
        )}
      </li>
    );
  };

  return (
    <nav className="bg-gray-200 py-4 flex items-center">
      <div className="container mx-auto">
        <ul className="flex ">{menuData.map((menu) => renderMenu(menu))}</ul>
      </div>
    </nav>
  );
};

export default ShopNavbar;
