import { useEffect, useState } from "react";
import { Menu, Dropdown, Select } from "antd";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import API_WRAPPER from "../../../api";
import { TfiMenuAlt } from "react-icons/tfi";

const ShopNavbar = () => {
  const [current, setCurrent] = useState("mail");
  const [navbarData, setNavbarData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
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

  const handleSearch = (value) => {
    // Update the search value state when the user types in the search input
    setSearchValue(value);
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
                    <Link to={`${window.location.origin}/${childItem.link}`}>
                      {childItem.title}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ))}
          </Menu.SubMenu>
        );
      } else if (menuItem.link) {
        // Check if there's a link for the submenu item
        return (
          <Menu.Item key={menuItem._id}>
            <Link to={`${window.location.origin}/${menuItem.link}`}>
              {menuItem.title}
            </Link>
          </Menu.Item>
        );
      } else {
        return (
          <Menu.Item
            onClick={() => console.log("CLICKED ON SUB MENU")}
            key={menuItem._id}
          >
            {menuItem.title}
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
      optionFilterProp="value" // Use "value" instead of "children"
      filterOption={(input, option) =>
        option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      onSearch={handleSearch}
      value={searchValue}
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
