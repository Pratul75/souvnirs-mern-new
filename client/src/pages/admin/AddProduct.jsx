import { Dropzone, Header, Tabs } from "../../components";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";
import { debouncedShowToast } from "../../utils";
import { ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { MultiSelect } from "react-multi-select-component";
import ProductBannerImage from "../../assets/bannerImages/productManagementImage.png";
import { motion } from "framer-motion";
import { fadeInFromLeftVariant, fadeInFromRightVariant } from "../../animation";
import { GrFormClose } from "react-icons/gr";
// add products

const AddProduct = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({});
  const [tagValue, setTagValue] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attrValue, setAttrValue] = useState([]);
  const [img, setImg] = useState();

  // Function to generate all possible combinations of multiple arrays as strings

  // Example of usage:

  // get all categories
  console.log("AddProduct.jsx", selectedAttributes);
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
        // need to check what to be done here
        if (vendorsList.length == 1) {
          debouncedShowToast("vendor list is empty array", "error");
        }
        console.log("AddProduct.jsx", vendorsList.length);
        console.log("VENDORS LIST RESPONSE: ", response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all vendors", error);
    }
  };
  const fetchAllAttributes = async () => {
    const response = await API_WRAPPER.get(
      `/attribute/get-all-attributes/${selectedCategory}`
    );
    setAttArr(response.data);
  };
  console.log("AddProduct.jsx");
  const randomSlug = () => {
    return nanoid(10);
  };
  // add product

  const postProduct = async () => {
    let data = {
      ...formData,
      description,
      slug: randomSlug(),
      tags: tagsArray,
      attributes: attrValue,
      // attributeValues: fAttValue,
    };
    const addProdData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "attributes" || key === "attributeValues") {
        // Stringify the arrays before appending them to the FormData
        value.forEach((item, index) => {
          addProdData.append(`${key}[${index}]`, JSON.stringify(item));
        });
      } else {
        addProdData.append(key, value);
      }
    });

    // Append the variant images
    // fAttValue.forEach((variant) => {
    //   if (variant.images && variant.images[0]) {
    //     addProdData.append(`images[${variant.name}]`, variant.images[0]);
    //   }
    // });

    // Append the file data to the FormData
    img.forEach((file) => {
      addProdData.append("img", file);
    });

    const response = await API_WRAPPER.post(
      "/products/add-product",
      addProdData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const productId = response.data.data._id;
    console.log("AddProduct.jsx", productId);
  };
  console.log(selectedAttributes);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(PATHS.adminAddProductAttributes);
    postProduct();
    console.log("SUBMIT FORM TRIGGERED FOR ADD PRODUCT");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTagInputChange = (event) => {
    setTagValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && tagValue.trim() !== "") {
      setTagsArray([...tagsArray, tagValue.trim()]);
      setTagValue("");
    }
  };
  console.log("AddProduct.jsx", attrValue);

  // Example usage:
  const dataArray = [];

  console.log(dataArray);

  // Function to handle attribute values input changes
  const handleAttriibuteValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Check if the attribute value already exists in the array
    setAtName(name);
    setAtValue(value);
  };

  const removeTag = (tagToRemove) => {
    const filteredTags = tagsArray.filter((tag) => tag !== tagToRemove);
    setTagsArray(filteredTags);
  };

  console.log("AddProduct.jsx", img);

  useEffect(() => {
    getAllCategories();
    getAllVendors();
  }, []);
  useEffect(() => {
    fetchAllAttributes();
  }, [selectedCategory]);

  console.log("AddProduct.jsx", selectedCategory);

  return (
    <div>
      <Header
        heading="Add Products"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. isadjv oiasreoi ihusdf bquhwdi euh."
        image={ProductBannerImage}
      />
      <div className="w-full mt-8">
        <div className="grid grid-cols-6 gap-4">
          <motion.div
            variants={fadeInFromLeftVariant}
            animate="animate"
            initial="initial"
            className="col-span-6 md:col-span-4 bg-base-100 p-4 rounded-xl border-[1px] border-base-300"
          >
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
          </motion.div>
          <motion.div
            variants={fadeInFromRightVariant}
            animate="animate"
            initial="initial"
            className="col-span-6 md:col-span-2 bg-base-100 rounded-xl border-[1px] border-base-300 p-4  "
          >
            <hr className="mt-4" />
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                onChange={(e) => handleInputChange(e)}
                className="select select-accent"
                name="status"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <button onClick={handleSubmit} className="btn btn-accent mt-4">
              Next
            </button>
            <button className="btn  mt-4 ml-4">Cancel</button>
          </motion.div>
        </div>

        <div className="grid grid-cols-6 gap-4 mt-4">
          <motion.div
            variants={fadeInFromLeftVariant}
            animate="animate"
            initial="initial"
            className="col-span-6 md:col-span-4 bg-base-100 rounded-xl border-[1px] border-base-300 p-4"
          >
            <hr className="mt-4" />
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <ReactQuill
                className="h-48"
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>
          </motion.div>
          <motion.div
            variants={fadeInFromRightVariant}
            animate="animate"
            initial="initial"
            className="col-span-6 md:col-span-2 bg-base-100 border-[1px] border-base-300 rounded-xl p-4"
          >
            <h3 className="font-semibold">Product Organisation</h3>
            <hr className="mt-4" />

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Vendor</span>
              </label>
              <select
                onChange={(e) => handleInputChange(e)}
                className="select select-accent"
                name="vendorId"
                value={formData.vendorId}
              >
                <option value="" disabled selected>
                  select vendor
                </option>
                {vendorsList?.map((vendor) => {
                  return (
                    <option key={nanoid()} value={vendor._id}>
                      {vendor.firstName}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* tags needs to be the specific for the multi select component */}
            <div className="form-control mt-4">
              <input
                type="text"
                value={tagValue}
                onChange={handleTagInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter a tag and press Enter"
                className="input input-accent"
              />
              <div className="mt-4 flex gap-4 flex-wrap">
                {tagsArray.map((tag, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-base-200 rounded-lg px-2 py- w-autos"
                  >
                    <span>{tag}</span>
                    <button
                      className="btn btn-circle btn-xs ml-4 my-1 btn-error"
                      onClick={() => removeTag(tag)}
                    >
                      <GrFormClose />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Stock Keeping Unit (SKU)</span>
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="input input-accent  w-full"
                placeholder="Enter SKU"
                type="text"
                name="sku"
                id=""
              />
            </div>
          </motion.div>
        </div>

        <div className="flex  grid-cols-6 col-span-3 gap-4 mt-4">
          <motion.div
            variants={fadeInFromLeftVariant}
            animate="animate"
            initial="initial"
            className="col-span-6  md:col-span-4 bg-base-100 border-[1px] border-base-300 rounded-xl p-4"
          >
            <h3 className="font-semibold">Add Cover Image</h3>
            <hr className="mt-4" />

            <div className="border-[1px]  border-accent rounded-xl flex items-center justify-center mt-4">
              <Dropzone onFilesChange={(data) => setImg(data)} />
            </div>
          </motion.div>
          <div className="md:col-span-2"></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
