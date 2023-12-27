import { useEffect, useRef, useState } from "react";
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
import React from "react";
import { DeleteBtnSvg, EyeBtnSvg } from "../../../icons/tableIcons";

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
  const [variantData, setVariantData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [catDropdown, setCatDropdown] = useState(false);
  const [commission, setcommission] = useState(null);
  const [viewAndeditData, setViewAndEditData] = useState();
  const darkMode = useSelector((x) => x.appConfig.darkMode);
  const [indexs, setIndexs] = useState({
    IndexNum: "",
    dataIndex: "",
  });

  const p = useSelector((state) => state.product);
  const inputRefs = useRef([]);
  const inputRefs1 = useRef([]);
  const inputRefs2 = useRef([]);
  const inputRefs3 = useRef([]);

  const selectedCollection = useSelector(
    (state) => state.appConfig.activeCollection
  );

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
    combination.push(...generateCombinations(attributeValues));
    setCombinations(combination);
  };
  const randomSlug = () => {
    return nanoid(10);
  };

  const handleBlur = () => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 10);
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
    setCombinations([]);
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

  const handleDeleteAttribute = (index) => {
    let cloneAttribute = [...selectedAttributes];
    cloneAttribute.splice(index, 1);
    setSelectedAttributes(cloneAttribute);
  };
  const handleDeleteVariant = (index) => {
    let cloneAttribute = [...variantData];
    // let clonecombination = [...combinations];

    cloneAttribute.splice(index, 1);
    // clonecombination.splice(index, 1);
    setVariantData(cloneAttribute);
    if (cloneAttribute.length == 0) {
      setCombinations([]);
      setVariantData([]);
      setAttributeValues([]);
    }
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

  console.log(
    "================================mmmmmmmmmmmmmMMMMMM===>",
    combinations,
    variantData
  );

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
  const handleDataChange = (index, dataIndex, e, inputName) => {
    const { name, value } = e.target;
    setIndexs((pre) => ({ ...pre, IndexNum: index, dataIndex: dataIndex }));
    setVariantData((prevVariantData) => {
      const updatedVariantData = [...prevVariantData];
      updatedVariantData[index].data[dataIndex][name] = value;
      return updatedVariantData;
    });
    setTimeout(() => {
      if (name == "minQuantity") {
        inputRefs.current[index][dataIndex].focus();
      } else if (name == "maxQuantity") {
        inputRefs1.current[index][dataIndex].focus();
      } else if (name == "currency") {
        inputRefs2.current[index][dataIndex].focus();
      } else if (name == "price") {
        inputRefs3.current[index][dataIndex].focus();
      }
    }, 10);
  };

  useEffect(() => {
    console.log(
      "updatedVariantData[indexs?.index].data[indexs?.dataIndex",
      indexs
    );
    if (
      indexs?.dataIndex >= 0 &&
      indexs?.IndexNum >= 0 &&
      variantData[indexs?.IndexNum]?.data.length > indexs?.dataIndex + 1
    ) {
      setVariantData((prevVariantData) => {
        const updatedVariantData = [...prevVariantData];
        updatedVariantData[indexs?.IndexNum].data[indexs?.dataIndex + 1][
          "minQuantity"
        ] =
          Number(
            updatedVariantData[indexs?.IndexNum].data[indexs?.dataIndex][
              "maxQuantity"
            ]
          ) + 1;
        return updatedVariantData;
      });
    }
  }, [indexs]);

  // console.log(
  //   "updatedVariantData[indexs?.index].data[indexs?.dataIndex",
  //   indexs
  // );

  const handleTableInputChange = (e, index, field) => {
    const value = e.target.value;
    setVariantData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

  console.log(
    "AddProductAttributes.jsx----------------->____",
    variantData,
    selectedAttributes,
    selectedAttributes
  );
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
    collections?.data
  );

  useEffect(() => {
    if (attributeValues.length > 0) {
      generateValueCombinations();
      dispatch(setProduct({ attributes: selectedAttributes }));
      setAttSelected(true);
    }
  }, [attributeValues, selectedAttributes]);

  // COLLECTION LOGIC END

  const createProduct = async () => {
    try {
      const uniqueKey =
        String(Math.floor(Math.random() * 4877578000000) + 1000000988978833) +
        "unique";
      let stockQuantity = 0;
      if (variantData?.length) {
        for (let variant of variantData) {
          const { productQuantity } = variant;
          stockQuantity += Number(productQuantity);
        }
      } else {
        stockQuantity = p.stockQuantity || 0;
      }
      const productFormData = new FormData();
      productFormData.append("name", p.name);
      productFormData.append("status", p.status);
      productFormData.append("stockQuantity", stockQuantity);
      productFormData.append("vendorId", p.vendorId);
      productFormData.append("description", p.desc);
      productFormData.append("tags", p.tags);
      productFormData.append("minquantity", p?.minquantity);
      productFormData.append("img", p.coverImg);
      productFormData.append("sku", p.sku);
      productFormData.append("price", p.price);
      productFormData.append("mrp", p.mrp);
      productFormData.append("uniqueKey", uniqueKey);
      productFormData.append("attributes", JSON.stringify(p.attributes));
      productFormData.append("slug", randomSlug());
      productFormData.append("quantity", quantity);
      productFormData.append("freeShipping", p.freeShipping);
      productFormData.append("readyToShip", p.readyToShip);
      productFormData.append("status", p.status);
      productFormData.append("categoryId", categoryId);
      productFormData.append("customization", JSON.stringify(p.customization));

      const prodResponse = await API_WRAPPER.post(
        "/products/add-product",
        productFormData
      );
      const productId = prodResponse.data.data._id;
      console.log("AddProductAttributes.jsx", productId);
      if (prodResponse.status == 201) {
        // window.product_managements_Media_success.showModal();
        navigate("/admin/product-management");
        toast.success("add product successfully");
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

        let collectionResponse = await pushCollectionProduct({
          activeProducts: productId,
        });
        let count = 0;
        for (let variant of variantData) {
          console.log(variant);
          const { mrp, price, QTY, productQuantity, files, ...variantName } =
            variant;
          const variantFormData = new FormData();
          variantFormData.append("variant", JSON.stringify(variantName));
          variantFormData.append("mrp", mrp);
          variantFormData.append("QTY", QTY);
          variantFormData.append("uniqueKey", `${uniqueKey},${count}`);
          variantFormData.append("price", price);
          variantFormData.append("quantity", productQuantity);
          variantFormData.append("productId", productId);

          if (files) {
            for (let file of files) {
              variantFormData.append("images", file);
            }
          }
          await API_WRAPPER.post("/products/create-variant", variantFormData);
          count++;
        }
      }

      console.log("AddProductAttributes.jsx", productId);
      // navigate("/admin/product-management");
      // navigate(PATHS.adminProductManagement);
    } catch (error) {
      // debouncedShowToast(error.message, "error");
    }
  };

  const pushCollectionProduct = async (data) => {
    try {
      console.log(
        "++++++++++++++++<<<<<<<<<>",
        collections,
        "_---->",
        activeCollection,
        ">>>",
        data
      );
      let collectionResponse;
      let CollectionDatA = collections?.data || [];
      CollectionDatA.map(async (item, index) => {
        const checkdata = checkdataFilter(variantData, item, p);
        console.log(
          "++++++<><><>++++++++++<<<<<<<<<>",
          collections,
          "_---->",
          activeCollection,
          "???",
          checkdata
        );
        if (checkdata) {
          collectionResponse = await API_WRAPPER.put(
            `/collection/update-collection-by-id/:${item._id}`,
            data
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const addRow = (index) => {
  //   setVariantData((prevData) => {
  //     const newData = [...prevData];
  //     newData[index].data.push({ price: "", minQuantity: "", currency: "" });
  //     return newData;
  //   });
  // };

  const addRow = (index) => {
    setVariantData((prevData) => {
      const newData = [...prevData];
      newData[index].data.push({
        price: "",
        minQuantity:
          Number(
            newData[index]?.data[newData[index]?.data.length - 1]?.maxQuantity
          ) + 1,
        maxQuantity: "",
        currency: "",
      });
      return newData;
    });
  };

  const ReduceRow = (index, dataIndex) => {
    setVariantData((prevData) => {
      const newData = [...prevData];
      newData[index].data.splice(dataIndex, 1);
      return newData;
    });
  };

  const handleViewData = (valueData, index) => {
    setViewAndEditData({ ...valueData, index });
    window.selectAttribute_edit_modal.showModal();
  };
  console.log(
    "_________________________________--------MMMMMMM------>",
    viewAndeditData
  );

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

  const handleDeleteVariante = (index) => {
    console.log(index);
    let cloneVariate = [...combinations];
    cloneVariate.splice(index, 1);
    setCombinations(cloneVariate);
  };

  const handleRemoveImage = (fileIndex) => {
    if (!viewAndeditData || !viewAndeditData.files) {
      return;
    }
    let cloneData = { ...viewAndeditData };
    const updatedFiles = [...cloneData.files];
    updatedFiles.splice(fileIndex, 1);
    cloneData.files = updatedFiles;
    // const [variantData, setVariantData] = useState([]);

    setViewAndEditData(cloneData);
  };

  const handleImageSave = () => {
    const { index } = viewAndeditData;
    let VariantClone = [...variantData];
    VariantClone[index] = viewAndeditData;
    setVariantData(VariantClone);
    window.selectAttribute_edit_modal.close();
  };

  if (showData) {
    return (
      <div>
        <Header
          heading={"Data to Publish"}
          subheading="Add attributes, categories and their configuration on this page"
          image={AttributeBannerImage}
        />

        {/* <Select
          className="dropdown-container "
          showSearch
          style={{ width: "30%", padding: "10px", margin: "5px" }}
          placeholder="Select a collection"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={filterOption}
          options={collectionOptions()}
        /> */}
        <div>
          {/* {selectedAttributes.length < 1 ? ( */}
          {/* <div>
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
                  <button className="btn  btn-primary" onClick={createProduct}>
                    Publish
                  </button>
                </div>
              </div>
            </Card>
          </div> */}
          <Card>
            {console.log("ALL PRODUCT DATA: ", p, variantData[0])}
            <div className="p-4">
              <div>
                <h3>Product Name: {p.name}</h3>
                {/* <h3>Vendor ID: {p.vendorId}</h3>
                  <h3>CategoryID: {p.categoryId}</h3> */}
                <h3>
                  Description:{" "}
                  {p.desc.split("<p>").join().split("</p>")[0].substring(1)}
                </h3>
                <h3>tags: {p.tags.join(",")}</h3>
                <h3>status: {p.status}</h3>
              </div>
            </div>

            <label>
              <div>
                <label
                  className="text-2xl"
                  style={{ marginLeft: "15px", marginBottom: "30px" }}
                >
                  variantData:{" "}
                </label>
                <table
                  style={{ marginTop: "20px" }}
                  className="table table-sm "
                >
                  <thead>
                    <tr>
                      {combinations.length > 0
                        ? Object.keys(combinations[0]).map((item, index) => (
                            <th key={index}>{item}</th>
                          ))
                        : null}
                      <th>MRP</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody id="rowChange">
                    {" "}
                    {/* ////////////////////////////////////////////////////////////////     */}
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
                          <tr
                            style={{
                              backgroundColor: "rgb(211, 233, 242)",
                              border: "2px solid rgb(211, 233, 242)",
                            }}
                            key={index}
                          >
                            {/* <td>
                                <pre> */}
                            {Object.keys(variantName).map((key) => (
                              <td key={key}>{variantName[key]}</td>
                            ))}
                            {/* </pre>
                              </td> */}
                            <td>
                              <label>{mrp}</label>
                            </td>
                            <td>
                              <label>{price}</label>
                            </td>
                            <td>
                              <label>{productQuantity}</label>
                            </td>
                            <td></td>
                            {/* <td className="w-72 md:flex gap-2 overflow-auto">
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
                              </td> */}
                            <td>
                              <div onClick={() => handleDeleteVariant(index)}>
                                <DeleteBtnSvg />
                              </div>
                            </td>
                          </tr>
                          {data?.map(
                            (
                              { price, maxQuantity, minQuantity, currency },
                              dataIndex
                            ) => (
                              <tr
                                style={{
                                  backgroundColor: "rgb(211, 233, 242)",
                                  border: "2px solid rgb(211, 233, 242)",
                                  borderBottom:
                                    data?.length - 1 == dataIndex &&
                                    "5px solid white",
                                }}
                                key={nanoid()}
                              >
                                {/* {Object.keys(variantName).map((key) => (
                                  <td key={key}></td>
                                ))} */}
                                <td></td>
                                <td>
                                  <label className="label">
                                    <span className="label-text">
                                      Min Quantity
                                    </span>
                                  </label>
                                  <input
                                    type="number"
                                    ref={(input) => {
                                      if (input) {
                                        inputRefs.current[index] =
                                          inputRefs.current[index] || [];
                                        inputRefs.current[index][dataIndex] =
                                          input;
                                      }
                                    }}
                                    placeholder="minQuantity"
                                    style={{
                                      padding: "5px",
                                      border: "1px solid gray",
                                      borderRadius: "3px",
                                    }}
                                    name="minQuantity"
                                    value={minQuantity}
                                    disabled={dataIndex == 0 ? false : true}
                                    onChange={(e) =>
                                      handleDataChange(
                                        index,
                                        dataIndex,
                                        e,
                                        minQuantity,
                                        "minQuantity"
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <label className="label">
                                    <span className="label-text">
                                      Max Quantity
                                    </span>
                                  </label>
                                  <input
                                    type="number"
                                    ref={(input) => {
                                      if (input) {
                                        inputRefs1.current[index] =
                                          inputRefs1.current[index] || [];
                                        inputRefs1.current[index][dataIndex] =
                                          input;
                                      }
                                    }}
                                    placeholder="maxQuantity"
                                    style={{
                                      padding: "5px",
                                      border: "1px solid gray",
                                      borderRadius: "3px",
                                    }}
                                    name="maxQuantity"
                                    value={maxQuantity}
                                    onChange={(e) => {
                                      handleDataChange(
                                        index,
                                        dataIndex,
                                        e,
                                        maxQuantity,
                                        "maxQuantity"
                                      );
                                    }}
                                  />
                                </td>
                                <td>
                                  <label className="label">
                                    <span className="label-text">Currency</span>
                                  </label>
                                  <select
                                    placeholder="currency"
                                    name="currency"
                                    value={currency}
                                    ref={(input) => {
                                      if (input) {
                                        inputRefs2.current[index] =
                                          inputRefs2.current[index] || [];
                                        inputRefs2.current[index][dataIndex] =
                                          input;
                                      }
                                    }}
                                    style={{
                                      padding: "5px",
                                      border: "1px solid gray",
                                      borderRadius: "3px",
                                    }}
                                    className="h-7 "
                                    onChange={(e) =>
                                      handleDataChange(
                                        index,
                                        dataIndex,
                                        e,
                                        "currency"
                                      )
                                    }
                                  >
                                    <option disabled selected={currency == ""}>
                                      Select Currency
                                    </option>
                                    <option
                                      selected={currency == "ruppee"}
                                      value={"ruppee"}
                                    >
                                      RS
                                    </option>
                                    <option
                                      selected={currency == "USD"}
                                      value={"USD"}
                                    >
                                      USD
                                    </option>
                                  </select>
                                  {/* <input
                                    ref={(input) => {
                                      if (input) {
                                        inputRefs1.current[index] =
                                          inputRefs1.current[index] || [];
                                        inputRefs1.current[index][dataIndex] =
                                          input;
                                      }
                                    }}
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
                                      handleDataChange(
                                        index,
                                        dataIndex,
                                        e,
                                        "currency"
                                      )
                                    }
                                  /> */}
                                </td>

                                <td>
                                  <label className="label">
                                    <span className="label-text">Price</span>
                                  </label>
                                  <input
                                    type="number"
                                    ref={(input) => {
                                      if (input) {
                                        inputRefs3.current[index] =
                                          inputRefs3.current[index] || [];
                                        inputRefs3.current[index][dataIndex] =
                                          input;
                                      }
                                    }}
                                    placeholder="price"
                                    style={{
                                      padding: "5px",
                                      border: "1px solid gray",
                                      borderRadius: "3px",
                                    }}
                                    name="price"
                                    value={price}
                                    onChange={(e) =>
                                      handleDataChange(
                                        index,
                                        dataIndex,
                                        e,
                                        "price"
                                      )
                                    }
                                  />
                                </td>
                                {/* <td>
                                    {console.log(
                                      variantData[index].data[dataIndex]
                                    )}
                                  </td> */}

                                <td></td>
                                <td>
                                  <div
                                    style={{
                                      width: "160px",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {dataIndex == 0 && (
                                      <button
                                        id="addRow"
                                        style={{
                                          padding: "7px",
                                          border: "1px solid gray",
                                          borderRadius: "3px",
                                          margin: "5px",
                                        }}
                                        onClick={() => {
                                          addRow(index);
                                        }}
                                      >
                                        +
                                      </button>
                                    )}
                                    {dataIndex != 0 && (
                                      <button
                                        id="addRow"
                                        style={{
                                          padding: "7px",
                                          border: "1px solid gray",
                                          borderRadius: "3px",
                                          margin: "5px",
                                        }}
                                        onClick={() => {
                                          ReduceRow(index, dataIndex);
                                        }}
                                      >
                                        -
                                      </button>
                                    )}
                                  </div>
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
            <div className="col-span-2 flex justify-end items-center">
              <button
                className="btn  btn-primary"
                onClick={() => setShowData(false)}
              >
                Back
              </button>
              <button
                className="btn btn-accent float-right"
                onClick={createProduct}
              >
                Publish
              </button>
            </div>
          </Card>
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
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="col-span-2 md:col-span-1 p-4 bg-base-100 rounded-xl">
            <SearchableDropdown
              handleSelect={handleSelectedValue}
              items={categories}
              categoryName={categoryName}
              commission={categories?.find((item) => item?._id == categoryId)}
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
              {selectedAttributes?.map((att, index) => (
                <div className="p-1 mx-2" key={att._id}>
                  <div className="flex justify-between w-auto bg-base-200 p-4 items-center rounded-xl my-2 ">
                    <div className="flex justify-around w-96">
                      <span className="font-bold">{att.name}:</span>
                      <input
                        type={att.name == "Quantity" ? "number" : "text"}
                        placeholder="enter attribute values"
                        className="input input-sm input-primary ml-4"
                        name={att._id}
                        onKeyDown={(e) => {
                          handleAtttributeValueSelection(e, att);
                        }}
                      />
                    </div>
                    <div className="flex gap-4">
                      {attributeValues?.map((elem) => {
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
                    <div onClick={() => handleDeleteAttribute(index)}>
                      <DeleteBtnSvg />
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          )}
          {/* <button
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
          </button> */}
        </div>
      </div>
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
                    {combinations.length > 0
                      ? Object.keys(combinations[0]).map((item, index) => (
                          <th key={index}>{item}</th>
                        ))
                      : null}
                    <th>MRP</th>
                    <th>Price</th>
                    <th>Min Quantity</th>
                    <th>Quantity</th>
                    <th>Images</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {combinations.map((x, index) => {
                    const matchingVariantIndex = variantData.findIndex(
                      (variant) => isEqualVariants(variant, x)
                    );
                    console.log(
                      "================================mmmmmmmmmmmmmMMMMMM==>",
                      x
                    );
                    return (
                      <tr key={index}>
                        {/* <td> */}
                        {/* <div className="label"> */}
                        {Object.entries(x).map(([key, value]) => (
                          <td className="text-primary ml-2">{value}</td>
                        ))}
                        {/* </div> */}
                        {/* </td> */}
                        <td className="px-4 py-2">
                          <div className="flex justify-center items-center">
                            <input
                              placeholder="enter mrp"
                              type="number"
                              value={variantData[index]?.mrp}
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
                              value={variantData[index]?.price}
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
                              value={variantData[index]?.productQuantity}
                              placeholder="enter min quantity"
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
                              type="number"
                              name={`QTY-${index}`}
                              placeholder="enter quantity"
                              className="input input-primary input-sm"
                              value={variantData[index]?.QTY}
                              onChange={(e) =>
                                handleTableInputChange(
                                  e,
                                  matchingVariantIndex !== -1
                                    ? matchingVariantIndex
                                    : index,
                                  "QTY"
                                )
                              }
                            />
                          </div>
                        </td>
                        {/* <td className="px-4 py-2">
                          <div className="flex justify-center items-center">
                            <input
                              type="number"
                              name={`Quantity-${index}`}
                              value={variantData[index]?.Quantity}
                              placeholder="enter quantity"
                              className="input input-primary input-sm"
                              onChange={(e) =>
                                handleTableInputChange(
                                  e,
                                  matchingVariantIndex !== -1
                                    ? matchingVariantIndex
                                    : index,
                                  "Quantity"
                                )
                              }
                            />
                          </div>
                        </td> */}
                        <td className="px-4 py-2">
                          <div className="flex justify-center items-center">
                            <input
                              type="file"
                              name={`file-${index}`}
                              accept="image/*"
                              multiple
                              className="file-input file-input-sm"
                              onChange={(e) => {
                                handleTableFileChange(
                                  e,
                                  matchingVariantIndex !== -1
                                    ? matchingVariantIndex
                                    : index
                                );
                              }}
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex justify-center items-center">
                            <div
                              style={{ marginRight: "5px" }}
                              onClick={() =>
                                handleViewData(variantData[index], index)
                              }
                            >
                              <EyeBtnSvg />
                            </div>
                            <div onClick={() => handleDeleteVariante(index)}>
                              <DeleteBtnSvg />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{ margin: "5px" }}
            className="col-span-2 flex justify-end items-center"
          >
            <button
              style={{ margin: "5px" }}
              className="btn  btn-primary"
              onClick={() => navigate(-1)}
            >
              {" "}
              Back
            </button>
            <button
              className="btn btn-accent float-right"
              onClick={() => setShowData(true)}
            >
              {" "}
              Next
            </button>
          </div>
        </Card>
      </div>
      {/* window.commission_delete_modal.showModal(); */}
      {/* ////////////?    */}
      <dialog id="selectAttribute_edit_modal" className="modal">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          {/* <p className="py-4">
            Are you sure you want to delete the selected commission?
          </p> */}
          <div className="grid grid-cols-3 gap-4">
            {viewAndeditData?.files &&
            Object.keys(viewAndeditData.files).length > 0 ? (
              Object.values(viewAndeditData.files).map((file, fileIndex) => {
                return (
                  <div key={fileIndex} className="relative">
                    <img
                      className="w-20 h-20 rounded-md"
                      src={URL.createObjectURL(file)}
                      alt={`Image ${fileIndex}`}
                    />
                    <button
                      className="absolute top-2 right-2 text-red-600"
                      onClick={() => handleRemoveImage(fileIndex)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })
            ) : (
              <h2>No images selected</h2>
            )}
          </div>

          <div className="modal-action">
            <div method="dialog ">
              <button
                onClick={() => handleImageSave()}
                className="btn btn-error mr-4"
              >
                save
              </button>
              <button
                onClick={() => window.selectAttribute_edit_modal.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <ToastContainer />
      <dialog id="product_managements_Media_success" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Changes submitted</h3>
          <p className="py-4">Thanks for submitting your changes.</p>
          <div className="modal-action">
            {/* <button onClick={deleteSelectedRow} className="btn btn-error">
              Delete
            </button> */}
            <button className="btn">Done</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

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
  let responce = false;
  if (Array.isArray(checkPresent)) {
    checkPresent = checkPresent
      .join(",")
      .split(",")
      .map((ite) => JSON.parse(ite));
    checkPresent.map((item) => {
      if (Boolean(item) == Boolean(true)) {
        responce = Boolean(true);
      }
    });
  } else {
    responce = Boolean(checkPresent);
  }
  return Boolean(responce);
};

export default AddProductAttributes;
