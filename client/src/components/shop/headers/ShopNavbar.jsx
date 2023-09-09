import { useEffect, useState } from "react";
import { Menu, Dropdown, Select } from "antd";
import API_WRAPPER from "../../../api";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";

const ShopNavbar = () => {
  const [current, setCurrent] = useState("mail");
  const [navbarData, setNavbarData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const { Option } = Select;
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const getNavbarData = async () => {
    const response = await API_WRAPPER.get("/getNavbarMenu");
    if (response.status === 200) {
      setNavbarData(response.data);
    }
  };

  const fetchCategoryData = async () => {
    const response = await API_WRAPPER.get("/category/get-all-categories");
    if (response.status === 200) {
      setCategoriesData(response.data);
    }
  };

  useEffect(() => {
    getNavbarData();
    fetchCategoryData();
  }, []);

  const renderSubMenuItems = (menuData) => {
    return menuData.map((menuItem) => {
      if (menuItem.submenus && menuItem.submenus.length > 0) {
        return (
          <Menu.SubMenu
            className="join-item font-normal"
            key={menuItem._id}
            title={menuItem.title.toUpperCase()}
          >
            {menuItem.submenus.map((submenuItem) => (
              <Menu.SubMenu
                className="flex justify-center items-center"
                key={submenuItem._id}
                title={submenuItem.title}
                icon={submenuItem.child.length > 0 ? <span>&rarr;</span> : null}
              >
                {submenuItem.child.map((childItem) => (
                  <Menu.Item key={childItem._id}>
                    <a href={childItem.link}>{childItem.title}</a>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.Item key={menuItem._id}>
            <a href={menuItem.link}>{menuItem.title}</a>
          </Menu.Item>
        );
      }
    });
  };

  const categoryMenu = (
    <Select
      showSearch
      style={{ width: "100%" }}
      placeholder="Select a category"
      optionFilterProp="children"
    >
      {categoriesData.map((category) => (
        <Option key={category._id} value={category.name}>
          <Link to={`${window.location.origin}/category/${category?.name}`}>
            {category.name}
          </Link>
        </Option>
      ))}
    </Select>
  );

  return (
    <Menu
      className="bg-gray-100 join w-full rounded-none"
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Dropdown overlay={categoryMenu} trigger={["hover"]}>
        <button className="join-item dropdown flex items-center justify-between rounded-none h-full bg-shopPrimaryColor text-white px-4 w-52">
          <TfiMenuAlt />
          All Categories
          <RiArrowDropDownLine size={24} />
        </button>
      </Dropdown>

      {renderSubMenuItems(navbarData)}
    </Menu>
  );
};

export default ShopNavbar;
