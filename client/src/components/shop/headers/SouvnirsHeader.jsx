import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import {
  AiOutlineHeart,
  AiOutlineLogin,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import SouvnirsLogoImage from "../../../assets/images/souvnirsLogo.png";
import useCategories from "../../../hooks/useCategories";
import useProducts from "../../../hooks/useProducts";
import useCollections from "../../../hooks/useCollections";
import { RxHamburgerMenu } from "react-icons/rx";
import API_WRAPPER from "../../../api";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { GrFormClose } from "react-icons/gr";
import { Menu } from "antd";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
const SouvnirsHeader = ({ badgeColor, buttonColor }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState();
  const [cartItems, setcartItems] = useState();
  const categoriesList = useCategories();
  const productsList = useProducts();
  const collectionList = useCollections();
  const refresh = useSelector((state) => state.appConfig.refresh);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [navbarData, setNavbarData] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const getWishlistData = async () => {
    const response = await API_WRAPPER.get("/wishlist/getmywishlist");
    setWishlistItems(response.data.data.wishlist);
  };

  const getCartItems = async () => {
    const response = await API_WRAPPER.get("/cart/mycart");
    setcartItems(response.data);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchInput") {
      setSearchInput(value);
    } else if (name === "selectedFilter") {
      setSelectedFilter(value);
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      if (selectedFilter === "productInfo") {
        const filteredProducts = productsList.filter((product) => {
          return product.name.toLowerCase().includes(searchInput.toLowerCase());
        });
        setFilteredProducts(filteredProducts);
      }
      if (selectedFilter === "collection") {
        const filteredCollections = collectionList.filter((collection) => {
          return collection.title
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
        setFilteredProducts(filteredCollections);
      }
      if (selectedFilter === "category") {
        const filteredCategories = categoriesList.filter((category) => {
          return category.name
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
        setFilteredProducts(filteredCategories);
      }
    };

    applyFilters();
  }, [
    searchInput,
    selectedFilter,
    productsList,
    collectionList,
    categoriesList,
  ]);

  const getNavbarData = async () => {
    try {
      const response = await API_WRAPPER.get("/getNavbarMenu");
      if (response.status === 200) {
        setNavbarData(response.data);
        console.log("NAVBAR DATA: ", response.data);
      }
    } catch (error) {
      console.error("Error fetching navbar data: ", error);
    }
  };

  useEffect(() => {
    getNavbarData();
  }, []);

  useEffect(() => {
    if (token) {
      getWishlistData();
      getCartItems();
    }
  }, [refresh]);
  const [openSubmenus, setOpenSubmenus] = useState({});

  const renderSubMenuItems = (menuData) => {
    const handleSubmenuClick = (key) => {
      setOpenSubmenus((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    };
    return menuData.map((menuItem) => {
      if (menuItem.submenus && menuItem.submenus.length > 0) {
        const isSubmenuOpen = openSubmenus[menuItem._id];

        return (
          <Menu.SubMenu
            className="font-normal"
            key={menuItem._id}
            title={menuItem.title.toUpperCase()}
            icon={
              isSubmenuOpen ? <CaretDownOutlined /> : <CaretRightOutlined />
            }
            onTitleClick={() => handleSubmenuClick(menuItem._id)}
          >
            {menuItem.submenus.map((submenuItem) => (
              <React.Fragment key={submenuItem._id}>
                {submenuItem.child && submenuItem.child.length > 0 ? (
                  // render child submenu if children exist
                  <Menu.SubMenu
                    key={submenuItem._id}
                    title={submenuItem.title}
                    icon={
                      submenuItem.child.length > 0 ? (
                        <CaretDownOutlined /> // Change to your open icon
                      ) : null
                    }
                    onTitleClick={() => handleSubmenuClick(submenuItem._id)}
                  >
                    {submenuItem.child.map((childItem) => (
                      <Menu.Item key={childItem._id}>
                        <Link
                          to={`${window.location.origin}/${childItem.link}`}
                        >
                          {childItem.title}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  // Render a plain menu item with a link if no children exist
                  <Menu.Item className="cursor-pointer" key={submenuItem._id}>
                    <Link to={`${window.location.origin}/${submenuItem.link}`}>
                      {submenuItem.title}
                    </Link>
                  </Menu.Item>
                )}
              </React.Fragment>
            ))}
          </Menu.SubMenu>
        );
      } else if (menuItem.link) {
        // Check if there's a link for the main menu item
        return (
          <Menu.SubMenu key={menuItem._id}>
            <Link to={`${window.location.origin}/${menuItem.link}`}>
              {menuItem.title}
            </Link>
          </Menu.SubMenu>
        );
      } else {
        return (
          <Menu.SubMenu
            onClick={() => console.log("CLICKED ON SUB MENU")}
            key={menuItem._id}
          >
            {menuItem.title}
          </Menu.SubMenu>
        );
      }
    });
  };

  return (
    <>
      {/* // desktop header */}
      <header className="py-4 hidden md:block">
        <div className="flex flex-col md:flex-row justify-between items-center px-5">
          <Link to={PATHS.landingPage} className="cursor-pointer">
            <img src={SouvnirsLogoImage} alt="souvnirs logo" />
          </Link>
          <div className="join relative">
            {searchInput.length > 0 && (
              <div
                id="filtered-products-list"
                className="bg-base-100 shadow-xl rounded-xl absolute top-14 w-full z-50 p-4 overflow-y-scroll h-60"
              >
                <div className="flex justify-between">
                  <span>Search by: {searchInput}</span>
                  <span>Filter by: {selectedFilter.toUpperCase()}</span>
                </div>
                <div>
                  {selectedFilter === "" ? (
                    <p className="text-center text-error">
                      Select a filter first
                    </p>
                  ) : (
                    filteredProducts.map((filteredProduct) => (
                      <h5
                        className="py-2 px-2 hover:bg-base-200 cursor-pointer"
                        key={nanoid()}
                        onClick={() => {
                          navigate(
                            selectedFilter === "collection"
                              ? `/${selectedFilter}/${filteredProduct.title}`
                              : selectedFilter === "productInfo"
                              ? `/${selectedFilter}/${filteredProduct.slug}`
                              : `/${selectedFilter}/${filteredProduct.name}`
                          );
                          setSearchInput("");
                          // navigate(0);
                        }}
                      >
                        {selectedFilter === "collection"
                          ? filteredProduct.title
                          : selectedFilter === "category"
                          ? filteredProduct.name
                          : filteredProduct.name}
                      </h5>
                    ))
                  )}
                </div>
              </div>
            )}
            <div>
              <div>
                <input
                  value={searchInput}
                  onChange={handleInputChange}
                  name="searchInput"
                  className="input w-96 input-bordered join-item rounded-none"
                  placeholder="Search products"
                />
              </div>
            </div>
            <select
              onChange={handleInputChange}
              name="selectedFilter"
              className="select select-bordered join-item"
              value={selectedFilter}
            >
              <option value="">Filter</option>
              <option value="productInfo">Products</option>
              <option value="category">Category</option>
              <option value="collection">Collection</option>
              <option value="vendor">Vendor</option>
            </select>
            <div className="indicator">
              <button
                className={`btn ${buttonColor} join-item rounded-none hover:bg-shopPrimaryColor`}
              >
                <CiSearch color="white" className="text-2xl" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {token && token.length > 0 ? (
              <div className="flex gap-4">
                <div className="tooltip tooltip-bottom" data-tip="dashboard">
                  <Link
                    to={PATHS.adminDashboard}
                    className="btn btn-primary btn-square btn-sm"
                  >
                    <RiDashboardLine className="text-2xl" />
                  </Link>
                </div>
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate(PATHS.login);
                  }}
                >
                  Logout
                </button>
                <div className="divider-horizontal divide-teal-500"></div>
              </div>
            ) : (
              <>
                <Link className="link" to={PATHS.login}>
                  Login
                </Link>
                <Link className="link" to={`${PATHS.register}?sell=true`}>
                  Sell on Souvnirs
                </Link>
              </>
            )}

            <div className="tooltip tooltip-bottom" data-tip="Wishlist">
              <div
                className={`indicator-item badge ${badgeColor} badge-xs absolute p-2`}
              >
                {" "}
                {wishlistItems && wishlistItems?.length}
              </div>
              <div>{/* add dark mode toggle */}</div>

              <Link to={PATHS.shopWishlist} className="btn btn-circle">
                <AiOutlineHeart className="text-2xl cursor-pointer" />
              </Link>
            </div>
            <div className="indicator">
              <div
                className={`indicator-item badge ${badgeColor} badge-xs absolute p-2`}
              >
                {cartItems && cartItems.length}
              </div>
              <div className="tooptip tooltip-bottom" data-tip="Cart">
                <Link to={PATHS.cartPage} className="btn btn-circle">
                  <FiShoppingBag className="text-2xl cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* mobile header */}
      <header className="md:hidden flex justify-between px-8 mt-4">
        <div>
          <RxHamburgerMenu id="open-sidebar" onClick={toggleSidebar} />
        </div>
        <Link to={PATHS.landingPage} className="w-32">
          <img src={SouvnirsLogoImage} />
        </Link>
        <div className="flex gap-1">
          <AiOutlineShoppingCart className="text-2xl" />
          <AiOutlineHeart className="text-2xl text-rose-600" />
          <Link to={PATHS.login}>
            <AiOutlineLogin className="text-2xl text-shopPrimaryColor" />
          </Link>
        </div>
      </header>
      {/* Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeSidebar}
            className="fixed top-0 left-0 h-screen w-screen bg-transparent opacity-50 z-50 backdrop-blur-md"
          />
        )}
      </AnimatePresence>

      {/* sidebar state for ui  */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed w-screen top-0 left-0 bg-white shadow-lg overflow-y-auto z-50 h-screen  backdrop-blur-md opacity-80"
          >
            {/* Close sidebar button */}
            <div className="flex justify-between p-4">
              <Link to={PATHS.landingPage}>
                <img src={SouvnirsLogoImage} />
              </Link>
              <button className="btn btn-circle float-right mr-4">
                <GrFormClose
                  className="text-2xl cursor-pointer"
                  onClick={() => setIsSidebarOpen(false)}
                />
              </button>
            </div>

            <br />
            <Menu mode="inline" className="w-full overflow-y-auto">
              {renderSubMenuItems(navbarData)}
            </Menu>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

SouvnirsHeader.propTypes = {
  badgeColor: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
};

export default SouvnirsHeader;
