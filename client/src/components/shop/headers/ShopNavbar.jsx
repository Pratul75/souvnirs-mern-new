import React, { useState } from "react";
import { Menu, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchNavbarData, fetchCategoryData } from "../../../api/apiCalls";
const ShopNavbar = () => {
  const [current, setCurrent] = useState("mail");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  // get navbar data
  const { data: navbarData } = useQuery("get-navbar-data", fetchNavbarData);
  // get category data
  const { data: categoryData } = useQuery(
    "get-category-data",
    fetchCategoryData
  );

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleSearch = (value) => {
    // Update the search value state when the user types in the search input
    setSearchValue(value);
  };

  const renderSubMenuItems = (menuData) => {
    menuData?.sort((a, b) => (a.position || 0) - (b.position || 0));

    return menuData?.map((menuItem) => {
      if (menuItem.submenus && menuItem.submenus.length > 0) {
        return (
          <Menu.SubMenu
            className="font-normal"
            key={menuItem._id}
            title={menuItem.title.toUpperCase()}
          >
            {menuItem.submenus.map((submenuItem) => (
              <React.Fragment key={submenuItem._id}>
                {submenuItem.child && submenuItem.child.length > 0 ? (
                  // render child submenu if children exist
                  <Menu.SubMenu
                    className="flex"
                    key={submenuItem._id}
                    title={submenuItem.title}
                    icon={
                      submenuItem.child.length > 0 ? <span>&rarr;</span> : null
                    }
                  >
                    {submenuItem.child.map((childItem) => (
                      <Menu.Item key={childItem._id}>
                        <button
                          onClick={() => {
                            navigate(`/${childItem.link} `);
                            window.location.reload();
                          }}
                          // to={`${window.location.origin}/${childItem.link}`}
                        >
                          {childItem.title}
                        </button>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  // Render a plain menu item with a link if no children exist
                  <Menu.Item className="cursor-pointer" key={submenuItem._id}>
                    <button
                      onClick={() => {
                        navigate(`/${submenuItem.link} `);
                        window.location.reload();
                      }}
                      // to={`${window.location.origin}/${childItem.link}`}
                    >
                      {submenuItem.title}
                    </button>
                  </Menu.Item>
                )}
              </React.Fragment>
            ))}
          </Menu.SubMenu>
        );
      } else if (menuItem.link) {
        // Check if there's a link for the main menu item
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

  const categoryMenu = () => {
    return (
      <Select
        className="w-[20vw]"
        showSearch
        placeholder="Select a category"
        optionFilterProp="value"
        filterOption={(input, option) =>
          option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        onSearch={handleSearch}
        value={searchValue}
        labelInValue // Enable labelInValue to include labels for options
        optionLabelProp="All Categories" // Specify which prop to use as the label
      >
        {categoryData?.data?.map((category) => (
          <Select.Option
            key={category._id}
            value={category.name}
            label={category.label}
          >
            <button
              className="hover:text-blue-500 w-full h-full"
              onClick={() => navigate(`/category/${category?.name}`)}
            >
              {category.name}
            </button>
          </Select.Option>
        ))}
      </Select>
    );
  };

  return (
    <div className="flex">
      <Menu
        className="bg-gray-50 join w-full rounded-none hidden md:flex items-center"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
      >
        {categoryMenu()}
        {renderSubMenuItems(navbarData?.data)}
      </Menu>
    </div>
  );
};

export default ShopNavbar;
