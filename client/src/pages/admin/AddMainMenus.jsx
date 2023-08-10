import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import { Header, Card } from "../../components";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";

const AddMainMenus = () => {
  const [menuHeaderTitlesList, setMenuHeaderTitlesList] = useState([]);
  const [subMenuToggle, setSubMenuToggle] = useState(false);
  const [mainMenuHeading, setMainMenuHeading] = useState("");
  const [mainMenuType, setMainMenuType] = useState("");
  const [mainMenuData, setMainMenuData] = useState({ title: "", type: "" });

  const getAllMenuHeaderTitles = async () => {
    const response = await API_WRAPPER.get("/menu");
    if (response?.status === 200) {
      setMenuHeaderTitlesList(response?.data);
    }
  };
  console.log("AddMainMenus.jsx", mainMenuData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMainMenuData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createMainMenu = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.post("/main-menu/create", {
      ...mainMenuData,
      link: `${mainMenuData.title}/${mainMenuData.type}`,
    });
    console.log("AddMainMenus.jsx", response);
  };

  useEffect(() => {
    getAllMenuHeaderTitles();
  }, []);

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
                onChange={(e) => handleInputChange(e)}
              >
                {menuHeaderTitlesList &&
                  menuHeaderTitlesList.map((item) => (
                    <option value={item.title} key={nanoid()}>
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
                className="toggle"
                type="checkbox"
                name="isSubMenu"
                id="isSubMenu"
              />
            </div>
          </form>
          {subMenuToggle ? (
            <div>
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
              <Link
                to={PATHS.adminAddSubMenus}
                className="btn btn-primary mt-4"
              >
                Next
              </Link>
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
                  <option value="product">Product</option>
                  <option value="page">Page</option>
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
                  placeholder={`${mainMenuHeading}/${mainMenuType}`}
                  value={`${mainMenuData.title}/${mainMenuData.type}`}
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
      </Card>
    </div>
  );
};

export default AddMainMenus;
