import { Header, Card } from "../../../components";
import { nanoid } from "nanoid";
import { PATHS } from "../../../Routes/paths";
import { ToastContainer } from "react-toastify";
import useAddMainMenus from "./useAddMainMenus";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const AddMainMenus = () => {
  const {
    createMainMenu,
    handleApiCalls,
    handleInputChange,
    mainMenuData,
    menuHeaderTitlesList,
    navigate,
    selectedTypeData,
    selectedTypeDataValue,
    setSelectedTypeDataValue,
    setSubMenuToggle,
    subMenuToggle,
  } = useAddMainMenus();

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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Main Menu Position</span>
                </label>
                <input
                  className="input input-primary"
                  type="number"
                  name="position"
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
              <Link onClick={() => navigate(-1)} className="btn mt-10 mr-4">
                <IoMdArrowBack
                  className="text-2xl"
                  style={{ fontSize: "13px" }}
                />
                Back
              </Link>
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
                <label className="label">
                  <span className="label-text">Main Menu Position</span>
                </label>
                <input
                  className="input input-primary"
                  type="number"
                  name="position"
                  id=""
                  onChange={(e) => handleInputChange(e)}
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
              <Link onClick={() => navigate(-1)} className="btn mt-10 mr-4">
                <IoMdArrowBack
                  className="text-2xl"
                  style={{ fontSize: "13px" }}
                />
                Back
              </Link>
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
