import { BsChevronDown, BsHeadphones } from "react-icons/bs";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineRequestQuote } from "react-icons/md";
import RequestQuoteForm from "../components/RequestQuoteForm";
const ShopNavbar = () => {
  const [navbarData, setNavbarData] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  console.log("LOCATION OBJ: ", location);

  const getNavbarData = async () => {
    const response = await API_WRAPPER.get("/getNavbarMenu");
    if (response.status === 200) {
      setNavbarData(response.data);
      console.log("NAVBAR DATA: ", response.data);
    }
  };
  const getCategories = async () => {
    const response = await API_WRAPPER.get("/category/get-all-categories");
    console.log("ShopNavbar.jsx", response);
    setCategories(response.data);
  };

  useEffect(() => {
    getNavbarData();
    getCategories();
  }, []);

  const renderSubMenu = (subMenu) => {
    return (
      <ul className="w-96 max-w-[1200px] flex-wrap menu dropdown-content flex flex-row  p-2 shadow bg-base-100 z-[1] rounded-box">
        {subMenu.map((submenu) => (
          <li key={submenu._id}>
            <Link
              to={`${window.location.origin}/${submenu.link}`}
              className="font-bold block py-2 px-3 hover:bg-gray-100 hover:text-primary"
            >
              {submenu.title}
            </Link>
            {submenu.child && submenu.child.length > 0 && (
              <ul className="menu pl-2">
                {submenu.child.map((child) => (
                  <li key={child._id}>
                    <Link
                      to={`${window.location.origin}/${child.link}`}
                      className="block py-1 px-2 hover:bg-gray-100 hover:text-primary"
                    >
                      {child.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="mx-16  md:justify-between md:items-center px-4 w-full border-[1px] bg-base-200 hidden md:flex">
      <div className="join w-full">
        <div className="dropdown join-item relative dropdown-hover">
          <label tabIndex={1} className="m-1 btn btn-primary">
            All Categories
            <BsChevronDown className="ml-1" />
          </label>

          <ul
            tabIndex={1}
            className="dropdown-content p-2 relative shadow bg-base-100 z-50 w-52 max-h-96 overflow-y-auto"
          >
            {categories.map((category) => (
              <li
                key={category._id}
                className="p-2 hover:bg-yellow-200 cursor-pointer"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {navbarData?.map((mainmenu) => (
          <div
            key={mainmenu._id}
            className="dropdown dropdown-hover join-item relative"
          >
            <label tabIndex={0} className="btn m-1 cursor-pointer">
              {mainmenu.title}
              {mainmenu.submenus && mainmenu.submenus.length > 0 && (
                <BsChevronDown className="ml-1" />
              )}
            </label>
            {mainmenu.submenus &&
              mainmenu.submenus.length > 0 &&
              renderSubMenu(mainmenu.submenus)}
          </div>
        ))}
      </div>

      <div className="flex justify-end w-full">
        <div className="flex justify-between gap-4">
          <button
            onClick={() => window.request_quote_modal.showModal()}
            className="btn"
          >
            <MdOutlineRequestQuote className="text-3xl" />
            Request Quote
          </button>
          <button className="btn flex gap-2">
            <BsHeadphones className="text-primary text-3xl" />
            <div className="flex flex-col">
              <span className="text-xs">CALL US 24/7</span>
              <span className="text-xs text-primary">+00 123 456 789</span>
            </div>
          </button>
        </div>
      </div>

      {/* request quote modal */}
      <RequestQuoteForm />
    </div>
  );
};

export default ShopNavbar;
