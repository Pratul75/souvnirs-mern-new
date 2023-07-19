import { Dropzone, Header, ReusableTable } from "../../components";
// import CollectionBannerImg from "../../assets/images/collectionBannerImg.png";
import ReactQuill from "react-quill";
import API_WRAPPER from "../../api";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  fadeInFromLeftVariant,
  fadeInFromRightVariant,
  fadeInVariants,
} from "../../animation";

const Collection = () => {
  const [formData, setFormData] = useState({
    collectionTitle: "",
    publishing: "onlineStore",
    description: "",
    radioSelection: "all",
    filterDivStates: [
      {
        selectedTitle: "",
        conditionValue: "",
        inputValue: "",
      },
    ],
  });

  const {
    collectionTitle,
    publishing,
    description,
    radioSelection,
    filterDivStates,
  } = formData;

  const [collectionConditionList, setCollectionConditionList] = useState([]);
  const [conditionValueList, setConditionValueList] = useState([]);
  const [filteredConditionValues, setFilteredConditionValues] = useState([]);
  const [filterDivCount, setFilterDivCount] = useState(1);
  const [collectionProductTableList, setCollectionProductTableList] = useState(
    []
  );

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
        // TODO:  make it work in future
        Cell: ({ row }) => {
          return <p>{row && "ON SALE"}</p>;
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

  // post raw filter data that gets handled in backend
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
      const response = await API_WRAPPER.post(
        "/collection/filter-data",
        changedTitleFilterArr
      );

      if (response.status === 200) {
        setCollectionProductTableList(response?.data);
        console.log("RESPONSE COLLECTION TABLE DATA: ", response?.data);
      }
    } catch (error) {
      console.error("Error occurred while posting raw filter data", error);
    }
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, radioSelection: e.target.value });
  };

  const handleAddFilter = () => {
    if (filterDivCount < conditionValueList.length) {
      setFilterDivCount((prevCount) => prevCount + 1);
      setFormData((prevData) => ({
        ...prevData,
        filterDivCount: prevCount + 1,
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
        filterDivCount: prevCount - 1,
        filterDivStates: prevData.filterDivStates.filter((_, i) => i !== index),
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("FORM DATA: ", formData);
  };

  // handle title change
  const handleTitleChange = (index, value) => {
    const updatedStates = [...filterDivStates];
    updatedStates[index].selectedTitle = value;

    // Find the selected condition from the collectionConditionList
    const selectedCondition = collectionConditionList.find(
      (condition) => condition.title === value
    );

    if (selectedCondition) {
      // Filter the condition values based on the selected condition
      const filteredIds = selectedCondition.conditionValues.filter((value) =>
        conditionValueList.some((condition) => condition._id === value)
      );

      // Update the parent ID in the state
      // Set the first value as the default
      updatedStates[index].conditionValue = filteredIds[0] || "";

      // Update the filteredConditionValues state
      setFilteredConditionValues(filteredIds);
    } else {
      // If the selected condition is not found, clear the parent ID and filteredConditionValues state
      updatedStates[index].conditionValue = "";
      setFilteredConditionValues([]);
    }
    setFormData({ ...formData, filterDivStates: updatedStates });
  };

  // handle condition value change
  const handleConditionValueChange = (index, value) => {
    const updatedStates = [...filterDivStates];
    updatedStates[index].conditionValue = value;
    setFormData({ ...formData, filterDivStates: updatedStates });
  };

  const handleInputValueChange = (index, value) => {
    const updatedStates = [...filterDivStates];
    updatedStates[index].inputValue = value;
    setFormData({ ...formData, filterDivStates: updatedStates });
  };

  // Side effects
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
                name="collectionTitle"
                id="collectionTitle"
                value={collectionTitle}
                onChange={handleChange} // Add onChange event handler to update the state
              />
            </div>
          </motion.div>
          {/* publishing */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInFromRightVariant}
            className="col-span-1  bg-base-100 px-4 py-8 rounded-xl shadow-lg"
          >
            <div className="form-control">
              <label htmlFor="publishing-select" className="label">
                <span className="label-text">Publishing</span>
              </label>
              <select
                className="select select-accent"
                id="publishing-select"
                name="publishing" // Add name attribute for the select element
                value={publishing}
                onChange={handleChange} // Add onChange event handler to update the state
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
                value={description} // Add value attribute to control the Quill editor content
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                } // Add onChange event handler to update the state
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
                    onChange={(e) => handleTitleChange(index, e.target.value)}
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
                        (value) => value._id === conditionVal
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
                    value={state.inputValue}
                    className="input input-accent w-full"
                    type="text"
                    placeholder="enter filter parameter"
                  />
                </div>

                {filterDivStates.length !== 1 && (
                  <div>
                    <button
                      onClick={() => handleRemoveFilter(index)}
                      className="bg-rose-500 btn text-white btn-sm"
                    >
                      Remove filter
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div>
              <p className="text-[#A4A4A4] mt-4">
                *This collection will include all products with at least one
                variant that matches Price
              </p>
            </div>
            <div className="mt-4 flex gap-4">
              <button
                id="add-another-collection"
                onClick={handleAddFilter}
                className="bg-themeColor font-thin rounded-[8px] btn text-white"
              >
                Add Another Filter
              </button>

              <button
                onClick={postRawFilterData}
                className="btn btn-accent font-thin text-white"
              >
                Submit Filters
              </button>
            </div>
            <div className="mt-4">
              <ReusableTable data={data} columns={columns} />
            </div>
          </motion.div>
          {/* SEO */}
          <motion.div
            initial="initial"
            animate="animate"
            variant={fadeInFromLeftVariant}
            className="col-span-2 bg-base-100 px-4 py-8 rounded-xl shadow-lg"
          >
            <h1>SEO</h1>
            <hr className="mt-4" />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Meta Title</span>
              </label>
              <input
                placeholder="Meta Title"
                className="input input-accent"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Meta Description</span>
              </label>
              <input
                placeholder="Meta Description"
                className="input input-accent"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Focus Keywords</span>
              </label>
              <input
                placeholder="Focus Keywords"
                className="input input-accent"
                type="text"
                name=""
                id=""
              />
            </div>
            <div className="form-control">
              <label htmlFor="collection-slug" className="label">
                <span className="label-text">Slug</span>
              </label>
              <input
                placeholder="Slug"
                className="input input-accent"
                type="text"
                name="slug"
                id="collection-slug"
              />
            </div>
          </motion.div>
          {/* Image */}
          <motion.div
            initial="initial"
            animate="animate"
            variant={fadeInFromRightVariant}
            className="col-span-1  bg-base-100 px-4 py-8 rounded-xl shadow-lg"
          >
            <h1>Image</h1>
            <div className="border-[1px] border-dashed border-accent  rounded-xl mt-4">
              <Dropzone />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
