import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import { Header, Card } from "../../components";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { ToastContainer } from "react-toastify";
import { debouncedShowToast } from "../../utils";

const AddMainMenus = () => {
  const [menuHeaderTitlesList, setMenuHeaderTitlesList] = useState([]);
  const [subMenuToggle, setSubMenuToggle] = useState(false);
  const [mainMenuData, setMainMenuData] = useState({ title: "", type: "" });
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");

  const getAllMenuHeaderTitles = async () => {
    const response = await API_WRAPPER.get("/menu");
    if (response?.status === 200) {
      setMenuHeaderTitlesList(response?.data);
    }
  };

  const handleApiCalls = async () => {
    if (mainMenuData.type === "collection") {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (mainMenuData.type === "category") {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (mainMenuData.type === "productInfo") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (mainMenuData.type === "page") {
      // TODO: Handle page API call
    }
  };
  const navigate = useNavigate();
  console.log("AddMainMenus.jsx", selectedTypeDataValue);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMainMenuData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createMainMenu = async (e) => {
    e.preventDefault();
    try {
      const response = await API_WRAPPER.post("/main-menu/create", {
        ...mainMenuData,
        link: `${mainMenuData.type}/${selectedTypeDataValue}`,
      });
      debouncedShowToast("Main Menu Item Created Successfully", "success");
      console.log("AddMainMenus.jsx", response);
    } catch (e) {
      console.log("AddMainMenus.jsx", e);
      debouncedShowToast(e.response.data, "error");
    }
  };

  useEffect(() => {
    getAllMenuHeaderTitles();
  }, []);

  useEffect(() => {
    handleApiCalls();
  }, [mainMenuData.type]);

  return (
    <div>
      <Header heading="Add Main Menu" />
      <Card>
        <div className="mt-4 p-4">
          <form>
            <div className="form-control">
              <label htmlFor="menuTitle" className="label">
                <span className="label-text">Menu Title</span>
              </label>
              <select
                className="select select-primary"
                name="menuId"
                id="menuTitle"
                value={mainMenuData.menuId}
                onChange={(e) => handleInputChange(e)}
              >
                <option selected disabled>
                  Select Menu
                </option>
                {menuHeaderTitlesList &&
                  menuHeaderTitlesList.map((item) => (
                    <option value={item._id} key={nanoid()}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-control">
              <label htmlFor="isSubMenu" className="label">
                <span className="label-text">Create Sub Menu</span>
              </label>
              <input
                onChange={(e) => setSubMenuToggle(e.target.checked)}
                className="toggle toggle-primary"
                type="checkbox"
                name="isSubMenu"
                id="isSubMenu"
              />
            </div>
          </form>
          {subMenuToggle ? (
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Main Menu Heading</span>
                </label>
                <input
                  className="input input-primary"
                  type="text"
                  name="title"
                  id=""
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
              <div className="mt-4 w-[200px] form-control">
                <label className="label">
                  <span className="label-text">Link</span>
                  <span className="label-text-alt cursor-pointer badge badge-neutral text-primary-content">
                    Copy
                  </span>
                </label>
                <input
                  disabled
                  className="input input-primary join-item"
                  placeholder={`#`}
                  value={`#`}
                />
              </div>

              <button
                to={PATHS.adminAddSubMenus}
                className="btn btn-primary mt-4"
                onClick={(e) => {
                  createMainMenu(e).then(() => {
                    navigate(PATHS.adminAddSubMenus);
                  });
                }}
              >
                Next
              </button>
            </div>
          ) : (
            <form>
              <div className="form-control">
                <label htmlFor="subMenuTitle" className="label">
                  <span className="label-text">Main Menu Heading</span>
                </label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="input input-primary"
                  type="text"
                  name="title"
                  id="subMenuTitle"
                />
              </div>
              <div className="form-control">
                <label htmlFor="subMenuTitle" className="label">
                  <span className="label-text">Main Menu Type</span>
                </label>
                <select
                  onChange={(e) => handleInputChange(e)}
                  className="select select-primary"
                  name="type"
                  id="subMenuType"
                >
                  <option selected disabled value="">
                    Select Menu Type
                  </option>
                  <option value="collection">Collection</option>
                  <option value="category">Category</option>
                  <option value="productInfo">Product</option>
                  <option value="page">Page</option>
                </select>
              </div>
              <div className="form-control col-span-2 md:col-span-1">
                <label className="label" htmlFor="">
                  <span className="label-text">Sub Menu Type Value</span>
                </label>
                <select
                  onChange={(e) => setSelectedTypeDataValue(e.target.value)}
                  className="select select-primary"
                  name=""
                  id=""
                >
                  <option selected disabled>
                    Select Menu Type
                  </option>
                  {selectedTypeData.map((selectedType) => (
                    <option
                      key={selectedType.id}
                      value={
                        mainMenuData.type === "collection"
                          ? selectedType.title
                          : mainMenuData.type === "category"
                          ? selectedType.name
                          : mainMenuData.type === "productInfo"
                          ? selectedType.slug
                          : ""
                      }
                    >
                      {mainMenuData.type === "collection"
                        ? selectedType.title
                        : mainMenuData.type === "category" ||
                          mainMenuData.type === "productInfo"
                        ? selectedType.name
                        : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-4 w-[200px] form-control">
                <label className="label">
                  <span className="label-text">Link</span>
                  <span className="label-text-alt cursor-pointer badge badge-neutral text-primary-content">
                    Copy
                  </span>
                </label>
                <input
                  disabled
                  className="input input-primary join-item"
                  placeholder={`${mainMenuData.type}`}
                  value={`${mainMenuData.type}/${selectedTypeDataValue}`}
                />
              </div>
              <button
                className="btn btn-primary mt-4"
                onClick={(e) => createMainMenu(e)}
              >
                Submit
              </button>
            </form>
          )}
        </div>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default AddMainMenus;
