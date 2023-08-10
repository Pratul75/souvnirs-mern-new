import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_WRAPPER from "../../../api";
import { Dropzone, Header } from "../../../components";
import { ToastContainer } from "react-toastify";
import ProductBannerImage from "../../../assets/bannerImages/productManagementImage.png";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
} from "../../../animation";

import { motion } from "framer-motion";
import ReactQuill from "react-quill";

const EditProduct = () => {
  const [description, setDescription] = useState();
  const [editedData, setEditedData] = useState();
  const [prefilledData, setPrefilledData] = useState();
  const [formData, setFormData] = useState();

  const [vendorsList, setVendorsList] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [preview, setPreview] = useState();

  const { id } = useParams();
  const fetchProductData = async (id) => {
    const response = await API_WRAPPER.get(
      `/products/get-single-product/${id}`
    );
    setFormData(response.data);
    console.log("EditProduct.jsx", response);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && tagValue.trim() !== "") {
      setTagsArray([...tagsArray, tagValue.trim()]);
      setTagValue("");
    }
  };

  const handleTagInputChange = (event) => {
    setTagValue(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
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
  useEffect(() => {
    fetchProductData(id);
    getAllVendors();
  }, []);
  console.log("EditProduct.jsx", id);
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
                value={formData.name}
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
                <span className="label-text">
                  Status<span className=" text-red-600">*</span>
                </span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange(e)}
                className="select select-accent"
                name="status"
                defaultValue={prefilledData?.status}
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
                value={formData.readyToShip}
                defaultValue={prefilledData?.readyToShip}
                onChange={(e) => handleInputChange(e)}
                className="select select-accent"
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
                value={formData.freeShipping}
                onChange={(e) => handleInputChange(e)}
                className="select select-accent"
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
                defaultValue={prefilledData?.description}
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
                defaultValue={prefilledData?.vendorId}
                onChange={(e) => handleInputChange(e)}
                className="select select-accent"
                name="vendorId"
              >
                <option value="" disabled selected>
                  select vendor
                </option>
                {vendorsList?.map((vendor) => {
                  return <option value={vendor._id}>{vendor.firstName}</option>;
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
                <span className="label-text">
                  Stock Keeping Unit (SKU)
                  <span className=" text-red-600">*</span>
                </span>
              </label>
              <input
                defaultValue={prefilledData?.sku}
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

            <div className="border-[1px]  border-accent rounded-xl flex items-center justify-center mt-4">
              <Dropzone
                accept={".jpeg,.png"}
                onFilesChange={(data) => {
                  setFormData({ ...formData, img: data });
                }}
              />
            </div>
          </motion.div>
          <motion.div className="col-span-6  md:col-span-2 bg-base-100 border-[1px] border-base-300 rounded-xl p-4 flex items-center">
            {preview ? (
              <img src={preview} alt="" />
            ) : (
              <img src={prefilledData?.coverImage} alt="" />
            )}
          </motion.div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-4">
          <div className="col-span-6 md:col-span-4"></div>
          <motion.div
            variants={fadeInFromRightVariant}
            animate="animate"
            initial="initial"
            className="col-span-6 flex justify-end float-right md:col-span-2 bg-base-100 rounded-xl border-[1px] border-base-300 p-4  "
          >
            <button className="btn btn-accent mt-4">Next</button>
            <button className="btn  mt-4 ml-4">Cancel</button>
          </motion.div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
