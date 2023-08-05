import { useEffect, useState } from "react";
import { Header } from "../../components";
import { motion } from "framer-motion";
import {
  fadeInVariants,
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
  buttonVariants,
} from "../../animation";
import API_WRAPPER from "../../api";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import DiscountBannerImage from "../../assets/bannerImages/discountImage.png";

const AddDiscount = () => {
  const [discountData, setDiscountData] = useState({});
  const [
    minimumPurchaseAmountInputToggle,
    setMinimumPurchaseAmountInputToggle,
  ] = useState(false);
  const [
    minimumQuantityOfItemsInputToggle,
    setMinimumQuantityOfItemsInputToggle,
  ] = useState(false);
  const [
    specificCustomerSegmentInputToggle,
    setSpecificCustomerSegmentInputToggle,
  ] = useState(false);
  const [specificCustomerInputToggle, setSpecificCustomerInputToggle] =
    useState(false);
  const [showEndDateAndTimeToggle, setShowEndDateAndTimeToggle] =
    useState(false);
  const [limitNumberOfTimesInputToggle, setLimitNumberOfTimesInputToggle] =
    useState(false);
  const [appliedToSpecifiedInput, setAppliedToSpecifiedInput] = useState(null);
  const [appliedToSearchInput, setAppliedToSearchInput] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [collectionsList, setCollectionsList] = useState([]);
  const [appliedToFilteredState, setAppliedToFilteredState] = useState([]);
  const [appliedToFilteredItemsObjects, setAppliedToFilteredItemsObjects] =
    useState([]);
  const [customers, setCustomers] = useState();

  const getCustomers = async () => {
    const response = await API_WRAPPER.get("/customers/get-customers");
    setCustomers(response.data.customers);
  };
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

  // get all products
  const getAllProducts = async () => {
    try {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setProductsList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all categories", error);
    }
  };
  // get all collections
  const getAllCollections = async () => {
    try {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setCollectionsList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all categories", error);
    }
  };
  const navigate = useNavigate();

  const postDiscount = async () => {
    const response = await API_WRAPPER.post(
      "/discount/create-discount",
      discountData
    );
    if (response.status === 201) {
      console.log("DISCOUNT DATA POSTED: ", response.data);
      navigate(PATHS.adminDiscounts);
    }
  };

  const appliedToSeachAndFilter = (inputValue, searchParameter) => {
    switch (searchParameter) {
      case "specify-collections":
        return setAppliedToFilteredState(
          collectionsList.filter((collection) => {
            // Filter based on title
            return collection?.title
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          })
        );

      case "specify-products":
        return setAppliedToFilteredState(
          productsList.filter((product) => {
            // Filter based on product name
            return product?.name
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          })
        );

      case "specify-categories":
        return setAppliedToFilteredState(
          categoriesList.filter((category) => {
            // Filter based on category name
            return category?.name
              .toLowerCase()
              .includes(inputValue.toLowerCase());
          })
        );

      default:
        return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiscountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("DISCOUNT INPUT STATE: ", discountData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    switch (appliedToSpecifiedInput) {
      case "specify-collections":
        setDiscountData((prevState) => {
          return { ...prevState, collectionId: appliedToFilteredItemsObjects };
        });
        break;

      case "specify-products":
        setDiscountData((prevState) => {
          return { ...prevState, productId: appliedToFilteredItemsObjects };
        });
        break;

      case "specify-categories":
        setDiscountData((prevState) => {
          return { ...prevState, categoryId: appliedToFilteredItemsObjects };
        });
        break;

      default:
        break;
    }
    await postDiscount();
    console.log("DISCOUNTS OBJECT: ", discountData);
  };

  const handleAppliedToSelectInputs = (e) => {
    setAppliedToSpecifiedInput(e.target.value);
    console.log("APPLIED TO SELECT: ", e.target.value);
  };

  const handleAppliedToSearch = (e) => {
    setAppliedToSearchInput(e.target.value);
    appliedToSeachAndFilter(e.target.value, appliedToSpecifiedInput);
  };

  const handleAddFilteredItemToState = (item) => {
    setAppliedToFilteredItemsObjects((prevState) => [...prevState, item._id]);
    window.applied_to_search_modal.close();
  };
  console.log("AddDiscount.jsx", appliedToFilteredItemsObjects);

  useEffect(() => {
    console.log("APPIELD SEARCH FILTERED ARR: ", appliedToFilteredState);
  }, [appliedToSearchInput, appliedToFilteredState]);

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    getCustomers();
    getAllCollections();
  }, []);

  return (
    <div>
      <Header
        heading="Add Discount"
        subheading="This is a sub heading for the add discount section which reminds us to put a brief description about the Add Discounts page"
        image={DiscountBannerImage}
      />
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-4 gap-4">
        {/* amount of products -> Method */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInFromLeftVariant}
          className="col-span-4 md:col-span-3 p-4 bg-base-100  rounded-xl border-[1px] border-base-300"
        >
          <div className="flex justify-between py-4">
            <h2 className="font-bold">Amount of products</h2>
            <p className="text-gray-400">Product discount</p>
          </div>
          <hr />
          <div>
            <div className="form-control flex flex-row items-center gap-4">
              <div className="form-control w-full">
                <label htmlFor="" className="label">
                  <span className="label-text">Discount Title</span>
                </label>
                <input
                  onChange={handleInputChange}
                  name="title"
                  type="text"
                  className="input input-bordered input-primary bg-transparent t w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
        {/* customer eligibility */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInFromRightVariant}
          className="col-span-4 md:col-span-1 p-4 bg-base-100 rounded-xl border-[1px] border-base-300"
        >
          <h2 className="font-bold">Customer Eligibility</h2>
          <div className="mt-4">
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={(e) => {
                  setSpecificCustomerInputToggle(false);
                  setSpecificCustomerSegmentInputToggle(false);
                  handleInputChange(e);
                }}
                name="eligibilityTitle"
                className="radio radio-accent"
                type="radio"
                value="all_customers"
              />
              <label className="label">
                <span className="label-text">All Customers</span>
              </label>
            </div>
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={(e) => {
                  setSpecificCustomerSegmentInputToggle(
                    (prevState) => !prevState
                  );
                  setSpecificCustomerInputToggle(false);
                  handleInputChange(e);
                }}
                name="eligibilityTitle"
                value={"specific_customer_segment"}
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">Specific customer segments</span>
              </label>
            </div>
            {specificCustomerSegmentInputToggle && (
              <div>
                <input
                  onChange={handleInputChange}
                  className="input input-primary w-full"
                  type="text"
                  name="eligibilityValue"
                  id="eligibility-value"
                  placeholder="enter SCG value"
                />
              </div>
            )}
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={(e) => {
                  setSpecificCustomerInputToggle((prevState) => !prevState);
                  setSpecificCustomerSegmentInputToggle(false);
                  handleInputChange(e);
                }}
                name="eligibilityTitle"
                value="specific_customer"
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">Specific customers</span>
              </label>
            </div>
            {specificCustomerInputToggle && (
              <div>
                <select
                  onChange={handleInputChange}
                  name="eligibilityValue"
                  className="input input-primary w-full"
                >
                  {customers.map((customer) => (
                    <option key={nanoid()}>
                      {" "}
                      {`${customer.firstName}(${customer.email})`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </motion.div>
        {/* value */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInFromLeftVariant}
          className="col-span-4 md:col-span-3 p-4 bg-base-100 rounded-xl border-[1px] border-base-300"
        >
          <h2 className="font-bold">Value</h2>
          <div className="py-4 grid grid-cols-2 mt-5">
            <div className="join col-span-1 ">
              <input
                onChange={(e) => handleInputChange(e)}
                className="join-item btn"
                type="radio"
                name="typeTitle"
                value="fixed_value"
                aria-label="Fixed Amount"
              />
              <input
                onChange={(e) => handleInputChange(e)}
                className="join-item btn"
                type="radio"
                name="typeTitle"
                value="percentage"
                aria-label="Percentage"
              />
            </div>
            <div className="form-control col-span-1 w-full">
              <label className="input-group">
                <input
                  onChange={(e) => handleInputChange(e)}
                  name="typeValue"
                  type="number"
                  placeholder="0.01"
                  className="input input-bordered w-full" // Added w-full class here
                />
                <span>%</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* minimum purchase requirements */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInFromRightVariant}
          className="col-span-4 md:col-span-1 p-4 bg-base-100 rounded-xl border-[1px] border-base-300"
        >
          <h2 className="font-bold">Minimum purchase requirements</h2>
          <div className="mt-4">
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={(e) => {
                  setMinimumPurchaseAmountInputToggle(false);
                  setMinimumQuantityOfItemsInputToggle(false);
                  handleInputChange(e);
                }}
                name="requirementTitle"
                className="radio radio-accent"
                type="radio"
                value="no_minimum_requirement"
              />
              <label className="label">
                <span className="label-text">No minimum requirements</span>
              </label>
            </div>
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={(e) => {
                  setMinimumPurchaseAmountInputToggle(
                    (prevState) => !prevState
                  );
                  setMinimumQuantityOfItemsInputToggle(false);
                  handleInputChange(e);
                }}
                name="requirementTitle"
                className="radio radio-accent"
                type="radio"
                value="minimum_purchase_amount"
              />
              <label className="label">
                <span className="label-text">Minimum purchase amount(Rs)</span>
              </label>
            </div>

            {minimumPurchaseAmountInputToggle && (
              <div>
                <input
                  onChange={handleInputChange}
                  className="input input-primary w-full"
                  type="text"
                  name="requirementValue"
                  id="requirement-value"
                  placeholder="enter min purchase amount"
                />
              </div>
            )}
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={(e) => {
                  setMinimumQuantityOfItemsInputToggle(
                    (prevState) => !prevState
                  );
                  setMinimumPurchaseAmountInputToggle(false);
                  handleInputChange(e);
                }}
                name="requirementTitle"
                className="radio radio-accent"
                type="radio"
                value="minimum_quantity_of_items"
              />
              <label className="label">
                <span className="label-text">Minimum quantity of items</span>
              </label>
            </div>
            {minimumQuantityOfItemsInputToggle && (
              <div>
                <input
                  onChange={handleInputChange}
                  className="input input-primary w-full"
                  type="text"
                  name="requirementValue"
                  id="requirement-value"
                  placeholder="enter min quantity of items"
                />
              </div>
            )}
          </div>
        </motion.div>
        {/* applies to */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInFromLeftVariant}
          className="col-span-4 md:col-span-3 p-4 bg-base-100 rounded-xl border-[1px] border-base-300"
        >
          <h2 className="font-bold">Applies To</h2>
          <div className="mt-4">
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={(e) => handleAppliedToSelectInputs(e)}
                className="radio radio-accent"
                type="radio"
                name="specifyCollection"
                value="specify-collections"
                id="specify-collections"
              />
              <label className="label">
                <span className="label-text">Specify Collections</span>
              </label>
            </div>
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={(e) => handleAppliedToSelectInputs(e)}
                className="radio radio-accent"
                type="radio"
                name="specifyCollection"
                value="specify-products"
                id="specify-products"
              />
              <label className="label">
                <span className="label-text">Specify Products</span>
              </label>
            </div>
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={(e) => handleAppliedToSelectInputs(e)}
                className="radio radio-accent"
                type="radio"
                name="specifyCollection"
                value="specify-categories"
                id="specify-categories"
              />
              <label className="label">
                <span className="label-text">Specify Categories</span>
              </label>
            </div>

            <div className="form-control flex mt-4">
              <div className="input-group ">
                <input
                  onChange={(e) => handleAppliedToSearch(e)}
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered flex-grow"
                />
                <button
                  onClick={() => window.applied_to_search_modal.showModal()}
                  className="btn btn-square btn-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
        {/* maximum discount uses */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInFromRightVariant}
          className="col-span-4 md:col-span-1 p-4 bg-base-100 rounded-xl border-[1px] border-base-300"
        >
          <h2 className="font-bold">Maximum discount uses</h2>
          <div className="mt-4">
            <div className="form-control flex-row items-center gap-4">
              <input
                className="radio radio-accent"
                type="radio"
                name="totalLimit"
                onChange={() =>
                  setLimitNumberOfTimesInputToggle((prevState) => !prevState)
                }
                id="limit-01"
              />
              <label className="label">
                <span className="label-text">
                  Limit number of times this discount can be used in total
                </span>
              </label>
            </div>
            {limitNumberOfTimesInputToggle && (
              <div>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="input input-primary w-full"
                  type="text"
                  name="totalLimit"
                  id="requirement-value"
                  placeholder="enter min quantity of items"
                />
              </div>
            )}
            <div className="form-control flex-row items-center gap-4">
              <input
                className="radio radio-accent"
                type="radio"
                name="totalLimit"
                onChange={(e) => {
                  handleInputChange(e);
                  setLimitNumberOfTimesInputToggle(false);
                }}
                id="limit-02"
                value={1}
              />
              <label className="label">
                <span className="label-text">
                  Limit to one use per customer
                </span>
              </label>
            </div>
          </div>
        </motion.div>
        {/* active dates */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInFromLeftVariant}
          className="col-span-4 md:col-span-3 p-4 bg-base-100 rounded-xl border-[1px] border-base-300"
        >
          <h2 className="font-bold">Active Dates</h2>
          <div className="mt-4 flex  justify-between gap-4">
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Start date</span>
              </label>
              <input
                onChange={handleInputChange}
                className="input input-primary"
                type="date"
                name="activeDate"
              />
            </div>
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Start time (IST)</span>
              </label>
              <input
                onChange={handleInputChange}
                className="input input-primary"
                type="time"
                name="activeTime"
              />
            </div>
          </div>
          <div className="form-control flex flex-row items-center mt-4 gap-4">
            <input
              onChange={() =>
                setShowEndDateAndTimeToggle((prevState) => !prevState)
              }
              className="checkbox"
              type="checkbox"
              name=""
              id=""
            />
            <label className="label">
              <span className="label-text ">Set End Date</span>
            </label>
          </div>
          {showEndDateAndTimeToggle && (
            <div className="mt-4 flex  justify-between gap-4">
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">End Date</span>
                </label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="input input-primary"
                  type="date"
                  name="endDate"
                />
              </div>
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">End Time (IST)</span>
                </label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  className="input input-primary"
                  type="time"
                  name="endTime"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* combinations */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInFromRightVariant}
          className="col-span-4 md:col-span-1 p-4 bg-base-100 rounded-xl border-[1px] border-base-300"
        >
          <h2 className="font-bold">Combinations</h2>
          <div className="mt-4">
            <p>This product discount can be combined with:</p>
            <div className="form-control flex-row items-center gap-4">
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="combinations"
                onChange={handleInputChange}
              />
              <label className="label">
                <span className="label-text">Product discounts</span>
              </label>
            </div>
            <div className="form-control flex-row items-center gap-4">
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="combinations"
                onChange={handleInputChange}
              />
              <label className="label">
                <span className="label-text">Shipping discounts</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* submit buttons */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInVariants}
          className="col-span-4 flex gap-4 justify-end items-center mt-4  border-t-[1px] p-4 "
        >
          <div className="flex w-1/2 justify-end gap-4 mt-4">
            <button className="btn w-32  btn-primary ">Submit</button>
            <button className="btn w-32  btn-outline ">Reset</button>
          </div>
        </motion.div>
      </form>

      {/* applied to search modal */}
      <dialog id="applied_to_search_modal" className="modal ">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg mb-4">
            Searching by:{" "}
            <span className="text-accent-focus">{appliedToSpecifiedInput}</span>
          </h3>
          <input
            onChange={(e) => handleAppliedToSearch(e)}
            type="text"
            placeholder="Search…"
            className="input input-bordered w-full"
            value={appliedToSearchInput}
          />

          <div className="my-4">
            Filtered by:{" "}
            <span className="text-teal-500">{appliedToSearchInput}</span>
          </div>
          {appliedToFilteredState[0]?.name
            ? appliedToFilteredState.map((filteredObj) => {
                return (
                  <motion.div
                    variants={buttonVariants}
                    whileTap={{ scale: 0.8 }}
                    initial="initial"
                    whileHover="hover"
                    onClick={() => handleAddFilteredItemToState(filteredObj)}
                    key={nanoid()}
                    className={` ${
                      appliedToFilteredItemsObjects.includes(filteredObj)
                        ? "bg-accent"
                        : "bg-base-200"
                    } rounded-xl shadow-xl p-4 flex justify-between my-2 cursor-pointer`}
                  >
                    <p>Name: {filteredObj?.name}</p>
                    {/* <p>ID: {filteredObj?._id}</p> */}
                  </motion.div>
                );
              })
            : appliedToFilteredState.map((filteredObj) => {
                return (
                  <motion.div
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    onClick={() => handleAddFilteredItemToState(filteredObj)}
                    key={nanoid()}
                    className={` ${
                      appliedToFilteredItemsObjects.includes(filteredObj)
                        ? "bg-accent"
                        : "bg-base-200"
                    } rounded-xl shadow-xl p-4 flex justify-between my-2 cursor-pointer`}
                  >
                    <p>Title: {filteredObj?.title}</p>
                    <p>ID: {filteredObj?._id}</p>
                  </motion.div>
                );
              })}

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default AddDiscount;
