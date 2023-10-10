import { Header } from "../components";
import API_WRAPPER from "../api";
import { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { debouncedShowToast } from "../utils";
import { PATHS } from "../Routes/paths";

const EditCategory = () => {
  const [attributesList, setAttributesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [formData, setFormData] = useState({});
  const [parentCategories, setParentCategories] = useState([]);
  const [combinations, setCombinations] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  const getAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get("/attribute/get-all-attributes");
      if (response.status === 200) {
        setAttributesList(response?.data);
      }
    } catch (error) {
      console.error({
        message: "Error occurred while fetching all attributes",
        error,
      });
    }
  };
  const getParentCategories = async () => {
    const response = await API_WRAPPER.get("/category/parent/");
    setParentCategories(response.data);
  };

  const getCategoryData = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/category/get-category/${params.id}`
      );
      setFormData(response.data);
    } catch (error) {
      console.error({
        message: "Error occurred while fetching category data",
        error,
      });
    }
  };

  useMemo(() => {
    getAllAttributes();
    getCategoryData();
    getParentCategories();
  }, []); // Fetch attributes and category data once on component mount

  useEffect(() => {
    setInitialAttributes();
  }, [attributesList, formData.attributes]); // Update selectedAttributes when attributesList or formData.attributes change

  useEffect(() => {
    const filteredResults = attributesList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [attributesList, searchQuery]);

  const handleAddAttribute = (attribute) => {
    setSelectedAttributes((prevState) => {
      if (prevState.some((selected) => selected._id === attribute._id)) {
        return prevState;
      } else {
        return [...prevState, attribute];
      }
    });
  };

  const handleAttributeDelete = (attribute) => {
    setSelectedAttributes((prevAttributes) =>
      prevAttributes.filter(
        (selectedAttribute) => selectedAttribute._id !== attribute._id
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const editCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await API_WRAPPER.put(
        `/category/update-category/${params.id}`,
        {
          ...formData,
          attributes: selectedAttributes.map((item) => item._id),
        }
      );
      setSelectedAttributes((prevAttributes) => prevAttributes);
      navigate(PATHS.adminCategories);
    } catch (e) {
      debouncedShowToast("Something went wrong", "error");
    }
  };

  function setInitialAttributes() {
    const initialAttributes = attributesList.filter((attribute) =>
      formData?.attributes?.includes(attribute._id)
    );
    setSelectedAttributes(initialAttributes);
  }
  return (
    <div className="w-full">
      <Header
        heading="Edit Category"
        // image={CategoryBnnerImng}
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfs sdfsdf"
      />
      <div>
        <h1 className="text-2xl mt-8">Category</h1>
        <form className="grid grid-cols-2 gap-4 mt-4 bg-base-100 p-6 rounded-xl">
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">Category Name</span>
            </label>
            <input
              placeholder="Category Name"
              className="input input-primary"
              onChange={handleInputChange}
              defaultValue={formData?.name}
              type="text"
              name="name"
              id=""
            />
          </div>
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">Category Description</span>
            </label>
            <input
              placeholder="Category Description"
              className="input input-primary"
              onChange={handleInputChange}
              value={formData?.description}
              type="text"
              name="Description"
              id=""
            />
          </div>
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">HSN Code</span>
            </label>
            <input
              placeholder="HSN Code"
              className="input input-primary"
              onChange={handleInputChange}
              type="text"
              value={formData.hsn_code}
              name="hsn_code"
              id=""
            />
          </div>
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <input
              placeholder="Category Type"
              className="input input-primary"
              value={formData.description}
              onChange={handleInputChange}
              type="text"
              name="type"
              id=""
            />
          </div>
          <div className="form-control col-span-2 md:col-span-1">
            <input
              placeholder="Search Attributes"
              className="input input-primary mb-2"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="overflow-y-auto w-full h-[30vh] mt-4">
              {searchResults.map((item) => (
                <p
                  onClick={() => handleAddAttribute(item)}
                  className={` bg-primary-focus p-4 mb-4 cursor-pointer rounded-xl text-white font-semibold shadow-sm`}
                  key={nanoid()}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>

          <div className="form-control col-span-2 md:col-span-1">
            <h1 className="text-2xl">Selected Attributes</h1>
            <div className="mt-10 grid">
              {selectedAttributes?.map((selectedAttribute) => {
                return (
                  <p
                    className={`p-4 bg-base-200 shadow flex w-full justify-between items-center mb-4 rounded-xl `}
                    key={nanoid()}
                  >
                    <span>{selectedAttribute.name}</span>
                    <button
                      onClick={() => handleAttributeDelete(selectedAttribute)}
                      className="btn btn-square text-white btn-outline btn-error"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </p>
                );
              })}
            </div>
          </div>
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">parent Category</span>
            </label>
            <select
              className=" input input-primary "
              onChange={(e) => handleInputChange(e)}
              value={formData.parentId}
              name="parentId"
            >
              <option disabled selected>
                Select a parent categoy (optional)
              </option>
              {parentCategories.map((parent) => (
                <option key={nanoid()} value={parent._id}>
                  {parent.name}
                </option>
              ))}
            </select>
          </div>
          <ToastContainer />

          <button
            className="max-w-lg w-48 btn btn-primary "
            onClick={editCategory}
          >
            Edit Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
