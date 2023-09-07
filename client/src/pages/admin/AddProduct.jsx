import { Dropzone, Header, Tabs } from "../../components";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import ReactQuill from "react-quill";
import { nanoid } from "nanoid";
import { debouncedShowToast } from "../../utils";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import ProductBannerImage from "../../assets/bannerImages/productManagementImage.png";
import { motion } from "framer-motion";
import { fadeInFromLeftVariant, fadeInFromRightVariant } from "../../animation";
import { useDispatch } from "react-redux";
import { setProduct } from "../../features/appConfig/addProductSlice";
import { GrFormClose } from "react-icons/gr";
import Draggable from "react-draggable";
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
  const [preview, setPreview] = useState();
  const [foregroundWidth, setForegroundWidth] = useState(100); // default width
  const [foregroundHeight, setForegroundHeight] = useState(100); // default height
  const [selectedShape, setSelectedShape] = useState("square"); // default shape is "Square"
  const [foregroundX, setForegroundX] = useState(0);
  const [foregroundY, setForegroundY] = useState(0);

  const handleDrag = (e, data) => {
    const parentElement = document.getElementById("parentElement"); // replace with the actual parent element ID
    const newX = Math.floor((data.x / parentElement.clientWidth) * 100);
    const newY = Math.floor((data.y / parentElement.clientHeight) * 100);

    setForegroundX(newX);
    setForegroundY(newY);

    // Update the formData object with the new values
    setFormData((prevData) => ({
      ...prevData,
      foregroundX: newX,
      foregroundY: newY,
    }));
  };

  const dispatch = useDispatch();

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
        // need to check what to be done here
        if (vendorsList.length == 1) {
          debouncedShowToast("vendor list is empty array", "error");
        }
      }
    } catch (error) {
      console.error("Error occured while getting all vendors", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !description ||
      tagsArray.length < 1 ||
      !formData.vendorId ||
      !preview
    ) {
      debouncedShowToast("Fill all required fields", "info");
      return;
    }
    dispatch(setProduct({ ...formData, description, tags: tagsArray }));
    navigate(PATHS.adminAddProductAttributes);
    // postProduct();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTagInputChange = (event) => {
    setTagValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && tagValue.trim() !== "") {
      setTagsArray([...tagsArray, tagValue.trim()]);
      setTagValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    const filteredTags = tagsArray.filter((tag) => tag !== tagToRemove);
    setTagsArray(filteredTags);
  };

  const handleForegroundWidthChange = (e) => {
    const newWidth = parseInt(e.target.value);
    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const maxWidth = img.naturalWidth;

      if (newWidth <= maxWidth) {
        setForegroundWidth(newWidth);

        // Update the formData object with the new width
        setFormData((prevData) => ({
          ...prevData,
          foregroundWidth: newWidth,
        }));
      } else {
        setForegroundWidth(maxWidth);
        setFormData((prevData) => ({
          ...prevData,
          foregroundWidth: maxWidth,
        }));
      }
    };
  };

  useEffect(() => {
    getAllCategories();
    getAllVendors();
  }, []);
  useEffect(() => {}, [selectedCategory]);
  useEffect(() => {
    if (formData.img) {
      const imageUrl = URL.createObjectURL(formData.img[0]);
      setPreview(imageUrl);
    }
  }, [formData.img]);

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
                <span className="label-text">
                  Product Title<span className=" text-red-600">*</span>
                </span>
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="input input-primary"
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
                <span className="label-text">
                  Status<span className=" text-red-600">*</span>
                </span>
              </label>
              <select
                onChange={(e) => handleInputChange(e)}
                className="select select-primary"
                name="status"
              >
                <option disabled selected>
                  select status
                </option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">
                  Ready To Ship:<span className=" text-red-600">*</span>
                </span>
              </label>
              <select
                onChange={(e) => handleInputChange(e)}
                className="select select-primary"
                name="readyToShip"
              >
                <option disabled selected>
                  Default
                </option>
                <option value="true">yes</option>
                <option value="false">no</option>
              </select>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">
                  Free Shipping:<span className=" text-red-600">*</span>
                </span>
              </label>
              <select
                onChange={(e) => handleInputChange(e)}
                className="select select-primary"
                name="freeShipping"
              >
                <option disabled selected>
                  Default
                </option>
                <option value="true">yes</option>
                <option value="false">no</option>
              </select>
            </div>
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
                <span className="label-text">
                  Description<span className=" text-red-600">*</span>
                </span>
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
                <span className="label-text">
                  Vendor<span className=" text-red-600">*</span>
                </span>
              </label>
              <select
                onChange={(e) => handleInputChange(e)}
                className="select select-primary"
                name="vendorId"
                value={formData.vendorId}
              >
                <option value="" disabled selected>
                  select vendor
                </option>
                {vendorsList?.map((vendor) => {
                  return (
                    <option key={nanoid()} value={vendor._id}>
                      {vendor?.firstName ? vendor.firstName : vendor?.email}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* tags needs to be the specific for the multi select component */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">
                  Tags<span className=" text-red-600">*</span>
                </span>
              </label>
              <input
                type="text"
                value={tagValue}
                onChange={handleTagInputChange}
                onKeyDown={handleKeyDown} // Use onKeyDown instead of onKeyPress
                placeholder="Enter a tag and press Enter"
                className="input input-primary"
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
                <span className="label-text">
                  Stock Keeping Unit (SKU)
                  <span className=" text-red-600">*</span>
                </span>
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                className="input input-primary  w-full"
                placeholder="Enter SKU"
                type="text"
                name="sku"
                id=""
              />
            </div>
          </motion.div>
        </div>

        <div className="grid  grid-cols-6 gap-4 mt-4">
          <motion.div
            variants={fadeInFromLeftVariant}
            animate="animate"
            initial="initial"
            className="col-span-6  md:col-span-4 bg-base-100 border-[1px] border-base-300 rounded-xl p-4"
          >
            <h3 className="font-semibold">
              Add Cover Image<span className=" text-red-600">*</span>
            </h3>
            <hr className="mt-4" />

            <div className="border-[1px]  border-primary rounded-xl flex items-center justify-center mt-4">
              <Dropzone
                accept={".png"}
                onFilesChange={(data) => {
                  setFormData({ ...formData, img: data });
                }}
              />
            </div>
          </motion.div>
          <div className="col-span-6 md:col-span-2">
            <motion.div
              variants={fadeInFromRightVariant}
              animate="animate"
              initial="initial"
              className="flex gap-4 p-4 bg-base-100 rounded-xl border-[1px] border-base-300 "
            >
              {preview ? (
                <button
                  onClick={() =>
                    document.getElementById("coverImage_Modal").showModal()
                  }
                  className="btn btn-primary"
                >
                  Show Preview
                </button>
              ) : (
                <p>select image</p>
              )}
              <button onClick={handleSubmit} className="btn btn-primary">
                Next
              </button>
              <Link to={PATHS.adminDashboard} className="btn">
                Cancel
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <dialog id="coverImage_Modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Select Position</h3>
          <div>
            <div style={{ position: "relative" }}>
              <img
                id="parentElement"
                src={preview}
                alt="Cover Image"
                style={{ width: "100%" }}
              />
              <Draggable bounds="parent" onDrag={handleDrag}>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${foregroundWidth}px`,
                    height: `${foregroundHeight}px`,
                    border: "2px solid red",
                    borderRadius: selectedShape === "circle" ? "50%" : "0", // Apply border radius based on selected shape
                  }}
                ></div>
              </Draggable>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex justify-between">
                <label htmlFor="foregroundWidth">Foreground Width:</label>
                <input
                  className="input input-primary"
                  type="number"
                  id="foregroundWidth"
                  value={foregroundWidth}
                  onChange={handleForegroundWidthChange}
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="foregroundHeight">Foreground Height:</label>
                <input
                  className="input input-primary"
                  type="number"
                  id="foregroundHeight"
                  value={foregroundHeight}
                  onChange={(e) =>
                    setForegroundHeight(parseInt(e.target.value))
                  }
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="shapeSelect">Select Shape:</label>
                <select
                  className="select select-primary"
                  id="shapeSelect"
                  value={selectedShape}
                  onChange={(e) => setSelectedShape(e.target.value)}
                >
                  <option value="square">Square</option>
                  <option value="circle">Circle</option>
                </select>
              </div>
              <div>
                <label htmlFor="xPosition">X Position :</label>
                <span id="xPosition">{foregroundX}%</span>
              </div>
              <div>
                <label htmlFor="yPosition">Y Position:</label>
                <span id="yPosition">{foregroundY}%</span>
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <ToastContainer />
    </div>
  );
};

export default AddProduct;
