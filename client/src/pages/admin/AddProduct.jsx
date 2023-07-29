import { Dropzone, Header, Tabs } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";
import { debouncedShowToast } from "../../utils";
import { ToastContainer } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { MultiSelect } from "react-multi-select-component";

// add products
const AddProduct = () => {
  const navigate = useNavigate()
  const [description, setDescription] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({});
  const [tagValue, setTagValue] = useState('');
  const [tagsArray, setTagsArray] = useState([]);
  const [attArr, setAttArr] = useState()
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attrValue, setAttrValue] = useState([])
  const [atName, setAtName] = useState()
  const [atValue, setAtValue] = useState()
  const [price, setPrice] = useState(false)
  const [attrValues, setAttrValues] = useState()
  const [fAttValue, setFAttValue] = useState()


  // Function to generate all possible combinations of multiple arrays as strings
  function generateValueCombinations() {
    let allArrays = []
    attrValue.map(a =>
      allArrays.push(a.value)
    )
    console.log('AddProduct.jsx', allArrays);
    // return
    function generateCombinations(arrays, index = 0, current = '', result = []) {
      if (index === arrays.length) {
        result.push(current);
        return;
      }

      for (let i = 0; i < arrays[index].length; i++) {
        const newCurrent = current === '' ? arrays[index][i] : `${current} ${arrays[index][i]}`;
        generateCombinations(arrays, index + 1, newCurrent, result);
      }

      return result;
    }
    setAttrValues(generateCombinations(allArrays));
    setPrice(true)
  }
  // Example of usage:

  // get all categories
  console.log('AddProduct.jsx', selectedAttributes);
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
        if (vendorsList.length == 1) { }
        console.log('AddProduct.jsx', vendorsList.length)
        console.log("VENDORS LIST RESPONSE: ", response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all vendors", error);
    }
  };
  const fetchAllAttributes = async () => {
    const response = await API_WRAPPER.get(`/attribute/get-all-attributes/${selectedCategory}`)
    setAttArr(response.data);
  }
  console.log('AddProduct.jsx',);
  const randomSlug = () => {
    return nanoid(10);
  };
  // add product
  const postProduct = async () => {
    const response = await API_WRAPPER.post("/products/add-product", {
      ...formData,
      description,
      slug: randomSlug(),
      tags: tagsArray,
      attributes: attrValue
    });
    console.log('AddProduct.jsx', response);
    if (response.status === 201) {
      console.log("RESPONSE RECEIVED: ", response?.data?.data);
      navigate(PATHS.adminProductManagement)
      const data = response.data.data
      debouncedShowToast(data, "success")
    }
  };
  console.log(selectedAttributes)

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
    if (event.key === 'Enter' && tagValue.trim() !== '') {
      setTagsArray([...tagsArray, tagValue.trim()]);
      setTagValue('');
    }
  };
  console.log('AddProduct.jsx', attrValue);
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
      setAtName(''); // Reset the atName state for the next input
      setAtValue(''); // Reset the atValue state for the next input
    }
  };
  const handleattTypeInputs = (e, type) => {
    console.log('AddProduct.jsx', fAttValue);

    let updatedAttrValue = fAttValue
    console.log('AddProduct.jsx', updatedAttrValue);
    let found = false;

    for (let i = 0; i < updatedAttrValue.length; i++) {
      console.log('AddProduct.jsx', updatedAttrValue[i]);
      if (updatedAttrValue[i].name == e.target.name) {
        updatedAttrValue[i][type] = e.target.value
        found = true;
        break;
      }


      if (!found) {

      }

      setFAttValue(updatedAttrValue);
      // Reset the atValue state for the next input
    }
  }
  console.log('AddProduct.jsx', fAttValue);
  console.log('AddProduct.jsx', attrValues);



  // Function to handle attribute values input changes
  const handleAttriibuteValues = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // Check if the attribute value already exists in the array
    setAtName(name)
    setAtValue(value)
  };;

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




  useEffect(() => {
    getAllCategories();
    getAllVendors();
  }, []);
  useEffect(() => {
    fetchAllAttributes()
  }, [selectedCategory])

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
      label:
        price ? "variant pricing" : "Attribute"
      ,
      content: price ?
        <div className="flex flex-col gap-5"> {
          attrValues.map((a) => (
            <div className="h-8 flex items-center w-full justify-between gap-10">{a}
              <input name={a} placeholder="price" onChange={(e) => handleattTypeInputs(e, "price")} type="text" className="input flex-1 input-accent" />
              <input name={a} placeholder="Quantity" onChange={(e) => handleattTypeInputs(e, "quantity")} className="input input-accent flex-1" /></div>
          ))
        }</div>
        : selectedCategory.length === 0 ? (
          <p className="text-center">Select Category First</p>
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
                  <div className="flex gap-2">

                  </div>
                </div>
              ))}
            </div>
            {

              attrValue.length > 0 && <button className="  btn btn-accent" onClick={() => {

                generateValueCombinations()
                setFAttValue(attrValues.map(a => { return { name: a } }))
              }}>set pricing</button>
            }

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
  console.log('AddProduct.jsx', selectedCategory);

  return (
    <div>
      <Header
        heading="Add Products"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. isadjv oiasreoi ihusdf bquhwdi euh."
        image={HeaderImgTwo}
      />
      <div className="w-full  mt-8">
        <div className="flex ">
          <div className="bg-base-200 shadow-md p-4 mx-4 w-2/3  rounded-xlv">
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
          <div className="bg-base-200 shadow-md p-4 mx-4 w-1/3">
            <h3 className="font-semibold">Product Status</h3>
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
          </div>
        </div>

        <div className="flex mt-8">
          <div className="bg-base-200 shadow-md p-4 mx-4 w-2/3">
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
          <div className="bg-base-200 shadow-md p-4 mx-4 w-1/3">
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
                <option value="" disabled selected>select category</option>
                {categoriesList?.map((category) => {
                  return <option value={category._id} key={nanoid()}>{category.name}</option>;
                })}
              </select>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Vendor</span>
              </label>
              <select
                onChange={(e) => handleInputChange(e)}
                className="select select-accent"
                name="vendorId"
              >
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
                  <div key={index} className="inline-flex items-center bg-gray-100 rounded">
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
          </div>
        </div>
        <div className="flex mt-8">
          <div className="bg-base-200 shadow-md p-4 mx-4 w-2/3 h-auto">
            <h3 className="font-semibold">Basic Tabs</h3>
            <hr className="mt-4 relative" />
            <Tabs tabs={tabs} />
          </div>
          <div className="bg-base-200 shadow-md p-4 mx-4 w-1/3">
            <h3 className="font-semibold">Add Images</h3>
            <hr className="mt-4" />

            <div className="border-[1px]  border-accent rounded-xl flex items-center justify-center mt-4">
              <Dropzone />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
