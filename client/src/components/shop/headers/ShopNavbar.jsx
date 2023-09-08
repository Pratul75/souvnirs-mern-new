import { Menu } from "antd";
import API_WRAPPER from "../../../api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineCall } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  contact: yup.string().required("Contact details are required"),
  company: yup.string().required("Company details are required"),
  city: yup.string().required("City is required"),
});

const ShopNavbar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);
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
        onClick={() => document.getElementById("freeConsultation").showModal()}
        className="btn bg-shopPrimaryColor rounded-none text-white hover:bg-purple-900"
      >
        Free gift consultation
      </button>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="freeConsultation" className="modal">
        <form className="modal-box">
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold">Contact us</h3>
              <br />
            </div>
            <div className="flex gap-4">
              <div
                className="tooltip tooltip-primary tooltip-bottom"
                data-tip="Whatsaap"
              >
                <button className="btn bg-green-500 text-white btn-circle hover:bg-green-600 hover:scale-105 hover:btn-square transition">
                  <FaWhatsapp size={30} />
                </button>
              </div>
              <div
                className="tooltip tooltip-primary tooltip-bottom"
                data-tip="Call"
              >
                <button className="btn bg-blue-500 text-white btn-circle hover:bg-blue-600 hover:scale-105 hover:btn-square transition">
                  <MdOutlineCall size={30} />
                </button>
              </div>
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              className="input input-primary"
              placeholder="Enter your name"
              type="text"
              name="name"
              id=""
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact</span>
            </label>
            <input
              {...register("contact")}
              className="input input-primary"
              placeholder="Enter your contact details"
              type="tel"
              name="contact"
              id=""
            />
            <p className="text-red-500">{errors.name?.contact}</p>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Company Details</span>
            </label>
            <input
              {...register("company")}
              className="input input-primary"
              placeholder="Enter your company details"
              type="text"
              name="company"
              id=""
            />
            <p className="text-red-500"></p>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              {...register("city")}
              className="input input-primary"
              placeholder="Enter your City"
              type="text"
              name="city"
              id=""
            />
          </div>
          <div className="modal-action">
            <div>
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary mr-4">Requesty Meeting</button>
              <button className="btn">Close</button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ShopNavbar;
