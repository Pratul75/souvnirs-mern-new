import { Dropzone, Header, Tabs } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";

const AddProduct = () => {
  const [description, setDescription] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({});

  // get all categories
  const getAllCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setCategoriesList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all categories", error);
    }
  };

  // get all vendors
  const getAllVendors = async () => {
    try {
      const response = await API_WRAPPER.get("/vendors/get-vendors");
      if (response.status === 200) {
        setVendorsList(response?.data?.data);
        console.log("VENDORS LIST RESPONSE: ", response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all vendors", error);
    }
  };

  // add product
  const postProduct = async () => {
    const response = await API_WRAPPER.post("/products/add-product");
    if (response.status === 200) {
      console.log("RESPONSE RECEIVED: ", response?.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    getAllCategories();
    getAllVendors();
  }, []);

  const tabs = [
    {
      label: "Media",
      content: <Dropzone />,
    },
    {
      label: "Inventory",
      content: (
        <div>
          <div className="flex gap-4">
            <input
              type="checkbox"
              name=""
              id=""
              className="toggle-accent toggle"
            />
            <span>Track Quantity</span>
          </div>
          <div>
            <h1 className="font-semibold mt-4">Quantity</h1>
            <hr className="mt-4" />
          </div>
          <div className="flex items-center justify-around">
            <span>Enter Quantity</span>
            <input
              className="input input-accent w-2/3"
              type="number"
              name=""
              id=""
            />
          </div>
        </div>
      ),
    },
    {
      label: "Attribute",
      content:
        selectedCategory.length === 0 ? (
          <p className="text-center">Select Category First</p>
        ) : (
          <div className="form-control w-1/2">
            <select className="select select-accent">
              <option value="attribute one">Attribute One</option>
              <option value="attribute two">Attribute Two</option>
            </select>
          </div>
        ),
    },
    {
      label: "Shipping Info",
      content: (
        <div>
          <div className="flex gap-4 border-b-[1px] border-gray-500 pb-4">
            <input className="radio radio-accent" type="radio" />
            <span>Physical product</span>
          </div>
          <div className="flex gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input className="input input-accent" type="text" name="" id="" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Preference</span>
              </label>
              <select className="select select-accent">
                <option value="option 1">Option 1</option>
                <option value="option 2">Option 2</option>
              </select>
            </div>
          </div>
          <div className="flex items-center  gap-4 mt-4">
            <input className="checkbox checkbox-accent" type="checkbox" />
            <label className="label">
              <span className="label-text">
                Include custom information for international shipping
              </span>
            </label>
          </div>
        </div>
      ),
    },
    {
      label: " Pricing",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input className="input input-accent" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Compare-at price</span>
              </label>
              <input className="input input-accent" />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Header
        heading="Add Products"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to"
        image={HeaderImgTwo}
      />
      <div className="w-full  mt-4">
        <div className="flex">
          <div className="bg-white shadow-md p-4 mx-4 w-2/3">
            <h3 className="font-semibold">Product</h3>
            <hr className="mt-4" />
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Product Title</span>
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="input input-accent"
                type="text"
                name="name"
                id=""
              />
            </div>
          </div>
          <div className="bg-white shadow-md p-4 mx-4 w-1/3">
            <h3 className="font-semibold">Product Status</h3>
            <hr className="mt-4" />
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select className="select select-accent">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <button className="btn btn-accent mt-4">Publish</button>
            <button className="btn  mt-4 ml-4">Cancel</button>
          </div>
        </div>

        <div className="flex mt-8">
          <div className="bg-white shadow-md p-4 mx-4 w-2/3">
            <h3 className="font-semibold">Prdoduct Description</h3>
            <hr className="mt-4" />
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <ReactQuill
                className="h-52"
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>
          </div>
          <div className="bg-white shadow-md p-4 mx-4 w-1/3">
            <h3 className="font-semibold">Product Organisation</h3>
            <hr className="mt-4" />
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Product Category</span>
              </label>
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select select-accent"
              >
                {categoriesList?.map((category) => {
                  return <option key={nanoid()}>{category.name}</option>;
                })}
              </select>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Vendor</span>
              </label>
              <select className="select select-accent">
                {vendorsList?.map((vendor) => {
                  return <option key={nanoid()}>{vendor.firstName}</option>;
                })}
              </select>
            </div>

            {/* tags needs to be the specific for the multi select component */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Tags</span>
              </label>
              <input className="input input-accent" type="text" name="" id="" />
            </div>

            <div className="form-contro mt-4">
              <label className="label">
                <span className="label-text">Stock Keeping Unit (SKU)</span>
              </label>
              <input
                className="input input-accent  w-full"
                placeholder="Enter SKU"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
        </div>
        <div className="flex mt-8">
          <div className="bg-white shadow-md p-4 mx-4 w-2/3">
            <h3 className="font-semibold">Basic Tabs</h3>
            <hr className="mt-4" />
            <Tabs tabs={tabs} />
          </div>
          <div className="bg-white shadow-md p-4 mx-4 w-1/3">
            <h3 className="font-semibold">Product Organisation</h3>
            <hr className="mt-4" />
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Product Category</span>
              </label>
              <select className="select select-accent">
                <option value="Category one">Category One</option>
                <option value="Category two">Category Two</option>
              </select>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Vendor</span>
              </label>
              <select className="select select-accent">
                <option value="Vendor one">Vendor One</option>
                <option value="Vendor two">Vendor Two</option>
              </select>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Tags</span>
              </label>
              <input className="input input-accent" type="text" name="" id="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
