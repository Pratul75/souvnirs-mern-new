import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
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
const SouvnirsHeader = ({ badgeColor, buttonColor }) => {
  const token = localStorage.getItem("token");
  console.log("SouvnirsHeader.jsx", token);
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
  console.log("SouvnirsHeader.jsx", productsList);

  console.log("SouvnirsHeader.jsx", refresh);
  const getWishlistData = async () => {
    const response = await API_WRAPPER.get("/wishlist/getmywishlist");
    console.log("ShopNavbar.jsx", response);
    setWishlistItems(response.data.data.wishlist);
  };

  const getCartItems = async () => {
    const response = await API_WRAPPER.get("/cart/mycart");
    console.log("wishlist.jsx", response);
    setcartItems(response.data);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchInput") {
      setSearchInput(value);
    } else if (name === "selectedFilter") {
      setSelectedFilter(value);
    }
  };
  useEffect(() => {
    if (token) {
      getWishlistData();
      getCartItems();
    }
  }, [refresh]);
  console.log("SouvnirsHeader.jsx", wishlistItems);
  return (
    <>
      {/* // desktop header */}
      <header className="py-4 hidden md:block">
        <div className="flex flex-col md:flex-row justify-between items-center px-16">
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
              <button className={`btn ${buttonColor} join-item rounded-none`}>
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
              </div>
            ) : (
              <>
                <Link to={PATHS.login}>Login</Link>
                <Link to={PATHS.register}>Register</Link>|
              </>
            )}

            <div className="tooltip tooltip-bottom" data-tip="Wishlist">
              <div
                className={`indicator-item badge ${badgeColor} badge-xs absolute p-2`}
              >
                {" "}
                {wishlistItems && wishlistItems?.length}
              </div>
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
      <header className="md:hidden grid grid-flow-col gap-4 place-items-center mt-4">
        <div className="flex gap-1">
          <AiOutlineShoppingCart className="text-2xl" />
          <AiOutlineHeart className="text-2xl text-rose-600" />
        </div>
      </header>
    </>
  );
};

SouvnirsHeader.propTypes = {
  badgeColor: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
};

export default SouvnirsHeader;
