import { useEffect, useState } from "react";
import { Card, Header } from "../../../components";
import AttributeBannerImage from "../../../assets/bannerImages/attributesImage.png";
import useCategories from "../../../hooks/useCategories";
import { SearchableDropdown } from "../../../components";
import { ToastContainer, toast } from "react-toastify";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProduct } from "../../../features/appConfig/addProductSlice";
import { nanoid } from "nanoid";
import { PATHS } from "../../../Routes/paths";
import { BsCaretDown } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { Tooltip } from "react-tooltip";
import { AiFillInfoCircle } from "react-icons/ai";

import { Select } from "antd";
import { useQuery } from "react-query";
import { fetchAllCollections } from "../../../api/apiCalls";
const AddProductAttributes = () => {
  let VarientDatasd = JSON.parse(localStorage.getItem("varientData"));
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [attributesList, setAttributesList] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attSelected, setAttSelected] = useState(false);
  const [combinations, setCombinations] = useState([]);
  const [variantData, setVariantData] = useState();
  const [showData, setShowData] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [catDropdown, setCatDropdown] = useState(false);
  const [commission, setcommission] = useState(null);

  const p = useSelector((state) => state.product);
  const selectedCollection = useSelector(
    (state) => state.appConfig.activeCollection
  );

  console.log("ACTIVE COLLECTION: ", selectedCollection);

  const checkProduct = () => {
    variantData;
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(p);

  const categories = useCategories();

  const generateValueCombinations = () => {
    const combination = [];

    function generateCombinations(
      attributes,
      index = 0,
      current = {},
      result = []
    ) {
      if (index === attributes.length) {
        result.push(current);
        return;
      }

      const attribute = attributes[index];
      for (const value of attribute.values) {
        const newCurrent = {
          ...current,
          [attribute.name]: value,
        };
        generateCombinations(attributes, index + 1, newCurrent, result);
      }

      return result;
    }
    console.log("+++>//////////////", attributeValues);
    combination.push(...generateCombinations(attributeValues));
    setCombinations(combination);
  };
  const randomSlug = () => {
    return nanoid(10);
  };

  const handleSelectedValue = (category) => {
    console.log(category);
    setcommission({
      commissionType: category.commissionType,
      commissionTypeValue: category.commissionTypeValue,
    });
    setCategoryId(category?.id);
    setCategoryName(category?.name);
    setSelectedAttributes([]);
    dispatch(setProduct({ categoryId: category?.id }));
  };
  const scrollToSection = () => {
    const targetElement = document.getElementById("selectedattributes");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // You can use 'auto' for instant scrolling
    }
  };
  console.log(commission);

  const convertAttributesList = (arr) => {
    return arr.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
  };
  const attributeSelection = (e) => {
    const selectedAttribute = attributesList.find(
      (att) => att._id === e.target.value
    );

    if (!selectedAttributes.some((att) => att._id === selectedAttribute._id)) {
      setSelectedAttributes((prevSelectedAttributes) => [
        ...prevSelectedAttributes,
        selectedAttribute,
      ]);
      scrollToSection();
    }
  };
  const removeAttributeValue = (attributeId, valueIndex) => {
    setAttributeValues((prevValues) => {
      const updatedAttributeValues = prevValues.map((elem) => {
        if (elem.id === attributeId) {
          const newValues = elem.values.filter(
            (_, index) => index !== valueIndex
          );
          return {
            ...elem,
            values: newValues,
          };
        }
        return elem;
      });
      return updatedAttributeValues;
    });
  };

  const handleAtttributeValueSelection = (e, attribute) => {
    if (e.key === "Enter") {
      const existingIndex = attributeValues.findIndex(
        (item) => item.id === attribute._id
      );

      const newEntry = {
        name: attribute.name,
        id: attribute._id,
        values: [e.target.value],
      };

      if (existingIndex !== -1) {
        const updatedAttributeValues = [...attributeValues];
        updatedAttributeValues[existingIndex].values.push(e.target.value);
        setAttributeValues(updatedAttributeValues);
      } else {
        setAttributeValues((prevValues) => [...prevValues, newEntry]);
      }
      e.target.value = "";
    }
  };

  const fetchAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/attribute/get-all-attributes/${categoryId}`
      );
      setAttributesList(response?.data);
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };
  const handleCatDrop = () => {
    setCatDropdown((a) => !a);
  };

  useEffect(() => {
    fetchAllAttributes();
  }, [categoryId]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your changes may not be saved."; // Custom message
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const handleDataChange = (index, dataIndex, e) => {
    const { name, value } = e.target;
    setVariantData((prevVariantData) => {
      const updatedVariantData = [...prevVariantData];
      updatedVariantData[index].data[dataIndex][name] = value;
      return updatedVariantData;
    });
    // e.target.focus();
  };

  const handleTableInputChange = (e, index, field) => {
    const value = e.target.value;
    setVariantData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

  console.log("AddProductAttributes.jsx", selectedAttributes);
  const handleTableFileChange = (e, index) => {
    const files = e.target.files;

    setVariantData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].files = files;
      return updatedData;
    });
  };
  console.log("AddProductAttributes.jsx", variantData);

  const isEqualVariants = (variant1, variant2) => {
    // Implement your logic to compare two variants here
    // For simplicity, I'm assuming each variant is an object with properties
    return JSON.stringify(variant1) === JSON.stringify(variant2);
  };

  // COLLECTION LOGIC

  const [activeCollection, setActiveCollection] = useState({});
  const { data: collections } = useQuery(
    "get_collections",
    fetchAllCollections
  );
  const collectionOptions = () => {
    return collections?.data?.map((collection) => {
      return { value: collection._id, label: collection?.title };
    });
  };
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    setActiveCollection(
      collections?.data?.filter((collection) => {
        return collection._id === value;
      })[0]
    );
  };

  console.log(
    "????????????????????????--------------->...__mmm....>",
    variantData,
    activeCollection,
    p
  );
  useEffect(() => {
    if (activeCollection?._id) {
      const checkdata = checkdataFilter(variantData, activeCollection, p);
      if (checkdata == "false") {
        toast.warning("Callection not match acording callection condition");
      } else {
        toast.success("Callection match acording callection condition");
      }
    }
  }, [activeCollection]);

  // COLLECTION LOGIC END

  const createProduct = async () => {
    try {
      const productFormData = new FormData();
      productFormData.append("name", p.name);
      productFormData.append("vendorId", p.vendorId);
      productFormData.append("description", p.desc);
      productFormData.append("tags", p.tags);
      productFormData.append("img", p.coverImg);
      productFormData.append("attributes", JSON.stringify(p.attributes));
      productFormData.append("slug", randomSlug());
      productFormData.append("price", price);
      productFormData.append("quantity", quantity);
      productFormData.append("freeShipping", p.freeShipping);
      productFormData.append("readyToShip", p.readyToShip);
      productFormData.append("categoryId", categoryId);
      productFormData.append("customization", JSON.stringify(p.customization));
      /////////////
      const prodResponse = await API_WRAPPER.post(
        "/products/add-product",
        productFormData
      );
      const productId = prodResponse.data.data._id;
      console.log("AddProductAttributes.jsx", productId);
      if (prodResponse.status == 201) {
        navigate("/admin/product-management");
        setActiveCollection((prevState) => [
          {
            ...prevState,
            activeProducts: prevState?.activeProducts.push(productId),
          },
        ]);

        console.log(
          "SELECTED COLLECTION: ",
          activeCollection,
          "ID: ",
          productId
        );
        let collectionResponse;
        if (activeCollection?._id) {
          const checkdata = checkdataFilter(variantData, activeCollection, p);
          console.log("_____________________--------------->", checkdata);
          if (checkdata == "true") {
            collectionResponse = await API_WRAPPER.put(
              `/collection/update-collection-by-id/:${activeCollection._id}`,
              activeCollection
            );
          } else {
            toast.warning("Callection not match acording callection condition");
          }
        }
        console.log("COLLECTION RESPONSE: ", collectionResponse);
        for (let variant of variantData) {
          console.log(variant);
          const { mrp, price, productQuantity, files, ...variantName } =
            variant;
          console.log("AddProductAttributes.jsx", files);
          const variantFormData = new FormData();
          variantFormData.append("variant", JSON.stringify(variantName));
          variantFormData.append("mrp", mrp);
          variantFormData.append("price", price);
          variantFormData.append("quantity", productQuantity);

          variantFormData.append("productId", productId);
          if (files) {
            for (let file of files) {
              variantFormData.append("images", file);
            }
          }
          await API_WRAPPER.post("/products/create-variant", variantFormData);
        }
      }

      console.log("AddProductAttributes.jsx", productId);
      navigate("/admin/product-management");
      // navigate(PATHS.adminProductManagement);
    } catch (error) {
      // debouncedShowToast(error.message, "error");
    }
  };

  const addRow = (index) => {
    setVariantData((prevData) => {
      const newData = [...prevData];
      newData[index].data.push({ price: "", minQuantity: "", currency: "" });
      return newData;
    });
  };
  console.log("AddProductAttributes.jsx", combinations);
  useEffect(() => {
    setVariantData(
      combinations.map((combination) => ({
        ...combination,
        mrp: "",
        productQuantity: "",
        data: [{ price: "", minQuantity: "", currency: "" }],
        files: null,
      }))
    );
  }, [combinations]);
  if (showData) {
    return (
      <div>
        <Header
          heading={"Data to Publish"}
          subheading="Add attributes, categories and their configuration on this page"
          image={AttributeBannerImage}
        />

        <Select
          className="dropdown-container "
          showSearch
          style={{ width: "30%", padding: "10px", margin: "5px" }}
          placeholder="Select a collection"
          optionFilterProp="children"
          onChange={onChange}
          // onSearch={onSearch}
          filterOption={filterOption}
          options={collectionOptions()}
        />
        <div>
          {selectedAttributes.length < 1 ? (
            <div>
              <Card>
                <div className="grid grid-cols-6">
                  <div className="col-span-2">
                    <label className="label">Price</label>
                    <input
                      type="number"
                      onChange={(e) => setPrice(e.target.value)}
                      className="input input-primary"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Quantity</label>
                    <input
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                      className="input input-primary"
                    />
                  </div>
                  <div className="col-span-2 flex justify-end items-center">
                    <button
                      className="btn  btn-primary"
                      onClick={createProduct}
                    >
                      Publish
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <Card>
              {console.log("ALL PRODUCT DATA: ", p, variantData[0])}
              <div className="p-4">
                <div>
                  <h3>Product Name: {p.name}</h3>
                  {/* <h3>Vendor ID: {p.vendorId}</h3>
                  <h3>CategoryID: {p.categoryId}</h3> */}
                  <h3>
                    Description: {p.desc.split("<p>").join().split("</p>")[0]}
                  </h3>
                  <h3>tags: {p.tags.join(",")}</h3>
                  <h3>status: {p.status}</h3>
                </div>
              </div>

              <label>
                <div>
                  variantData:{" "}
                  <table className="table table-sm ">
                    <thead>
                      <tr>
                        <th>Variant</th>
                        <th>MRP</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>images</th>
                      </tr>
                    </thead>
                    <tbody id="rowChange">
                      {variantData.map((variant, index) => {
                        const {
                          price,
                          productQuantity,
                          files,
                          mrp,
                          data,
                          ...variantName
                        } = variant;
                        if (!mrp) {
                          return null;
                        }

                        return (
                          <>
                            <tr key={index}>
                              <td>
                                <pre>
                                  {Object.keys(variantName).map((key) => (
                                    <div key={key}>
                                      {key}: {variantName[key]}
                                    </div>
                                  ))}
                                </pre>
                              </td>
                              <td>
                                <label>{mrp}</label>
                              </td>
                              <td>
                                <label>{price}</label>
                              </td>
                              <td>
                                <label>{productQuantity}</label>
                              </td>
                              <td className="w-72 md:flex gap-2 overflow-auto">
                                {files !== null ? (
                                  Array.from(files).map((file, fileIndex) => {
                                    console.log(
                                      "AddProductAttributes.jsx",
                                      file
                                    );
                                    return (
                                      <img
                                        key={fileIndex}
                                        className="w-20 rounded-md"
                                        src={URL.createObjectURL(file)}
                                      />
                                    );
                                  })
                                ) : (
                                  <h2>No images selected</h2>
                                )}
                              </td>
                            </tr>

                            {data.map(
                              ({ price, minQuantity, currency }, dataIndex) => (
                                <tr key={nanoid()}>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="price"
                                      style={{
                                        padding: "5px",
                                        border: "1px solid gray",
                                        borderRadius: "3px",
                                      }}
                                      name="price"
                                      value={price}
                                      onChange={(e) =>
                                        handleDataChange(index, dataIndex, e)
                                      }
                                    />
                                  </td>
                                  <td>
                                    {console.log(
                                      variantData[index].data[dataIndex]
                                    )}
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="minQuantity"
                                      style={{
                                        padding: "5px",
                                        border: "1px solid gray",
                                        borderRadius: "3px",
                                      }}
                                      name="minQuantity"
                                      value={minQuantity}
                                      onChange={(e) =>
                                        handleDataChange(index, dataIndex, e)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="currency"
                                      name="currency"
                                      style={{
                                        padding: "5px",
                                        border: "1px solid gray",
                                        borderRadius: "3px",
                                      }}
                                      value={currency}
                                      onChange={(e) =>
                                        handleDataChange(index, dataIndex, e)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <button
                                      id="addRow"
                                      style={{
                                        padding: "7px",
                                        border: "1px solid gray",
                                        borderRadius: "3px",
                                      }}
                                      onClick={() => {
                                        addRow(index);
                                      }}
                                    >
                                      +
                                    </button>
                                  </td>
                                </tr>
                              )
                            )}
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </label>
              <button
                className="btn btn-accent float-right"
                onClick={createProduct}
              >
                Publish
              </button>
            </Card>
          )}
        </div>
        <ToastContainer />
      </div>
    );
  }
  return (
    <div>
      <ToastContainer />
      <Header
        heading={
          attSelected ? "Add Product Variants" : "Add Product Attributes"
        }
        subheading="Add attributes, categories and their configuration on this page"
        image={AttributeBannerImage}
      />
      {!attSelected && !showData ? (
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="col-span-2 md:col-span-1 p-4 bg-base-100 rounded-xl">
              <SearchableDropdown
                handleSelect={handleSelectedValue}
                items={categories}
                categoryName={categoryName}
              />
            </div>
            {categoryId && (
              <Card>
                <div className="col-span-2 md:col-span-1 p-4">
                  <div className="flex items-center justify-between">
                    <p className="label font-bold">
                      Select Attributes:(Optional){" "}
                    </p>
                    <div className="flex items-center">
                      <div
                        className="tooltip  tooltip-top text-2xl"
                        data-tip="Attributes are optional fields, Add only if product has variants"
                      >
                        <AiFillInfoCircle />
                      </div>
                      <div className="dropdown dropdown-left">
                        <label tabIndex={0}>
                          <button className="btn btn-circle">
                            <BsCaretDown className="text-2xl text-primary" />
                          </button>
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <select
                              className="block bg-transparent w-full"
                              name=""
                              onChange={(e) => {
                                attributeSelection(e);
                              }}
                              multiple={true}
                            >
                              {convertAttributesList(attributesList).map(
                                (item) => (
                                  <option
                                    className="border-[1px] border-base-200 shadow-lg rounded-lg cursor-pointer my-3 py-2 px-4 bg-base-100"
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </option>
                                )
                              )}
                            </select>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <Tooltip
                  effect="solid"
                  id="my-tooltip"
                  style={{ zIndex: 9999, background: "#4680ff36" }}
                />
              </Card>
            )}
          </div>
          <div id="selectedattributes" className="mx-4">
            {selectedAttributes.length > 0 && (
              <Card id="selectedAtt" className="w-full">
                <div className="flex items-center">
                  <label className="label font-bold p-4">
                    Selecteed Attributes:{" "}
                  </label>
                  <div
                    className="tooltip  tooltip-top text-2xl"
                    data-tip="Enter values for selected attributes,press enter to select"
                  >
                    <AiFillInfoCircle />
                  </div>
                </div>
                {selectedAttributes.map((att) => (
                  <div className="p-1 mx-2" key={att._id}>
                    <div className="flex justify-between w-auto bg-base-200 p-4 items-center rounded-xl my-2 ">
                      <div className="flex justify-around w-96">
                        <span className="font-bold">{att.name}:</span>
                        <input
                          type={att.name == "Quantity" ? "number" : "text"}
                          placeholder="enter attribute values"
                          className="input input-sm input-primary ml-4"
                          name={att._id}
                          onKeyDown={(e) =>
                            handleAtttributeValueSelection(e, att)
                          }
                        />
                      </div>
                      <div className="flex gap-4">
                        {attributeValues.map((elem) => {
                          if (elem.id === att._id) {
                            return elem?.values?.map((a, index) => (
                              <div
                                className="flex gap-4 items-center bg-base-100 p-2 rounded-full"
                                onClick={(e) =>
                                  removeAttributeValue(att._id, index)
                                }
                                key={index}
                              >
                                {a}
                                <button className="btn btn-xs btn-circle btn-error">
                                  <GrFormClose className="text-xl text-base-100" />
                                </button>
                              </div>
                            ));
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            )}
            <button
              className="btn btn-accent float-right right-10 bottom-5"
              onClick={() => {
                if (!categoryId) {
                  debouncedShowToast("select Category First");
                  return;
                }
                if (selectedAttributes.length < 1) {
                  setShowData(true);
                  return;
                } else {
                  generateValueCombinations();
                  dispatch(setProduct({ attributes: selectedAttributes }));

                  setAttSelected(true);
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div>
          <Card className="relative">
            <div className="flex flex-col mt-4">
              <div className="overflow-x-auto">
                <div className="text-center flex justify-center items-center flex">
                  <label htmlFor="" className="text-2xl ">
                    Variant Data
                  </label>
                  <div
                    className="tooltip  tooltip-bottom "
                    data-tip="Enter price quantity and images only for variants you want to create."
                  >
                    <AiFillInfoCircle />
                  </div>
                </div>
                <table className="table  table-sm min-w-full">
                  <thead>
                    <tr>
                      <th>Variant Name</th>
                      <th>MRP</th>
                      <th>Price</th>
                      <th>Total Quantity</th>
                      <th>Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinations.map((x, index) => {
                      const matchingVariantIndex = variantData.findIndex(
                        (variant) => isEqualVariants(variant, x)
                      );
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              <div className="label">
                                {Object.entries(x).map(([key, value]) => (
                                  <div key={key}>
                                    <span className="font-semibold ">
                                      {key}:
                                    </span>{" "}
                                    <span className="text-primary ml-2">
                                      {value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex justify-center items-center">
                                <input
                                  placeholder="enter mrp"
                                  type="number"
                                  name={`mrp-${index}`}
                                  className="input input-primary input-sm"
                                  onChange={(e) =>
                                    handleTableInputChange(
                                      e,
                                      matchingVariantIndex !== -1
                                        ? matchingVariantIndex
                                        : index,
                                      "mrp"
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex justify-center items-center">
                                <input
                                  placeholder="enter price"
                                  type="number"
                                  name={`price-${index}`}
                                  className="input input-primary input-sm"
                                  onChange={(e) =>
                                    handleTableInputChange(
                                      e,
                                      matchingVariantIndex !== -1
                                        ? matchingVariantIndex
                                        : index,
                                      "price"
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex justify-center items-center">
                                <input
                                  type="number"
                                  name={`productQuantity-${index}`}
                                  placeholder="enter quantity"
                                  className="input input-primary input-sm"
                                  onChange={(e) =>
                                    handleTableInputChange(
                                      e,
                                      matchingVariantIndex !== -1
                                        ? matchingVariantIndex
                                        : index,
                                      "productQuantity"
                                    )
                                  }
                                />
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex justify-center items-center">
                                <input
                                  type="file"
                                  name={`file-${index}`}
                                  accept="image/*"
                                  multiple
                                  className="file-input file-input-sm"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      if (!file.type.startsWith("image/png")) {
                                        toast.warning(
                                          "Only PNG files are allowed."
                                        );
                                        e.target.value = ""; // Clear the input field
                                      } else {
                                        // Handle the selected file(s) as needed.
                                        handleTableFileChange(
                                          e,
                                          matchingVariantIndex !== -1
                                            ? matchingVariantIndex
                                            : index
                                        );
                                      }
                                    }
                                    // handleTableFileChange(
                                    //   e,
                                    //   matchingVariantIndex !== -1
                                    //     ? matchingVariantIndex
                                    //     : index
                                    // );
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <button
              className="btn btn-accent float-right mt-4 w-full"
              onClick={() => setShowData(true)}
            >
              {" "}
              Next
            </button>
          </Card>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

import React from "react";

export const checkdataFilter = (variateData, category, p) => {
  let categoryKeys = category?.collectionConditionId || [];
  categoryKeys = categoryKeys
    .map((value) => value.trim())
    .filter((value, index, self) => self.indexOf(value) === index);
  let methods = category?.conditionValue || []; // Use empty array as default value if category?.conditionValue is undefined
  let matchvalue = category?.inputValue || []; // Use empty array as default value if category?.inputValue is undefined
  let checkPresent = categoryKeys.map((item, index) => {
    if (item == "Price") {
      return variateData.map((variant, ind) => {
        let mainPrice = Number(variant?.price);
        if (matchvalue.length === 2) {
          // Check if matchvalue has two values
          let minValue = Number(matchvalue[0]);
          let maxValue = Number(matchvalue[1]);
          return mainPrice >= minValue && mainPrice <= maxValue;
        } else if (matchvalue.length === 1) {
          let minValue = Number(matchvalue[0]);
          return mainPrice >= minValue;
        } else {
          return false; // Return false for invalid matchvalue
        }
      });
    } else {
      return methods.map((method, inx) => {
        let isMatch = false;
        let isContainsData = p[item] || ""; // Use an empty string as default value if p[item] is undefined
        matchvalue.forEach((str) => {
          if (method?.conditionValue == "contains") {
            isMatch = isMatch || isContainsData.includes(str);
          } else if (method?.conditionValue == "end with") {
            isMatch = isMatch || isContainsData.endsWith(str);
          } else if (method?.conditionValue == "start with") {
            isMatch = isMatch || isContainsData.startsWith(str);
          }
        });
        return isMatch;
      });
    }
  });
  return checkPresent.join();
};

export default AddProductAttributes;
