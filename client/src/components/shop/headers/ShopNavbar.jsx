import { Menu } from "antd";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RequestQuoteForm from "../components/RequestQuoteForm";

const ShopNavbar = () => {
  // navbar data stored here in navbarData state
  const [navbarData, setNavbarData] = useState([]);
  const [categories, setCategories] = useState([]);
  const getNavbarData = async () => {
    const response = await API_WRAPPER.get("/getNavbarMenu");
    if (response.status === 200) {
      setNavbarData(response.data);
      console.log("NAVBAR DATA: ", response.data);
    }
  };

  const getAllCategories = async () => {
    const response = await API_WRAPPER.get("/category/get-all-categories");
    if (response.status === 200) {
      setCategories(response.data);
      console.log("CATEGORIES DATA: ", response.data);
    }
  };

  const categoriesItems = (categoryList) => {
    const items = categoryList.map((category) => {
      return { label: category.name, key: category.name };
    });
    return items;
  };

  useEffect(() => {
    getNavbarData();
    getAllCategories();
  }, []);

  const renderSubmenus = (submenus) => {
    return submenus.map((submenu) => (
      <Link to={`${window.location.origin}/${submenu.link}`} key={submenu._id}>
        <Menu.SubMenu
          title={submenu.title}
          icon={submenu.child && submenu.child.length > 0 ? submenu.icon : null}
        >
          {submenu.child && submenu.child.length > 0
            ? renderSubmenus(submenu.child)
            : null}
        </Menu.SubMenu>
      </Link>
    ));
  };

  return (
    <div className="flex justify-between gap-5">
      <Menu
        className="bg-shopPrimaryColor border-b-white border-b-0 w-40  text-white"
        mode="horizontal"
        style={{ activeBarBorderWidth: 0 }}
        items={[
          {
            label: "All Categories",
            key: "all_categories",
            children: categoriesItems(categories),
          },
        ]}
      />
      <Menu
        mode="horizontal"
        style={{ borderBottom: "none" }}
        className="w-full"
      >
        {navbarData.map((menu) => (
          <Menu.SubMenu
            key={menu._id}
            title={menu.title}
            icon={menu.submenus && menu.submenus.length > 0 ? menu.icon : null}
          >
            {menu.submenus && menu.submenus.length > 0
              ? renderSubmenus(menu.submenus)
              : null}
          </Menu.SubMenu>
        ))}
      </Menu>
      <button
        onClick={() => window.request_quote_modal.showModal()}
        className="btn"
      >
        Request Quote
      </button>
      <RequestQuoteForm />
    </div>
  );
};

export default ShopNavbar;
