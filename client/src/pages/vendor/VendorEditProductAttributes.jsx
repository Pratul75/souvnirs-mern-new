import { useEffect, useRef, useState } from "react";
import { Card, Header } from "../../components";
import AttributeBannerImage from "../../assets/bannerImages/attributesImage.png";
import useCategories from "../../hooks/useCategories";
import { SearchableDropdown } from "../../components";
import { ToastContainer } from "react-toastify";
import API_WRAPPER, { baseUrl } from "../../api";
import { debouncedShowToast } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { PATHS } from "../../Routes/paths";
import { BsCaretDown } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { Tooltip } from "react-tooltip";
import { AiFillInfoCircle } from "react-icons/ai";
import { DeleteBtnSvg, EyeBtnSvg } from "../../icons/tableIcons";

const VendorEditProductAttributes = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [attributesList, setAttributesList] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attSelected, setAttSelected] = useState(false);
  const [combinations, setCombinations] = useState([{}]);
  const [variantData, setVariantData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [catDropdown, setCatDropdown] = useState(false);
  const [product, setProduct] = useState();
  const [viewAndeditData, setViewAndEditData] = useState();
  const [uniqueKey, setUniqueKey] = useState("");
  const [loading, setLoading] = useState(false);
  const darkMode = useSelector((x) => x.appConfig.darkMode);
  const [indexs, setIndexs] = useState({
    IndexNum: "",
    dataIndex: "",
  });

  const inputRefs = useRef([]);
  const inputRefs1 = useRef([]);
  const inputRefs2 = useRef([]);
  const inputRefs3 = useRef([]);

  const p = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("AddProductAttributes.jsx", p);
  const params = useParams();
  console.log("EditProductAttributes.jsx", params);
  const { id } = params;

  const categories = useCategories();
  console.log("EditProductAttributes.jsx---->", variantData);

  const finAttributeName = (id) => {
    const attribute = attributesList.find((attr) => attr._id === id);
    console.log("------->>>>>>>++>", attribute);
    return attribute ? attribute.name : null;
  };
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

  console.log("++++>????", attributeValues, selectedAttributes);

  const handleDeleteAttribute = (index) => {
    let cloneAttribute = [...selectedAttributes];
    cloneAttribute.splice(index, 1);
    setSelectedAttributes(cloneAttribute);
  };

  const getProductVariants = async () => {
    const response = await API_WRAPPER.get(`/product/variants/${id}`);
    setUniqueKey(response?.data?.uniqueKey);
    setProduct(response.data);
    setCategoryId(response?.data?.categoryId);
    console.log("response.data.attributes=>", response.data);
    setSelectedAttributes(response.data.attributes);
    fetchAllAttributes();

    const uniqueAttributes = {};

    // Loop through the variants' result array and extract attributes
    response?.data.result.forEach((variant) => {
      const attributes = variant.variant;

      // Loop through the attributes of each variant
      for (const attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
          const attributeValue = attributes[attribute];

          // Check if the attribute exists in the uniqueAttributes object
          if (!uniqueAttributes[attribute]) {
            uniqueAttributes[attribute] = [attributeValue];
          } else if (!uniqueAttributes[attribute].includes(attributeValue)) {
            uniqueAttributes[attribute].push(attributeValue);
          }
        }
      }
    });

    console.log("EditProductAttributes.jsx", attributesList);

    if (response.data.attributes.length > 0) {
      const combinedAttributes = response.data.attributes.map((attributeId) => {
        console.log("EditProductAttributes.jsx", attributeId);
        const attributeInfo = attributesList.find(
          (attr) => attr._id === attributeId
        );
        if (!attributeInfo) {
          console.log(
            `Attribute with ID ${attributeId} not found in attributesList.`
          );
          return null;
        }

        const attributeName = attributeInfo.name;
        const attributeValues = attributeName
          ? uniqueAttributes[attributeName] || []
          : [];

        return {
          id: attributeId,
          name: attributeName,
          values: attributeValues,
        };
      });

      console.log("EditProductAttributes.jsx", combinedAttributes);
      setAttributeValues(combinedAttributes);
    }
  };

  const editVariants = async () => {
    try {
      const productId = product._id;
      setLoading(true);
      console.log("AddProductAttributes.jsx", productId);
      const uniqueNumber =
        String(Math.floor(Math.random() * 4877578000000) + 100000) + "unique";
      let count = 0;
      for (let variant of variantData) {
        const { mrp, price, productQuantity, QTY, files, ...variantName } =
          variant;
        console.log("AddProductAttributes.jsx", files);
        const variantFormData = new FormData();
        variantFormData.append("variant", JSON.stringify(variantName)); // uniqueKey
        variantFormData.append("mrp", mrp);
        variantFormData.append(
          "uniqueKey",
          `${uniqueKey ? uniqueKey : uniqueNumber},${count}`
        );
        variantFormData.append("price", price);
        variantFormData.append("quantity", productQuantity);
        variantFormData.append("QTY", QTY);
        variantFormData.append("productId", productId);
        if (files) {
          for (let file of files) {
            variantFormData.append("images", file);
          }
        }
        await API_WRAPPER.post(
          `/product/variant/${productId}`,
          variantFormData
        );
        count++;
      }
      navigate(PATHS.vendorProductManagement);
      // window.product_managements_Product_success.showModal();
      setLoading(false);
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const handleSelectedValue = (category) => {
    setCategoryId(category?.id);
    setCategoryName(category?.name);
    // setSelectedAttributes([...selectedAttributes, category?.id]);
    // debugger;
    // dispatch(setProduct({ categoryId: category?.id }));
  };
  console.log("__________________>", attributesList, selectedAttributes);
  const scrollToSection = () => {
    const targetElement = document.getElementById("selectedattributes");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // You can use 'auto' for instant scrolling
    }
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

  const convertAttributesList = (arr) => {
    console.log("____-----<><><", arr);
    const filteredData = arr.filter(
      (item) => ![...selectedAttributes].includes(item._id)
    );
    return filteredData.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
  };
  const attributeSelection = (e) => {
    const selectedAttribute = attributesList.find(
      (att) => att._id === e.target.value
    );
    console.log("__________________>:", selectedAttributes, e?.target?.value);

    const uniqueArray = Array.from(new Set([...selectedAttributes]));
    setSelectedAttributes([...uniqueArray, e?.target?.value]);
    // if (!selectedAttributes.some((att) => att._id === selectedAttribute._id)) {
    //   setSelectedAttributes((prevSelectedAttributes) => [
    //     ...prevSelectedAttributes,
    //     selectedAttribute?.id,
    //   ]);
    scrollToSection();
    // }
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

  useEffect(() => {
    if (attributeValues[0] != null) {
      console.log("+++++++++++>", attributeValues[0], combinations);
      generateValueCombinations();
      setAttSelected(true);
    }
  }, [attributeValues, selectedAttributes]);

  const handleAtttributeValueSelection = (e, attribute, name) => {
    if (e.key === "Enter") {
      console.log("EditProductAttributes.jsxLLLL--->", attributeValues);
      const existingIndex = attributeValues.findIndex(
        (item) => item.id === attribute
      );
      console.log("EditProductAttributes.jsx==>", {
        selectedAttributes,
        attribute,
      });

      const newEntry = {
        name: attribute.name ? attribute.name : name,
        id: attribute,
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

  console.log(variantData);

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
    fetchAllAttributes().then(() => {
      getProductVariants();
    });
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

  const handleTableInputChange = (e, index, field) => {
    const value = e.target.value;

    setVariantData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

  console.log("AddProductAttributes.jsx", selectedAttributes);

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
    // inputRefs.current[index][dataIndex][inputName].current.focus();
  };

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
  // useEffect(() => {
  //   getProductVariants();
  //   // prefillAttributeValues();
  // }, []);

  const handleViewData = (valueData, index) => {
    setViewAndEditData({ ...valueData, index });
    window.selectAttribute_edit_modal.showModal();
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

  const addRow = (index) => {
    setVariantData((prevData) => {
      const newData = [...prevData];
      newData[index].data.push({
        price: "",
        minQuantity:
          newData[index]?.data[newData[index]?.data.length - 1]?.maxQuantity,
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

  const handleDeleteVariante = (index) => {
    console.log(index);
    let cloneVariate = [...combinations];
    cloneVariate.splice(index, 1);
    setCombinations(cloneVariate);
  };

  const handleImageSave = () => {
    const { index } = viewAndeditData;
    let VariantClone = [...variantData];
    VariantClone[index] = viewAndeditData;
    setVariantData(VariantClone);
    window.selectAttribute_edit_modal.close();
  };

  const handleNaviagte = () => {
    navigate(PATHS.vendorProductManagement);
  };

  useEffect(() => {
    const updatedVariantData = combinations.map((combination, index) => {
      const matchingVariant =
        product && product.result.length > 0
          ? product.result.find((variant) =>
              isEqualVariants(variant.variant, combination)
            )
          : [
              {
                mrp: 0,
                price: 0,
                quantity: 0,
                images: [],
              },
            ].find((variant) => isEqualVariants(variant.variant, combination));

      console.log("matchingVariant===>", matchingVariant);

      return {
        ...combination,
        price: matchingVariant ? matchingVariant.price : "",
        mrp: matchingVariant ? matchingVariant.mrp : "",
        productQuantity: matchingVariant ? matchingVariant.quantity : "",
        files: matchingVariant ? matchingVariant.images : null,
        data: product?.result[index]?.dynamic_price || [
          {
            price: "0",
            minQuantity: "0",
            currency: "rs",
          },
        ],
      };
    });

    setVariantData(updatedVariantData);
  }, [combinations, product?.result]);

  if (showData) {
    return (
      <div>
        <Header
          heading={"Data to Publish"}
          subheading="Add attributes, categories and their configuration on this page"
          image={AttributeBannerImage}
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
                    <button className="btn  btn-primary" onClick={editVariants}>
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
                  <h3>Product Name: {product?.name}</h3>
                  {/* <h3>Vendor ID: {p.vendorId}</h3>
                  <h3>CategoryID: {p.categoryId}</h3> */}
                  <DiscriptionData data={product?.description} />
                  <h3>tags: {product.tags.join(",")}</h3>
                  <h3>status: {product.status}</h3>
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
                  <table className="table table-sm ">
                    <thead>
                      <tr>
                        {combinations.length > 0
                          ? Object.keys(combinations[0]).map((item, index) => (
                              <th key={index}>{item}</th>
                            ))
                          : null}
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variantData.map((a, index) => {
                        const {
                          price,
                          productQuantity,
                          files,
                          data,
                          ...variantName
                        } = a;
                        if (!price) {
                          return null;
                        }
                        return (
                          <>
                            <tr key={index}>
                              {Object.keys(variantName).map((key) => (
                                <td key={key}>{variantName[key]}</td>
                              ))}
                              <td>
                                <label>{price}</label>
                              </td>
                              <td>
                                <label> {productQuantity}</label>
                              </td>
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
                                        if (
                                          data.length > 1 &&
                                          data.length > dataIndex + 1
                                        ) {
                                          handleDataChange(
                                            index,
                                            dataIndex + 1,
                                            {
                                              target: {
                                                name: "minQuantity",
                                                value: Number(maxQuantity) + 1,
                                              },
                                            },
                                            Number(maxQuantity) + 1,
                                            "minQuantity"
                                          );
                                        }
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <label className="label">
                                      <span className="label-text">
                                        Currency
                                      </span>
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
                                      <option
                                        disabled
                                        selected={currency == ""}
                                      >
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
              <button
                className="btn  btn-primary"
                onClick={() => setShowData(false)}
              >
                Back
              </button>
              <button
                className="btn btn-accent float-right"
                onClick={editVariants}
              >
                {loading ? "Loading..." : "Publish"}
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
          attSelected ? "Edit  Product Variants" : "Edit Product Attributes"
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
              categoryName={
                categoryName
                  ? categoryName
                  : categories.find((item) => item?._id == categoryId)?.name
              }
              categoryId={categoryId}
              commission={
                categoryName
                  ? categories?.find((item) => item?.name == categoryName)
                  : categories?.find((item) => item?._id == categoryId)
              }
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
        <div id="selectedattributtytes" className="mx-4">
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
              {selectedAttributes?.map(
                (att, ind) =>
                  att && (
                    <div className="p-1 mx-2" key={att}>
                      <div className="flex justify-between w-auto bg-base-200 p-4 items-center rounded-xl my-2 ">
                        <div className="flex justify-around w-96">
                          <span className="font-bold">
                            {finAttributeName(att)}:
                          </span>
                          <input
                            placeholder="enter attribute values"
                            className="input input-sm input-primary ml-4"
                            name={att}
                            onKeyDown={(e) =>
                              handleAtttributeValueSelection(
                                e,
                                att,
                                finAttributeName(att)
                              )
                            }
                          />
                        </div>
                        <div className="flex gap-4">
                          {attributeValues &&
                            attributeValues?.map((elem) => {
                              if (elem?.id === att) {
                                return elem?.values?.map((a, index) => (
                                  <div
                                    className="flex gap-4 items-center bg-base-100 p-2 rounded-full"
                                    onClick={(e) =>
                                      removeAttributeValue(att, index)
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
                        <div onClick={() => handleDeleteAttribute(ind)}>
                          <DeleteBtnSvg />
                        </div>
                      </div>
                    </div>
                  )
              )}
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
                // dispatch(setProduct({ attributes: selectedAttributes }));

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

                    const matchedProductVariant = product?.result?.find(
                      (variant) => isEqualVariants(variant.variant, x)
                    );
                    console.log(
                      "+++++???????????????>>>>>>>>>>>>>",
                      matchedProductVariant
                    );
                    return (
                      <tr key={index}>
                        {Object.entries(x).map(([key, value]) => (
                          <td className="text-primary ml-2">{value}</td>
                        ))}
                        <td className="px-4 py-2">
                          <div className="flex justify-center items-center">
                            <input
                              placeholder="enter price"
                              type="number"
                              name={`mrp-${index}`}
                              className="input input-primary input-sm"
                              defaultValue={
                                matchedProductVariant
                                  ? matchedProductVariant.mrp
                                  : ""
                              }
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
                              defaultValue={
                                matchedProductVariant
                                  ? matchedProductVariant.price
                                  : ""
                              }
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
                              defaultValue={
                                matchedProductVariant
                                  ? matchedProductVariant.quantity
                                  : ""
                              }
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
                              defaultValue={
                                matchedProductVariant
                                  ? matchedProductVariant.QTY
                                  : ""
                              }
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
                        <td className="px-4 py-2">
                          <div className="flex justify-center items-center">
                            <input
                              type="file"
                              name={`file-${index}`}
                              accept="image/*"
                              multiple
                              className="file-input file-input-sm"
                              defaultValue={() =>
                                matchedProductVariant
                                  ? matchedProductVariant((e, inde) => {
                                      e = `${baseUrl}/${e}`;
                                    })
                                  : ""
                              }
                              onChange={(e) =>
                                handleTableFileChange(
                                  e,
                                  matchingVariantIndex !== -1
                                    ? matchingVariantIndex
                                    : index
                                )
                              }
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
      <dialog id="selectAttribute_edit_modal" className="modal">
        <div className="modal-box">
          {/* <h3 className="font-bold text-lg">Hello!</h3> */}
          {/* <p className="py-4">
            Are you sure you want to delete the selected commission?
          </p> */}
          <div className="grid grid-cols-3 gap-4">
            {viewAndeditData?.files ? (
              Object.keys(viewAndeditData?.files).length > 0 ? (
                Object.values(viewAndeditData.files).map((file, fileIndex) => {
                  console.log("++", typeof file);
                  return (
                    <div key={fileIndex} className="relative">
                      <img
                        className="w-20 h-20 rounded-md"
                        // src={URL.createObjectURL(file)}
                        src={
                          typeof file == "string"
                            ? `${baseUrl}/${file}`
                            : URL.createObjectURL(file)
                        }
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
              )
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
      <dialog id="product_managements_Product_success" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Changes submitted</h3>
          <p className="py-4">
            Thanks for submitting your changes. if approved, changes will be
            reflected within 24 hours.
          </p>
          <div className="modal-action">
            {/* <button onClick={deleteSelectedRow} className="btn btn-error">
              Delete
            </button> */}
            <button onClick={handleNaviagte} className="btn">
              Done
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

const DiscriptionData = ({ data }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default VendorEditProductAttributes;
