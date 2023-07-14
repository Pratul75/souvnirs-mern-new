import { Header } from "../../components";
import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
import API_WRAPPER from "../../api";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { AiOutlineDelete } from "react-icons/ai";

const AddCategory = () => {
  const [attributesList, setAttributesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [formData, setFormData] = useState({});

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

  useEffect(() => {
    getAllAttributes();
  }, []);

  useEffect(() => {
    const filteredResults = attributesList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [attributesList, searchQuery]);

  const handleAddAttribute = (attribute) => {
    console.log("ATTRIBUTE: ", attribute);

    setSelectedAttributes((prevState) => {
      if (prevState.includes(attribute)) {
        return prevState;
      } else {
        return [...prevState, attribute];
      }
    });
  };
  const handleAttributeDelete = (attribute) => {
    const updatedAttributes = selectedAttributes.filter(
      (selectedAttribute) => selectedAttribute._id !== attribute._id
    );
    setSelectedAttributes(updatedAttributes);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log("FORM DATA: ", formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.post("/category/add-category", {
      ...formData,
      attributes: selectedAttributes.map((item) => item._id),
      parentId: 0,
    });
    console.log("RESPONSE AFTER ADDING CATEGORY: ", response.data);
  };

  return (
    <div className="w-full">
      <Header
        heading="Add Category"
        image={CategoryBnnerImng}
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfs sdfsdf"
      />

      <div>
        <h1 className="text-2xl mt-8">Category</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 mt-4 bg-base-100 p-6 rounded-xl shadow-xl"
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category Name</span>
            </label>
            <input
              placeholder="Category Name"
              className="input input-info"
              onChange={handleInputChange}
              type="text"
              name="name"
              id=""
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category Description</span>
            </label>
            <input
              placeholder="Category Description"
              className="input input-info"
              onChange={handleInputChange}
              type="text"
              name="Description"
              id=""
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">HSN Code</span>
            </label>
            <input
              placeholder="HSN Code"
              className="input input-info"
              onChange={handleInputChange}
              type="text"
              name="hsn_code"
              id=""
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type</span>
            </label>
            <input
              placeholder="Category Type"
              className="input input-info"
              onChange={handleInputChange}
              type="text"
              name="type"
              id=""
            />
          </div>
          <div className="form-control">
            <input
              placeholder="Search Attributes"
              className="input input-info mb-2"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="overflow-y-auto w-full h-[30vh] mt-4">
              {searchResults.map((item) => (
                <p
                  onClick={() => handleAddAttribute(item)}
                  className={` bg-accent-focus p-4 mb-4 cursor-pointer rounded-xl text-white font-semibold shadow-sm`}
                  key={nanoid()}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
          <div className="form-control">
            <h1 className="text-2xl">Selected Attributes</h1>
            <div className="mt-10 grid">
              {selectedAttributes.map((selectedAttribute) => {
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

          <button className="w-full btn btn-primary">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
