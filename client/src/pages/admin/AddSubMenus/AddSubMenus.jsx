import { Header, Card } from "../../../components";
import { RiDeleteBin7Line } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { PATHS } from "../../../Routes/paths";
import Loading from "../../common/Loading";
import useAddSubMenus from "./useAddSubMenus";

const AddSubMenus = () => {
  const {
    areInputsValid,
    childMenuToggle,
    createdCards,
    loading,
    mainMenuId,
    mainMenus,
    selectedTypeData,
    subMenuHeading,
    subMenuType,
    selectedTypeDataValue,
    handleCardSubmit,
    handleCardDelete,
    createSubMenus,
    navigate,
    setChildMenuToggle,
    setMainMenuId,
    setSelectedTypeDataValue,
    setSubMenuHeading,
    setSubMenuType,
  } = useAddSubMenus();

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
                <option selected>Select Main Menu</option>
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
                  {card.heading && card.heading}
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

export default AddSubMenus;
