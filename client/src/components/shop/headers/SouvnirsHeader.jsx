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
import API_WRAPPER, { API_TOKEN } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { GrFormClose } from "react-icons/gr";
import { Menu } from "antd";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import { LoadingComponent } from "../../LoadinComponent/LoadingComponent";
import { toggleDarkMode } from "../../../features/appConfig/appSlice";
const SouvnirsHeader = ({ badgeColor, buttonColor }) => {
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("role"));

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
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(0);

  const darkModeToggle = useSelector((x) => x.appConfig.darkMode);
  const dispatch = useDispatch();

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

  const getDataByFilter = async () => {
    try {
      setLoading(true);
      const result = await API_WRAPPER.get(
        `/get/search/product/list?seacrhText=${searchInput}&page=${page}`
      );
      setLoading(false);
      setTotalPages(result?.data?.totalPages);
      // setFilteredProducts([...filteredProducts, ...result?.data?.products]);
      setFilteredProducts(result?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const applyFilters = () => {
      if (selectedFilter === "productInfo") {
        getDataByFilter();
      }
      if (selectedFilter === "collection") {
        setLoading(true);
        const filteredCollections = collectionList.filter((collection) => {
          return collection.title
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
        setLoading(false);
        setFilteredProducts(filteredCollections);
      }
      if (selectedFilter === "category") {
        setLoading(true);
        const filteredCategories = categoriesList.filter((category) => {
          return category.name
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
        setLoading(false);
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
    page,
  ]);

  const getNavbarData = async () => {
    try {
      const response = await API_TOKEN.get("/getNavbarMenu");
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
                          onClick={() => setIsSidebarOpen(false)}
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
                    <Link
                      onClick={() => setIsSidebarOpen(false)}
                      to={`${window.location.origin}/${submenuItem.link}`}
                    >
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
                  ) : loading ? (
                    <LoadingComponent />
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
                  {selectedFilter === "productInfo" && totalPage > page ? (
                    <div className="text-center mt-2">
                      <button
                        onClick={() => setPage(page + 1)} // You can replace this with the desired navigation function
                        className="bg-primary text-white px-4 py-2 rounded-full"
                      >
                        View More
                      </button>
                    </div>
                  ) : null}
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
                    to={
                      role == "customer"
                        ? PATHS?.customerDashboard
                        : role == "vendor"
                        ? PATHS.vendorDashboard
                        : PATHS.adminDashboard
                    }
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
            <span
              onClick={() => dispatch(toggleDarkMode())}
              className="cursor-pointer"
            >
              {
                <label className="swap swap-rotate bg-base-200">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    onClick={() => dispatch(toggleDarkMode())}
                  />

                  {/* sun icon */}
                  {darkModeToggle && (
                    <svg
                      className=" bg-base-200 swap-on fill-current w-8 h-8"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                  )}
                  <svg
                    className="   bg-base-200 swap-off fill-current w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              }
            </span>
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
              <Link
                to={PATHS.landingPage}
                onClick={() => setIsSidebarOpen(false)}
              >
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
