import { useEffect, useState } from "react";
import { Header, Card } from "../../components";
import API_WRAPPER from "../../api";
import { RiDeleteBin7Line } from "react-icons/ri";
import { debouncedShowToast } from "../../utils";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import Loading from "../common/Loading";
import { AiOutlineEdit } from "react-icons/ai";

const EditMenu = () => {
  const [subMenuHeading, setSubMenuHeading] = useState("");
  const [subMenuType, setSubMenuType] = useState("");
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");
  const [link, setLink] = useState(`${subMenuType}/${selectedTypeDataValue}`);
  const [createdCards, setCreatedCards] = useState();
  const [areInputsValid, setAreInputsValid] = useState(false);
  const [mainMenus, setMainMenus] = useState([]);
  const [mainMenuId, setMainMenuId] = useState("");
  const [childMenuToggle, setChildMenuToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const getMainMenus = async () => {
    const response = await API_WRAPPER.get("/main-menu/" + id);
    console.log("EditMenu.jsx", response);
    setMainMenus(response.data);
    if (response.data[0].submenus?.length > 0) {
      setChildMenuToggle(true);
    }
    console.log(response.data[0].submenus);
    setCreatedCards(response.data[0].submenus);
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
    } else if (subMenuType === "productInfo") {
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
    ``;
    debouncedShowToast("Submenu deleted successfully", "success");
  };
  const createSubMenus = async () => {
    setLoading(true);
    await API_WRAPPER.post("/sub-menu/create", createdCards);
    setLoading(false);
  };
  const handleCardSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      mainMenuId,
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
  const navigate = useNavigate();

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
    !childMenuToggle
      ? setAreInputsValid(
          isSubMenuHeadingValid &&
            isSubMenuTypeValid &&
            isSelectedTypeDataValueValid
        )
      : setAreInputsValid(isSubMenuHeadingValid);
  });
  console.log("EditMenu.jsx", createdCards);

  return (
    <div>
      <Header
        heading="Sub Menu"
        subheading="This page provides Submenu configuration"
      />

      <Card>
        <div className="mt-4 p-4">
          <form className="grid grid-cols-2 gap-4">
            <div className="form-control col-span-1">
              <label htmlFor="menuTitle" className="label">
                <span className="label-text">Main Menu Title</span>
              </label>
              <select
                className="select select-primary"
                name="menuId"
                id="menuTitle"
                value={mainMenuId}
                onChange={(e) => setMainMenuId(e.target.value)}
              >
                {mainMenus &&
                  mainMenus.map((item) => (
                    <option
                      selected={item._id === mainMenuId}
                      value={item._id}
                      key={item._id}
                    >
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
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
            <div className="form-control">
              <label htmlFor="isSubMenu" className="label">
                <span className="label-text">Create Child Menu</span>
              </label>
              <input
                onChange={(e) => setChildMenuToggle(e.target.checked)}
                checked={childMenuToggle}
                className="toggle toggle-primary"
                type="checkbox"
                name="isSubMenu"
                id="isSubMenu"
              />
            </div>
            {!childMenuToggle && (
              <div>
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
                          subMenuType === "collection"
                            ? selectedType.title
                            : subMenuType === "category"
                            ? selectedType.name
                            : subMenuType === "productInfo"
                            ? selectedType.slug
                            : ""
                        }
                      >
                        {subMenuType === "collection"
                          ? selectedType.title
                          : subMenuType === "category" ||
                            subMenuType === "product"
                          ? selectedType.name
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Link</span>
                <span className="label-text-alt badge badge-neutral cursor-pointer">
                  copy
                </span>
              </label>
              <input
                disabled
                value={
                  !childMenuToggle
                    ? `${subMenuType}/${selectedTypeDataValue}`
                    : "#"
                }
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
              Add
            </button>
          </form>
        </div>
      </Card>
      {/* Display created cards */}
      {createdCards?.map((card, index) => (
        <Card key={index}>
          <div className="p-4 mt-4">
            <h1 className="p-4 text-xl font-bold">
              {/* Create Sub Menu with{" "} */}
              <span className="text-secondary">{card.heading}</span>
            </h1>
            <div className="flex items-center justify-between  bg-base-200 rounded-xl">
              <div className=" p-4">
                <h2>
                  <span className="text-primary font-semibold">
                    Sub Menu Heading:
                  </span>{" "}
                  {card.title}
                </h2>
                {card.type && (
                  <p>
                    <span className="text-primary font-semibold">
                      Sub Menu Type:
                    </span>{" "}
                    {card.type && card.type}
                  </p>
                )}
                {card.typeValue && (
                  <p>
                    <span className="text-primary font-semibold">
                      Sub Menu Type Value:
                    </span>{" "}
                    {card.typeValue}{" "}
                  </p>
                )}
                {card.link && (
                  <p>
                    <span className="text-primary font-semibold">Link:</span>
                    {card.link}
                  </p>
                )}
              </div>
              <div>
                {!card.type && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      createSubMenus().then(() => {
                        navigate(PATHS.adminAddChildMenus);
                      });
                    }}
                  >
                    Add Child Menu
                  </button>
                )}
                <div
                  className="tooltip tooltip-left"
                  data-tip={"Delete sub menu"}
                >
                  {/* TODO: nedd to edit thhe sub menus */}
                  <button className="btn btn-circle btn-info mx-4">
                    <AiOutlineEdit className="text-xl" />
                  </button>
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
        <button className="btn btn-primary" onClick={createSubMenus}>
          {" "}
          Submit
        </button>
      </div>
      <ToastContainer />
      {loading && <Loading />}
    </div>
  );
};

export default EditMenu;
