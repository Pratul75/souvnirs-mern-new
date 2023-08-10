import { useEffect, useState } from "react";
import { Card, Header } from "../../components";
import API_WRAPPER from "../../api";
import { nanoid } from "nanoid";

const AddMenus = () => {
  const [selectedHeaderTitle, setSelectedHeaderTitle] = useState("");
  const [headerInputs, setHeaderInputs] = useState({
    headerTitle: "",
  });

  const [mainMenuInputs, setMainMenuInputs] = useState({
    mainMenuTitle: "",
    selectedMenuType: "",
    selectedOption: "",
    isSubMenus: false,
  });

  const [showMenuTypeList, setShowMenuTypeList] = useState(false);
  const [selectedMenuTypeData, setSelectedMenuTypeData] = useState([]);
  const [showPageLink, setShowPageLink] = useState(false);

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

    // Toggle showPageLink when "pages" is selected
    setShowPageLink(value === "pages");

    setMainMenuInputs((prevState) => ({
      ...prevState,
      [name]: value,
      selectedOption: "", // Clear selectedOption when changing menu type
    }));
  };

  const handleMainMenuApiCalls = async () => {
    if (mainMenuInputs.selectedMenuType === "collection") {
      console.log("GET ALL COLLECTIONS");
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedMenuTypeData(response.data);
        console.log("COLLECTION DATA: ", response.data);
      }
      // collection api call
    } else if (mainMenuInputs.selectedMenuType === "product") {
      // products api call
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setSelectedMenuTypeData(response.data);
        console.log("GET ALL PRODUCTS", response.data);
      }
    } else if (mainMenuInputs.selectedMenuType === "category") {
      // category api call
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedMenuTypeData(response.data);
        console.log("CATEGORIES DATA: ", response.data);
      }
      // TODO: CALL API
      console.log("GET ALL CATEGORIES");
    } else {
      // TODO: WHAT TO DO WHEN PAGES ARE SELECTED
      setShowPageLink((prevState) => !prevState);
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
              {/* ... (other form controls) */}
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
                      <option value="pages">Page</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Render the second select conditionally */}
              {showMenuTypeList && (
                <div className="form-control col-span-2 md:col-span-1">
                  <div className="">
                    <select
                      onChange={(e) => handleMainMenuSelectChange(e)}
                      className="select select-primary w-full"
                      name="selectedOption"
                      id="selectedMenuType"
                      value={mainMenuInputs.selectedOption}
                    >
                      <option>Select Data:</option>
                      {selectedMenuTypeData.length > 0 &&
                        selectedMenuTypeData.map((item) => (
                          <option key={nanoid()} value={item._id}>
                            {mainMenuInputs.selectedMenuType === "collection"
                              ? item.title
                              : item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Render the input field for Page link */}
              {showPageLink && (
                <div className="form-control col-span-2 md:col-span-1">
                  <label htmlFor="pageLink" className="label">
                    <span className="label-text">Page Link</span>
                  </label>
                  <input
                    value={mainMenuInputs.selectedOption}
                    onChange={handleMainMenuSelectChange}
                    className="input input-primary"
                    type="text"
                    name="selectedOption"
                    id="pageLink"
                  />
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
