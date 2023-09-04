import { useEffect, useState } from "react";
import { Header, Card } from "../../components";
import API_WRAPPER from "../../api";
import { RiDeleteBin7Line } from "react-icons/ri";
import { debouncedShowToast } from "../../utils";
import { ToastContainer } from "react-toastify";
const AddChildMenu = () => {
  const [childMenuHeading, setChildMenuHeading] = useState("");
  const [childMenuType, setChildMenuType] = useState("");
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");
  const [link, setLink] = useState(`${childMenuType}/${selectedTypeDataValue}`);
  const [createdCards, setCreatedCards] = useState([]);
  const [areInputsValid, setAreInputsValid] = useState(false);
  const [subMenus, setSubmenus] = useState([]);
  const [subMenuId, setSubMenuId] = useState("");

  const getMainMenus = async () => {
    const response = await API_WRAPPER.get("/sub-menu");
    console.log("AddChildMenu.jsx", response);
    setSubmenus(response.data);
  };

  const handleApiCalls = async () => {
    if (childMenuType === "collection") {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (childMenuType === "category") {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (childMenuType === "productInfo") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        console.log("AddChildMenu.jsx", response.data);
        setSelectedTypeData(response.data);
      }
    } else if (childMenuType === "page") {
      // TODO: Handle page API call
    }
  };
  const createChildMenus = async () => {
    const response = await API_WRAPPER.post("/child-menu/create", createdCards);
    if (response) {
      debouncedShowToast("child-menu created successfully");
    }
  };

  const handleCardDelete = (index) => {
    const updatedCards = [...createdCards];
    updatedCards.splice(index, 1);
    setCreatedCards(updatedCards);
    debouncedShowToast("Submenu deleted successfully", "success");
  };
  console.log("AddChildMenu.jsx", createdCards);

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      subMenuId,
      heading: childMenuHeading,
      type: childMenuType,
      typeValue: selectedTypeDataValue,
      link: link,
    };
    setCreatedCards([...createdCards, newCard]);
    // Clear the form after submission
    setChildMenuHeading("");
    setSelectedTypeDataValue("");
    setChildMenuType("");
  };

  // side effects
  useEffect(() => {
    handleApiCalls();
  }, [childMenuType]);
  useEffect(() => {
    getMainMenus();
  }, []);

  useEffect(() => {
    setLink(`${childMenuType}/${selectedTypeDataValue}`);
    const ischildMenuHeadingValid = childMenuHeading.trim() !== "";
    const ischildMenuTypeValid = childMenuType !== "";
    const isSelectedTypeDataValueValid = selectedTypeDataValue !== "";

    // Update the validation state
    setAreInputsValid(
      ischildMenuHeadingValid &&
        ischildMenuTypeValid &&
        isSelectedTypeDataValueValid
    );
  }, [childMenuType, selectedTypeDataValue]);

  return (
    <div>
      <Header
        heading="Child Menu"
        subheading="This page provides Child Menu configuration to show on shop page"
      />

      <Card>
        <div className="mt-4 p-4">
          <form className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Sub Menu Heading</span>
              </label>
              <select
                className="select select-primary"
                name="menuId"
                id="menuTitle"
                // value={subMenuId}
                onChange={(e) => setSubMenuId(e.target.value)}
              >
                <option disabled selected>
                  e Select Sub Menu
                </option>
                {subMenus &&
                  subMenus.map((item) => (
                    <option value={item._id} key={item._id}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">Child Menu Heading</span>
              </label>
              <input
                onChange={(e) => setChildMenuHeading(e.target.value)}
                value={childMenuHeading}
                className="input input-primary"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="form-control col-span-2 md:col-span-1">
              <label className="label" htmlFor="">
                <span className="label-text">Child Menu Type</span>
              </label>
              <select
                onChange={(e) => setChildMenuType(e.target.value)}
                className="select select-primary"
                name=""
                id=""
              >
                <option selected disabled>
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
                      childMenuType === "collection"
                        ? selectedType.title
                        : childMenuType === "category"
                        ? selectedType.name
                        : childMenuType === "productInfo"
                        ? selectedType.slug
                        : ""
                    }
                  >
                    {childMenuType === "collection"
                      ? selectedType.title
                      : childMenuType === "category" ||
                        childMenuType === "productInfo"
                      ? selectedType.name
                      : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Link</span>
                <span className="label-text-alt badge badge-neutral cursor-pointer">
                  copy
                </span>
              </label>
              <input
                disabled
                value={`${childMenuType}/${selectedTypeDataValue}`}
                className="input input-primary "
                type="text"
                name=""
                id=""
              />
            </div>
            <button
              disabled={!areInputsValid}
              onClick={handleCardSubmit}
              className="btn btn-primary mt-9"
            >
              Submit
            </button>
          </form>
        </div>
      </Card>
      {/* Display created cards */}
      {createdCards.map((card, index) => (
        <Card key={index}>
          <div className="p-4 mt-4">
            <h1 className="p-4 text-xl font-bold">
              Create Child Menu with{" "}
              <span className="text-secondary">{card.heading}</span>
            </h1>
            <div className="flex items-center justify-between  bg-base-200 rounded-xl">
              <div className=" p-4">
                <h2>
                  <span className="text-primary font-semibold">
                    Child Menu Heading:
                  </span>{" "}
                  {card.heading}
                </h2>
                <p>
                  <span className="text-primary font-semibold">
                    Child Menu Type:
                  </span>{" "}
                  {card.type}
                </p>
                <p>
                  <span className="text-primary font-semibold">
                    Child Menu Type Value:
                  </span>{" "}
                  {card.typeValue}{" "}
                </p>
                <p>
                  <span className="text-primary font-semibold">Link:</span>
                  {card.link}
                </p>
              </div>
              <div>
                <div
                  className="tooltip tooltip-left"
                  data-tip={"Delete sub menu"}
                >
                  <button
                    onClick={() => handleCardDelete(index)}
                    className="btn btn-circle btn-error mx-4"
                  >
                    <RiDeleteBin7Line className="text-xl" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
      <div className="flex justify-end mt-4 p-4">
        <button className="btn btn-primary" onClick={createChildMenus}>
          {" "}
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddChildMenu;
