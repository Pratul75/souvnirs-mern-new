import { useState } from "react";
import { Card, Header } from "../../components";

const AddMenus = () => {
  // states for header sections
  const [selectedHeaderTitle, setSelectedHeaderTitle] = useState("");
  const [headerInputs, setHeaderInputs] = useState({
    headerTitle: "",
  });

  //   states for main menu section

  const [mainMenuInputs, setMainMenuInputs] = useState({
    mainMenuTitle: "",
    selectedMenuType: "",
    isSubMenus: false,
  });

  //   handlers for header section
  const handleHeaderChange = (event) => {
    const { value, name } = event.target;
    setHeaderInputs((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const handleHeaderTitleSubmit = (event) => {
    event.preventDefault();
    console.log("HEADER TITLE: ", headerInputs.headerTitle);
    setSelectedHeaderTitle(headerInputs.headerTitle);
  };

  //   handlers for main menu section
  const handleMainMenuChange = (event) => {
    const { value, name, type } = event.target;

    if (type === "checkbox") {
      setMainMenuInputs((prevState) => {
        return { ...prevState, [name]: !prevState[name] };
      });
    } else {
      setMainMenuInputs((prevState) => {
        return { ...prevState, [name]: value };
      });
    }
  };

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

      {selectedHeaderTitle ? (
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
                  onChange={(e) => handleMainMenuChange(e)}
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
                  checked={mainMenuInputs.isSubMenus}
                  onChange={(e) => handleMainMenuChange(e)}
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
                      onChange={(e) => handleMainMenuChange(e)}
                      value={mainMenuInputs.selectedMenuType}
                      className="select select-primary w-full"
                      name="selectedMenuType"
                      id="selectedMenuType"
                    >
                      <option>Select Menu Type</option>
                      <option value="category">Category</option>
                      <option value="collection">Collection</option>
                      <option value="product">Pages</option>
                      <option value="product">Product</option>
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
      ) : null}
    </div>
  );
};

export default AddMenus;
