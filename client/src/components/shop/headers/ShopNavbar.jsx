import { BsChevronDown, BsHeadphones } from "react-icons/bs";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineRequestQuote } from "react-icons/md";
import RequestQuoteForm from "../components/RequestQuoteForm";
const ShopNavbar = () => {
  const [navbarData, setNavbarData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState("dropdown-content");
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
      <ul className="flex flex-wrap w-[500px] relative   dropdown-content shadow bg-red-100 z-[1]">
        <div className="grid grid-cols-4 menu border border-base relative flex-wrap w-full">
          {subMenu.map((submenu) => (
            <span className="border dropdown dropdown-hover   border-gray-300" key={submenu._id}>
              <summary>
                <Link
                  tabIndex={0}
                  to={`${window.location.origin}/${submenu.link}`}
                  className="  font-semibold block hover:bg-gray-100 hover:text-primary text-sm col-span-1"
                >
                  {/* {submenu.title} */}
                  {submenu.title}
                </Link>
              </summary>
              {submenu.child && submenu.child.length > 0 && (
                <ul className="z-20  bg-white ">
                  {submenu.child.map((child) => (
                    <li key={child._id}>
                      <Link
                        to={`${window.location.origin}/${child.link}`}
                        className="block dropdown-content p-1 hover:bg-gray-100 hover:text-primary text-xs"
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </span>
          ))}
        </div>
      </ul>
    );
  };

  return (
    <nav className="w-full md:justify-between md:items-center border-b-2  hidden md:flex bg-green-500">
      <div className="join w-full flex items-center">
        <div
          className={`dropdown ${open} join-item relative dropdown-hover dropdown-right dropdown-bottom`}
        >
          <label
            tabIndex={1}
            className=" flex items-center gap-4 bg-shopPrimaryColor w-full h-full p-4 text-white rounded-none"
          >
            All Categories
            <BsChevronDown className="" />
          </label>
          <ul
            tabIndex={1}
            className={
              "dropdown-content p-2 w-96 shadow bg-base-100 z-50  max-h-96 overflow-y-auto right-0"
            }
          >
            {categories.map((category) => (
              <li
                onClick={() => {
                  setOpen("");
                  navigate(`/category/${category.name}`);
                }}
                key={category._id}
                className="p-2 hover:bg-violet-200 cursor-pointer rounded-xl"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {navbarData?.map((mainmenu) => (
          <div
            key={mainmenu._id}
            className="dropdown dropdown-hover  relative join-item"
          >
            <label
              tabIndex={0}
              className=" m-1 cursor-pointer flex items-center mx-2"
            >
              <span className="text-xs hover:text-shopPrimaryColor hover:bg-base-200 px-2 py-1 rounded-full hover:scale-105 transition duration-300">
                {mainmenu.title}
              </span>
              {/* {mainmenu.submenus && mainmenu.submenus.length > 0 && (
                <BsChevronDown className="ml-1" />
              )} */}
            </label>
            {mainmenu.submenus &&
              mainmenu.submenus.length > 0 &&
              renderSubMenu(mainmenu.submenus)}
          </div>
        ))}
      </div>

      {/* ! need to create new  */}
      <div className="flex gap-4">
        <div
          className="flex  items-center  gap-4"
          onClick={() => window.request_quote_modal.showModal()}
        >
          <MdOutlineRequestQuote className="text-xl" />
          <span className="text-xs btn btn-ghost mr-10">Request Quote</span>
        </div>
        <button className="w-full flex gap-2">
          <BsHeadphones className="text-primary text-3xl" />
          <div className="flex flex-col w-[100px]">
            <span className="text-xs">CALL US 24/7</span>
            <span className="text-xs text-primary">+00 123 456 789</span>
          </div>
        </button>
      </div>

      {/* request quote modal */}
      <RequestQuoteForm />
    </nav>
  );
};

export default ShopNavbar;
