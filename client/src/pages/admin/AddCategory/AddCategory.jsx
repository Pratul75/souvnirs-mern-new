import { Header } from "../../../components";
// import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
import { nanoid } from "nanoid";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import useCategory from "./useCategory";

const AddCategory = () => {
  const {
    handleAddAttribute,
    handleAttributeDelete,
    handleInputChange,
    handleSubmit,
    parentCategories,
    searchQuery,
    searchResults,
    selectedAttributes,
    setSearchQuery,
  } = useCategory();
  return (
    <div className="w-full">
      <Header
        heading="Add Category"
        // image={CategoryBnnerImng}
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfs sdfsdf"
      />
      <div>
        <h1 className="text-2xl mt-8">Category</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 mt-4 bg-base-100 p-6 rounded-xl"
        >
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">Category Name</span>
            </label>
            <input
              placeholder="Category Name"
              className="input input-primary"
              onChange={handleInputChange}
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
          <div className="form-control col-span-2 md:col-span-1">
            <label className="label">
              <span className="label-text">parent Category</span>
            </label>
            <select
              className=" input input-primary "
              onChange={(e) => handleInputChange(e)}
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

          <button className="max-w-lg w-48 btn btn-primary ">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
