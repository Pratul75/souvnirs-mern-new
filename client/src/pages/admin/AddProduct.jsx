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
  const [attArr, setAttArr] = useState();
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attrValue, setAttrValue] = useState([]);
  const [atName, setAtName] = useState();
  const [atValue, setAtValue] = useState();
  const [price, setPrice] = useState(false);
  const [attrValues, setAttrValues] = useState();
  const [fAttValue, setFAttValue] = useState([]);
  const [img, setImg] = useState();
  const uploadToCloud = async (file) => {
    const uploaded = await cloudinary.v2.uploader.upload(file);
    console.log("AddProduct.jsx", uploaded);
  };

  // Function to generate all possible combinations of multiple arrays as strings
  function generateValueCombinations() {
    let allArrays = [];
    attrValue.map((a) => allArrays.push(a.value));
    console.log("AddProduct.jsx", allArrays);
    // return
    function generateCombinations(
      arrays,
      index = 0,
      current = "",
      result = []
    ) {
      if (index === arrays.length) {
        result.push(current);
        return;
      }

      for (let i = 0; i < arrays[index].length; i++) {
        const newCurrent =
          current === "" ? arrays[index][i] : `${current} ${arrays[index][i]}`;
        generateCombinations(arrays, index + 1, newCurrent, result);
      }

      return result;
    }
    setAttrValues(generateCombinations(allArrays));
    setPrice(true);
  }
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
    if (response) {
      let doneUpload = false;
      try {
        for (let value of fAttValue) {
          console.log("AddProduct.jsx", value);
          const variantData = {
            variant: value.name,
            productId: productId,
            attributes: attrValue,
            price: value.price,
            quantity: value.quantity,
          };
          const variantFormData = new FormData();

          Object.entries(variantData).forEach(([key, value]) => {
            if (key === "attributes" || key === "attributeValues") {
              // Stringify the arrays before appending them to the FormData
              value.forEach((item, index) => {
                variantFormData.append(
                  `${key}[${index}]`,
                  JSON.stringify(item)
                );
              });
            } else {
              variantFormData.append(key, value);
            }
          });

          for (let i = 0; i < value.images.length; i++) {
            variantFormData.append("images", value.images[i]);
          }
          const res = await API_WRAPPER.post(
            "/products/create-variant",
            variantFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (res) {
            continue;
          }
        }
        doneUpload = true;
      } catch (e) {
        console.log(e);
      }
      if (doneUpload) {
        debouncedShowToast("uploaded Successfully", "success");
        Navigate(PATHS.adminProductManagement);
      }
      console.log("RESPONSE RECEIVED: ", response?.data?.data);
      navigate(PATHS.adminProductManagement);
      const data = response.data.data;
      debouncedShowToast(data, "success");
    }
  };
  console.log(selectedAttributes);

  const handleSubmit = (e) => {
    e.preventDefault();
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
  const handleAttributeSelection = (e) => {
    if (e.key === "Enter" && atValue.trim() !== "") {
      let updatedAttrValue = [...attrValue];
      let found = false;

      for (let i = 0; i < updatedAttrValue.length; i++) {
        if (updatedAttrValue[i].name === atName) {
          updatedAttrValue[i].value.push(atValue);
          found = true;
          break;
        }
      }

      if (!found) {
        updatedAttrValue.push({ name: atName, value: [atValue] });
      }

      setAttrValue(updatedAttrValue);
      setAtName(""); // Reset the atName state for the next input
      setAtValue(""); // Reset the atValue state for the next input
    }
  };
  const handleattTypeInputs = (e, type) => {
    const { name, value, files } = e.target;
    console.log("AddProduct.jsx", files);
    const dataArray = fAttValue;

    // Find if the combination of type and name exists in the dataArray
    const existingObjectIndex = dataArray.findIndex((obj) => obj.name === name);

    if (existingObjectIndex !== -1) {
      // If the combination exists, update its value based on the type
      if (type === "price") {
        dataArray[existingObjectIndex].price = value;
      } else if (type === "quantity") {
        dataArray[existingObjectIndex].quantity = value;
      } else if (type === "images") {
        uploadToCloud(files[0]);
        dataArray[existingObjectIndex].images = files;
      }
    } else {
      // If the combination doesn't exist, create a new object and add it to the dataArray
      const newObj = { name };
      newObj[type] = value;
      dataArray.push(newObj);
    }

    // You can return the updated dataArray or perform any other actions as needed
    // console.log('AddProduct.jsx', dataArray);
    setFAttValue(dataArray);
  };
  console.log("AddProduct.jsx", fAttValue);
  // Example usage:
  const dataArray = [];

  console.log(dataArray);

  console.log("AddProduct.jsx", fAttValue);
  console.log("AddProduct.jsx", attrValues);

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
  const convertAttributesList = (arr) => {
    const convertedArr = arr.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
    console.log("CONVERTED ARR: ", convertedArr);
    return convertedArr;
  };
  console.log("AddProduct.jsx", img);

  useEffect(() => {
    getAllCategories();
    getAllVendors();
  }, []);
  useEffect(() => {
    fetchAllAttributes();
  }, [selectedCategory]);

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
              onChange={(e) => handleInputChange(e)}
              className="input input-accent w-2/3"
              type="number"
              name="stockQuantity"
              id=""
            />
          </div>
        </div>
      ),
    },
    {
      label: price ? "variant pricing" : "Attribute",
      content: price ? (
        <div className="flex flex-col gap-5">
          {" "}
          {attrValues.map((a) => (
            <div
              key={nanoid()}
              className="md:h-8 flex w-60 items-center  justify-between gap-10 "
            >
              {a}
              <div className="flex  flex-col md:flex-row">
                <input
                  name={a}
                  placeholder="price"
                  onChange={(e) => handleattTypeInputs(e, "price")}
                  type="text"
                  className="input flex-1 input-accent w-12"
                />
                <input
                  name={a}
                  placeholder="Quantity"
                  onChange={(e) => handleattTypeInputs(e, "quantity")}
                  className="input input-accent flex-1"
                />
                <input
                  type="file"
                  name={a}
                  onChange={(e) => handleattTypeInputs(e, "images")}
                  className="input input-accent flex-1"
                  multiple
                />
              </div>
            </div>
          ))}
        </div>
      ) : selectedCategory.length === 0 ? (
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Product Category</span>
          </label>
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
            className="select select-accent"
          >
            <option value="" disabled selected>
              select category
            </option>
            {categoriesList?.map((category) => {
              return (
                <option value={category._id} key={nanoid()}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
      ) : (
        <div className="form-control w-1/2 relative">
          <MultiSelect
            options={convertAttributesList(attArr)}
            value={selectedAttributes}
            onChange={setSelectedAttributes}
          />
          <div className="h-full">
            {selectedAttributes.map((att) => (
              <div className="h-16 gap-5 flex items-center" key={att.value}>
                <div className="form-group">
                  <label>{att.label}</label>
                  <input
                    onChange={handleAttriibuteValues}
                    className="input input-accent h-8"
                    name={att.value}
                    onKeyPress={handleAttributeSelection}
                  />
                </div>
                <div className="flex gap-2 w-36 overflow-x-scroll flex-shrink-0">
                  {attrValue.map((el) => {
                    if (el.name === att.value) {
                      return el.value.map((item, index) => (
                        <span className="bg-gray-100 rounded" key={index}>
                          {item}
                        </span>
                      ));
                    } else {
                      return null;
                    }
                  })}
                </div>
                <div className="flex gap-2"></div>
              </div>
            ))}
          </div>
          {attrValue.length > 0 && (
            <button
              className="  btn btn-accent"
              onClick={() => {
                generateValueCombinations();
                setFAttValue(
                  attrValues.map((a) => {
                    return { name: a };
                  })
                );
              }}
            >
              set pricing
            </button>
          )}
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
              <input
                name="price"
                onChange={(e) => handleInputChange(e)}
                className="input input-accent"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Compare-at price</span>
              </label>
              <input
                name="compareAtPrice"
                onChange={(e) => handleInputChange(e)}
                className="input input-accent"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];
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
              Publish
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
              <div className="space-x-2">
                {tagsArray.map((tag, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center bg-gray-100 rounded"
                  >
                    <span className="px-2 py-1">{tag}</span>
                    <button
                      className="flex items-center justify-center w-6 h-6 ml-1 text-gray-500 rounded-full hover:bg-red-500 hover:text-white"
                      onClick={() => removeTag(tag)}
                    >
                      &times;
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

        <div className="grid grid-cols-6 gap-4 mt-4">
          <motion.div
            variants={fadeInFromLeftVariant}
            animate="animate"
            initial="initial"
            className="col-span-6 md:col-span-4 bg-base-100 rounded-xl border-[1px] border-base-300 p-4 h-auto"
          >
            <h3 className="font-semibold">Product Organisation Details</h3>
            <hr className="mt-4 relative" />
            <Tabs tabs={tabs} />
          </motion.div>
          <motion.div
            variants={fadeInFromLeftVariant}
            animate="animate"
            initial="initial"
            className="col-span-6 md:col-span-2 bg-base-100 border-[1px] border-base-300 rounded-xl p-4"
          >
            <h3 className="font-semibold">Add Images</h3>
            <hr className="mt-4" />

            <div className="border-[1px]  border-accent rounded-xl flex items-center justify-center mt-4">
              <Dropzone onFilesChange={(data) => setImg(data)} />
            </div>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
