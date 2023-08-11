import { useEffect, useState } from "react";
import { Header, Card } from "../../components";
import API_WRAPPER from "../../api";
import { RiDeleteBin7Line } from "react-icons/ri";
import { debouncedShowToast } from "../../utils";
import { ToastContainer } from "react-toastify";
const AddSubMenus = () => {
  const [subMenuHeading, setSubMenuHeading] = useState("");
  const [subMenuType, setSubMenuType] = useState("");
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");
  const [link, setLink] = useState(`${subMenuType}/${selectedTypeDataValue}`);
  const [createdCards, setCreatedCards] = useState([]);
  const [areInputsValid, setAreInputsValid] = useState(false);

  const getMainMenus = async () => {
    const response = await API_WRAPPER.get("/main-menu");
    console.log("AddSubMenus.jsx", response);
  };

  const handleApiCalls = async () => {
    if (subMenuType === "collection") {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (subMenuType === "category") {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (subMenuType === "product") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (subMenuType === "page") {
      // TODO: Handle page API call
    }
  };

  const handleCardDelete = (index) => {
    const updatedCards = [...createdCards];
    updatedCards.splice(index, 1);
    setCreatedCards(updatedCards);
    debouncedShowToast("Submenu deleted successfully", "success");
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      heading: subMenuHeading,
      type: subMenuType,
      typeValue: selectedTypeDataValue,
      link: link,
    };
    setCreatedCards([...createdCards, newCard]);
    // Clear the form after submission
    setSubMenuHeading("");
    setSelectedTypeDataValue("");
    setSubMenuType("");
  };

  // side effects
  useEffect(() => {
    handleApiCalls();
  }, [subMenuType]);
  useEffect(() => {
    getMainMenus();
  }, []);

  useEffect(() => {
    setLink(`${subMenuType}/${selectedTypeDataValue}`);
    const isSubMenuHeadingValid = subMenuHeading.trim() !== "";
    const isSubMenuTypeValid = subMenuType !== "";
    const isSelectedTypeDataValueValid = selectedTypeDataValue !== "";

    // Update the validation state
    setAreInputsValid(
      isSubMenuHeadingValid &&
        isSubMenuTypeValid &&
        isSelectedTypeDataValueValid
    );
  }, [subMenuType, selectedTypeDataValue]);

  return (
    <div>
      <Header
        heading="Sub Menu"
        subheading="This page provides Submenu configuration"
      />

      <Card>
        <div className="mt-4 p-4">
          <form className="grid grid-cols-2 gap-4">
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">Sub Menu Heading</span>
              </label>
              <input
                onChange={(e) => setSubMenuHeading(e.target.value)}
                value={subMenuHeading}
                className="input input-primary"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="form-control col-span-2 md:col-span-1">
              <label className="label" htmlFor="">
                <span className="label-text">Sub Menu Type</span>
              </label>
              <select
                onChange={(e) => setSubMenuType(e.target.value)}
                className="select select-primary"
                name=""
                id=""
              >
                <option selected disabled>
                  Select Menu Type
                </option>
                <option value="collection">Collection</option>
                <option value="category">Category</option>
                <option value="product">Product</option>
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
                  <option key={selectedType.id}>
                    {subMenuType === "collection"
                      ? selectedType.title
                      : subMenuType === "category" || subMenuType === "product"
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
                value={`${subMenuType}/${selectedTypeDataValue}`}
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
              Create Sub Menu with{" "}
              <span className="text-secondary">{card.heading}</span>
            </h1>
            <div className="flex items-center justify-between  bg-base-200 rounded-xl">
              <div className=" p-4">
                <h2>
                  <span className="text-primary font-semibold">
                    Sub Menu Heading:
                  </span>{" "}
                  {card.heading}
                </h2>
                <p>
                  <span className="text-primary font-semibold">
                    Sub Menu Type:
                  </span>{" "}
                  {card.type}
                </p>
                <p>
                  <span className="text-primary font-semibold">
                    Sub Menu Type Value:
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
      <ToastContainer />
    </div>
  );
};

export default AddSubMenus;
