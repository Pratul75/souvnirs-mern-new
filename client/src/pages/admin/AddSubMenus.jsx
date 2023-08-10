import { useEffect, useState } from "react";
import { Header, Card } from "../../components";
import API_WRAPPER from "../../api";
import { FaTrash } from "react-icons/fa";

const AddSubMenus = () => {
  const [subMenuHeading, setSubMenuHeading] = useState("");
  const [subMenuType, setSubMenuType] = useState("");
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");
  const [numContainers, setNumContainers] = useState(1);
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
      // const response = await API_WRAPPER.get("/page");
    }
  };

  useEffect(() => {
    handleApiCalls();
  }, [subMenuType]);

  const handleAddContainer = () => {
    setNumContainers(numContainers + 1);
  };

  const handleRemoveContainer = (index) => {
    // Optionally implement logic to remove a specific container
    // This function can be triggered on click of a remove button/icon in each container
  };

  return (
    <div>
      <Header
        heading="Sub Menu"
        subheading="This page provides submenu configuration"
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
            <button className="btn btn-primary mt-9">Submit</button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AddSubMenus;
