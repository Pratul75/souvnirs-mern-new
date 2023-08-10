import { useEffect, useState } from "react";
import { Card, Header } from "../../components";
import API_WRAPPER from "../../api";

const AddMenus = () => {
  const [selectedHeaderTitle, setSelectedHeaderTitle] = useState("");
  const [headerInputs, setHeaderInputs] = useState({
    headerTitle: "",
  });

  const [mainMenuInputs, setMainMenuInputs] = useState({
    mainMenuTitle: "",
    selectedMenuType: "",
    isSubMenus: false,
  });

  const [showMenuTypeList, setShowMenuTypeList] = useState(false);
  const [selectedMenuTypeData, setSelectedMenuTypeData] = useState([]);

  const handleHeaderChange = (event) => {
    const { value, name } = event.target;
    setHeaderInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleHeaderTitleSubmit = (event) => {
    event.preventDefault();
    console.log("HEADER TITLE: ", headerInputs.headerTitle);
    setSelectedHeaderTitle(headerInputs.headerTitle);
  };

  const handleMainMenuTextChange = (event) => {
    const { value, name } = event.target;
    setMainMenuInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMainMenuCheckboxChange = (event) => {
    const { checked, name } = event.target;
    setMainMenuInputs((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleMainMenuSelectChange = (event) => {
    const { value, name } = event.target;
    setMainMenuInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMainMenuApiCalls = async () => {
    if (mainMenuInputs.selectedMenuType === "collection") {
      console.log("GET ALL COLLECTIONS");
    } else if (mainMenuInputs.selectedMenuType === "product") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setSelectedMenuTypeData(response.data);
      }
      console.log("GET ALL PRODUCTS", response.data);
    } else if (mainMenuInputs.selectedMenuType === "category") {
      // TODO: CALL API
      console.log("GET ALL CATEGORIES");
    } else {
      // TODO: WHAT TO DO WHEN PAGES ARE SELECTED
      console.log("GET ALL PAGES");
    }
  };

  useEffect(() => {
    setShowMenuTypeList(mainMenuInputs.selectedMenuType !== "");
  }, [mainMenuInputs.selectedMenuType]);

  useEffect(() => {
    handleMainMenuApiCalls();
  }, [mainMenuInputs.selectedMenuType]);

  const handleMainMenuSubmit = (event) => {
    event.preventDefault();
    console.log("MENU TITLE: ", mainMenuInputs.mainMenuTitle);
    console.log("MENU TOGGLE: ", mainMenuInputs.isSubMenus);
    console.log("MENU SELECTED TYPE: ", mainMenuInputs.selectedMenuType);
  };

  return (
    <div>
      <Header
        heading="Add Menus"
        subheading="This sections provides ability to add various types of menus in the application"
      />
      <Card>
        <div className="p-4 mt-4">
          <form
            onSubmit={(e) => handleHeaderTitleSubmit(e)}
            className="grid grid-cols-2"
          >
            <div className="form-control col-span-2 md:col-span-1">
              <label htmlFor="headerTitle" className="label">
                <span className="label-text">Header Title</span>
              </label>
              <input
                value={headerInputs.headerTitle}
                onChange={(e) => handleHeaderChange(e)}
                placeholder="enter title for header menu"
                className="input input-primary"
                type="text"
                name="headerTitle"
                id="headerTitle"
              />
            </div>
          </form>
        </div>
      </Card>

      {
        <Card>
          <div className="p-4 mt-4">
            <form
              className="grid grid-cols-2 gap-4"
              onSubmit={(e) => handleMainMenuSubmit(e)}
            >
              <div className="form-control col-span-2 md:col-span-1">
                <label htmlFor="mainMenuTitle" className="label">
                  <span className="label-text">Main Menu Title</span>
                </label>
                <input
                  value={mainMenuInputs.mainMenuTitle}
                  onChange={handleMainMenuTextChange}
                  className="input input-primary"
                  type="text"
                  name="mainMenuTitle"
                  id="mainMenuTitle"
                />
              </div>
              <div className="form-control col-span-2 md:col-span-1">
                <label htmlFor="isSubMenus" className="label">
                  <span className="label-text">Include Sub Menu</span>
                </label>
                <input
                  disabled={showMenuTypeList}
                  checked={mainMenuInputs.isSubMenus}
                  onChange={handleMainMenuCheckboxChange}
                  className="toggle toggle-primary"
                  type="checkbox"
                  name="isSubMenus"
                  id="isSubMenus"
                />
              </div>
              {mainMenuInputs.isSubMenus && (
                <input
                  readOnly
                  className="input input-primary"
                  placeholder="Link"
                  type="text"
                  name=""
                  id=""
                  defaultValue={"#"}
                />
              )}
              {!mainMenuInputs.isSubMenus && (
                <div className="form-control col-span-2 md:col-span-1">
                  <div className="">
                    <select
                      onChange={handleMainMenuSelectChange}
                      value={mainMenuInputs.selectedMenuType}
                      className="select select-primary w-full"
                      name="selectedMenuType"
                      id="selectedMenuType"
                    >
                      <option value="">Select Menu Type</option>
                      <option value="category">Category</option>
                      <option value="collection">Collection</option>
                      <option value="product">Product</option>
                      <option value="Pages">Page</option>
                    </select>
                  </div>
                </div>
              )}

              {showMenuTypeList && (
                <div className="form-control col-span-2 md:col-span-1">
                  <div className="">
                    <select
                      className="select select-primary w-full"
                      name="selectedMenuType"
                      id="selectedMenuType"
                      value={mainMenuInputs.selectedMenuType}
                    >
                      <option>Select Data:</option>
                      {selectedMenuTypeData.length > 0 &&
                        selectedMenuTypeData.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}
              <div className="col-span-2">
                <button type="submit" className="btn btn-primary">
                  {mainMenuInputs.isSubMenus ? "NEXT" : "SUBMIT"}
                </button>
              </div>
            </form>
          </div>
        </Card>
      }
    </div>
  );
};

export default AddMenus;
