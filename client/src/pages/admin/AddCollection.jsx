import React, { useCallback, useEffect, useState, useMemo } from "react";
import { nanoid } from "nanoid";
import API_WRAPPER from "../../api";
import ReactQuill from "react-quill";
import { motion } from "framer-motion";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
  fadeInVariants,
} from "../../animation";
import { Dropzone, Header, ReusableTable } from "../../components";

const AddCollection = () => {
  const initialFormData = {
    title: "",
    status: "ACTIVE",
    radioSelection: "all",
    filterDivStates: [
      {
        selectedTitle: "",
        conditionValue: "",
        inputValue: "",
      },
    ],
  };

  const [formData, setFormData] = useState(initialFormData);

  const { title, status, radioSelection, filterDivStates } = formData;

  const [collectionConditionList, setCollectionConditionList] = useState([]);
  const [conditionValueList, setConditionValueList] = useState([]);
  const [filteredConditionValues, setFilteredConditionValues] = useState([]);
  const [filterDivCount, setFilterDivCount] = useState(1);
  const [collectionProductTableList, setCollectionProductTableList] = useState(
    []
  );
  const [descriptionValue, setDescriptionValue] = useState("");
  const [deactivatedProducts, setDeactivatedProducts] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Product Id",
        accessor: "_id",
      },
      {
        Header: "Product Name",
        accessor: "name",
      },
      {
        Header: "Slug",
        accessor: "slug",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "tags",
        accessor: "'tags",
      },
      {
        Header: "On Sale",
        accessor: "onSale",
        Cell: ({ row }) => {
          return <p>{row.onSale ? "ON SALE" : ""}</p>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Stock Quantity",
        accessor: "stockQuantity",
      },
      {
        Header: "Stock Status",
        accessor: "stockStatus",
      },
    ],
    []
  );

  const data = useMemo(
    () => collectionProductTableList,
    [collectionProductTableList]
  );

  const getAllCollectionConditions = async () => {
    const response = await API_WRAPPER.get(
      "/collection-condition/get-all-collection-conditions"
    );
    if (response.status === 200) {
      setCollectionConditionList(response?.data);
      console.log("Collection Condition List: ", response?.data);
    }
  };

  const getAllConditionValues = async () => {
    const response = await API_WRAPPER.get(
      "/condition-value/get-all-condition-values"
    );
    if (response.status === 200) {
      setConditionValueList(response?.data);
      console.log("CONDITION VALUE LIST: ", response?.data);
    }
  };

  const postRawFilterData = async () => {
    const changedTitleFilterArr = filterDivStates.map((filter) => {
      switch (filter.selectedTitle) {
        case "compare at price":
          return { ...filter, selectedTitle: "compareAtPrice" };

        case "Product's Title":
          return { ...filter, selectedTitle: "name" };

        case "Product Category":
          return { ...filter, selectedTitle: "category" };

        case "Product Vendor":
          return { ...filter, selectedTitle: "vendorId" };

        case "Product Tag":
          return { ...filter, selectedTitle: "tags" };

        case "Price ":
          return { ...filter, selectedTitle: "price" };

        case "Weight":
          return { ...filter, selectedTitle: "weight" };

        case "Inventory Stock ":
          return { ...filter, selectedTitle: "stockQuantity" };

        case "Attribute (Variants)":
          return { ...filter, selectedTitle: "attributes" };

        default:
          return filter;
      }
    });

    console.log("CHANGED TITLE FILTER ARR: ", changedTitleFilterArr);

    try {
      const response = await API_WRAPPER.post("/collection/filter-data", {
        filters: changedTitleFilterArr,
        radioSelection: radioSelection,
      });

      if (response.status === 200) {
        setCollectionProductTableList(response?.data);
        console.log("RESPONSE COLLECTION TABLE DATA: ", response?.data);
      }
    } catch (error) {
      console.error("Error occurred while posting raw filter data", error);
    }
  };

  const postCollection = async (payload) => {
    const response = await API_WRAPPER.post(
      "/collection/create-collection",
      payload
    );
    if (response.status === 200) {
      console.log("COLLECTION CREATED SUCCESSFULL", response?.data);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setDescriptionValue("");
    // Add other states that need to be reset to their initial values
  };

  const handleRadioChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      radioSelection: e.target.value,
      filterDivStates: [
        {
          selectedTitle: "",
          conditionValue: "",
          inputValue: "",
        },
      ],
    }));
  };

  const handleAddFilter = () => {
    if (filterDivCount < conditionValueList.length) {
      setFilterDivCount((prevCount) => prevCount + 1);
      setFormData((prevData) => ({
        ...prevData,
        filterDivStates: [
          ...prevData.filterDivStates,
          {
            selectedTitle: "",
            conditionValue: "",
            inputValue: "",
          },
        ],
      }));
    }
  };

  const handleRemoveFilter = (index) => {
    if (filterDivCount > 1) {
      setFilterDivCount((prevCount) => prevCount - 1);
      setFormData((prevData) => ({
        ...prevData,
        filterDivStates: prevData.filterDivStates.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSelectedObjectChange = useCallback((selectedRows) => {
    setDeactivatedProducts(selectedRows);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("FORM DATA: ", formData);
  };

  const handleTitleChange = (index, value) => {
    const updatedStates = [...filterDivStates];
    updatedStates[index].selectedTitle = value;

  // handle title change
  const handleTitleChange = (index, e) => {
    const { value } = e.target;

    setFormData((prevData) => {
      const updatedFilterDivStates = prevData.filterDivStates.map(
        (state, i) => {
          if (i === index) {
            return {
              ...state,
              selectedTitle: value,
              conditionValue: "", // Reset the condition value when the title changes
            };
          }
          return state;
        }
      );

      const selectedCondition = collectionConditionList.find(
        (condition) => condition.title === value
      );

      setFilteredConditionValues(filteredIds);
    } else {
      updatedStates[index].conditionValue = "";
      setFilteredConditionValues([]);
    }
    setFormData((prevData) => ({
      ...prevData,
      filterDivStates: updatedStates,
    }));
  };
  console.log('AddCollection.jsx', deactivatedProducts);

  const handleConditionValueChange = (index, value) => {
    const updatedStates = [...filterDivStates];
    updatedStates[index].conditionValue = value;
    setFormData((prevData) => ({
      ...prevData,
      filterDivStates: updatedStates,
    }));
  };
  const handleInputValueChange = (index, value) => {
    const updatedStates = [...filterDivStates];
    updatedStates[index].inputValue = value;
    setFormData({ ...formData, filterDivStates: updatedStates });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const extractedConditionValues = filterDivStates.map(
      (item) => item.conditionValue
    );

    const nonEmptyConditionValues = extractedConditionValues.filter(
      (value) => value !== ""
    );

    const payload = {
      title,
      status,
      radioSelection,
      collectionConditionIds: nonEmptyConditionValues,
      conditionValue: extractedConditionValues,
      description: descriptionValue,
      deactiveProducts: deactivatedProducts.map((product) => product._id) || [],
      activeProducts: activeProducts.map((product) => product._id) || [],
    };

    try {
      await postCollection(payload);
      resetForm();
    } catch (error) {
      console.error("Error occurred while posting collection", error);
    }
  };

  useEffect(() => {
    getAllCollectionConditions();
    getAllConditionValues();
  }, []);

  useEffect(() => {
    const selectedCondition = collectionConditionList.find(
      (condition) => condition.title === formData.selectedTitle
    );

    if (selectedCondition) {
      const filteredIds = selectedCondition.conditionValues.filter((value) =>
        conditionValueList.some((condition) => condition._id === value)
      );
      setFilteredConditionValues(filteredIds);
    } else {
      setFilteredConditionValues([]);
    }
  }, [formData.selectedTitle, collectionConditionList, conditionValueList]);

  return (
    <div>
      <Header
        heading="Collections"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
      // image={CollectionBannerImg}
      />
      <div className="mt-12">
        <div className="grid grid-cols-3 gap-4">
          {/* collection title */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInFromLeftVariant}
            className="col-span-2 bg-base-100 px-4 py-8 rounded-xl shadow-lg"
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Collection Title</span>
              </label>
              <input
                className="input input-accent"
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={handleChange}
              />
            </div>
          </motion.div>
          {/* status */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInFromRightVariant}
            className="col-span-1  bg-base-100 px-4 py-8 rounded-xl shadow-lg"
          >
            <div className="form-control">
              <label htmlFor="status-select" className="label">
                <span className="label-text">status</span>
              </label>
              <select
                className="select select-accent"
                id="status-select"
                name="status"
                value={status}
                onChange={handleChange}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="PENDING">PENDING</option>
                <option value="DEACTIVE">DEACTIVE</option>
              </select>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="bg-themeColor btn rounded-full text-white">
                Publish
              </button>
              <button className="bg-[#5B6B79] btn rounded-full text-white">
                Cancel
              </button>
            </div>
          </motion.div>
          {/* description */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInFromLeftVariant}
            className="col-span-3 bg-base-100 px-4 py-8 rounded-xl shadow-lg"
          >
            <h1>Description</h1>
            <div className="mt-4">
              <ReactQuill
                className="h-[200px]"
                value={descriptionValue}
                onChange={setDescriptionValue}
              />
            </div>
          </motion.div>
          {/* collections */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInVariants}
            className="col-span-3  bg-base-100 px-4 py-8 rounded-xl shadow-lg"
          >
            <h1>Collections</h1>
            <div className="form-control flex-row items-center">
              <label className="label">
                <span className="label-text">Product must match:</span>
              </label>
              <div className="flex items-center gap-4 ml-4">
                <input
                  className="radio radio-accent"
                  type="radio"
                  name="radioSelection"
                  id="radioAll"
                  value="all"
                  checked={radioSelection === "all"}
                  onChange={handleRadioChange}
                />
                <label className="label" htmlFor="radioAll">
                  <span className="label-text">all conditions</span>
                </label>

                <input
                  className="radio radio-accent"
                  type="radio"
                  name="radioSelection"
                  id="radioAny"
                  value="any"
                  checked={radioSelection === "any"}
                  onChange={handleRadioChange}
                />
                <label className="label" htmlFor="radioAny">
                  <span className="label-text">any conditions</span>
                </label>
              </div>
            </div>

            {filterDivStates.map((state, index) => (
              <div
                id={`filter-div-${index + 1}`}
                className="grid grid-cols-3 gap-4 mt-4"
                key={nanoid()}
              >
                <div>
                  <select
                    onChange={(e) => handleTitleChange(index, e)}
                    value={state.selectedTitle}
                    placeholder="Title"
                    className="select select-accent w-full"
                  >
                    <option value="">Select Title</option>
                    {collectionConditionList?.map((item) => (
                      <option key={nanoid()} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    onChange={(e) =>
                      handleConditionValueChange(index, e.target.value)
                    }
                    value={state.conditionValue}
                    placeholder="Is greater than"
                    className="select select-accent w-full"
                  >
                    <option value="">Select Operator</option>
                    {filteredConditionValues.map((conditionVal) => {
                      const conditionValue = conditionValueList.find(
                        (value) => value._id === conditionVal._id
                      );
                      if (conditionValue) {
                        return (
                          <option key={nanoid()} value={conditionValue._id}>
                            {conditionValue.conditionValue}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </select>
                </div>
                <div>
                  <input
                    onChange={(e) =>
                      handleInputValueChange(index, e.target.value)
                    }
                    type="text"
                    value={state.inputValue}
                    placeholder="value"
                    className="input input-accent"
                  />
                </div>
                <div className="col-span-3 flex items-center gap-2 mt-4">
                  {filterDivStates.length !== 1 && (
                    <button
                      onClick={() => handleRemoveFilter(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={handleAddFilter}
              className="btn btn-accent mt-4 mb-4"
            >
              Add Filter
            </button>
          </motion.div>
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInFromRightVariant}
          className="mt-12 bg-base-100 px-4 py-8 rounded-xl shadow-lg"
        >
          <div className="mb-4">
            <h1>Selected Products</h1>
          </div>
          <ReusableTable
            columns={columns}
            data={data}
            handleSelectedObjectChange={handleSelectedObjectChange}
          />
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInVariants}
          className="mt-12 bg-base-100 px-4 py-8 rounded-xl shadow-lg"
        >
          <div className="mb-4">
            <h1>Activated Products</h1>
          </div>
          <ReusableTable
            columns={columns}
            data={activeProducts}
            handleSelectedObjectChange={handleSelectedObjectChange}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AddCollection;
