import { useEffect, useState } from "react";
import { Card, Header } from "../../../components";
import AttributeBannerImage from "../../../assets/bannerImages/attributesImage.png";
import useCategories from "../../../hooks/useCategories";
import { SearchableDropdown } from "../../../components";
import { ToastContainer } from "react-toastify";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setProduct } from "../../../features/appConfig/addProductSlice";
import { nanoid } from "nanoid";
import { PATHS } from "../../../Routes/paths";
import { BsCaretDown } from "react-icons/bs";
import { GrFormClose } from "react-icons/gr";
import { Tooltip } from "react-tooltip";
import { AiFillInfoCircle } from "react-icons/ai";
const EditProductAttributes = () => {
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
  const [product, setProduct] = useState();

  const p = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("AddProductAttributes.jsx", p);
  const params = useParams();
  console.log("EditProductAttributes.jsx", params);
  const { id } = params;

  const categories = useCategories();
  console.log("EditProductAttributes.jsx", variantData);

  const finAttributeName = (id) => {
    const attribute = attributesList.find((attr) => attr._id === id);
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
  const getProductVariants = async () => {
    const response = await API_WRAPPER.get(`/product/variants/${id}`);
    console.log(response.data);
    setProduct(response.data);
    setCategoryId(response.data.categoryId);
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
      console.log("AddProductAttributes.jsx", productId);

      for (let variant of variantData) {
        const { price, productQuantity, files, ...variantName } = variant;
        console.log("AddProductAttributes.jsx", files);
        const variantFormData = new FormData();
        variantFormData.append("variant", JSON.stringify(variantName));
        variantFormData.append("price", price);
        variantFormData.append("quantity", productQuantity);
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
      }
      navigate(PATHS.adminProductManagement);
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const handleSelectedValue = (category) => {
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
      console.log("EditProductAttributes.jsx", attributeValues);
      const existingIndex = attributeValues.findIndex(
        (item) => item.id === attribute
      );
      console.log("EditProductAttributes.jsx", attribute);

      const newEntry = {
        name: attribute.name,
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
  useEffect(() => {
    const updatedVariantData = combinations.map((combination) => {
      const matchingVariant = product.result.find((variant) =>
        isEqualVariants(variant.variant, combination)
      );

      return {
        ...combination,
        price: matchingVariant ? matchingVariant.price : "",
        productQuantity: matchingVariant ? matchingVariant.quantity : "",
        files: matchingVariant ? matchingVariant.images : null,
      };
    });

    setVariantData(updatedVariantData);
  }, [combinations, product?.result]);

  console.log("EditProductAttributes.jsx", attributeValues);
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
                  <h3>Product Name: {product?.name}</h3>
                  {/* <h3>Vendor ID: {p.vendorId}</h3>
                  <h3>CategoryID: {p.categoryId}</h3> */}
                  <h3>Description: {product?.description}</h3>
                  <h3>tags: {product.tags.join(",")}</h3>
                  <h3>status: {product.status}</h3>
                </div>
              </div>

              <label>
                <div>
                  variantData:{" "}
                  <table className="table table-sm ">
                    <thead>
                      <tr>
                        <th>Variant</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>images</th>
                      </tr>
                    </thead>
                    <tbody>
                      {variantData.map((a, index) => {
                        const {
                          price,
                          productQuantity,
                          files,
                          ...variantName
                        } = a;
                        if (!price) {
                          return null;
                        }
                        return (
                          <tr key={index}>
                            <td>
                              <pre>{JSON.stringify(variantName)}</pre>
                            </td>
                            <td>
                              <label>{price}</label>
                            </td>
                            <td>
                              <label> {productQuantity}</label>
                            </td>
                            <td className="w-72 md:flex gap-2 overflow-auto">
                              {files &&
                                Array.from(files)?.map((file, index) => {
                                  console.log("AddProductAttributes.jsx", file);

                                  // Check if the file is a URL (string) or a File object
                                  const isURL = typeof file === "string";

                                  return (
                                    <div
                                      key={index}
                                      className="flex items-center space-x-2"
                                    >
                                      {isURL ? (
                                        <img
                                          className="w-20 rounded-md"
                                          src={file}
                                          alt={`Image ${index}`}
                                        />
                                      ) : (
                                        <img
                                          className="w-20 rounded-md"
                                          src={URL.createObjectURL(file)}
                                          alt={`Image ${index}`}
                                        />
                                      )}
                                    </div>
                                  );
                                })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </label>
              <button
                className="btn btn-accent float-right"
                onClick={editVariants}
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
          attSelected ? "Edit  Product Variants" : "Edit Product Attributes"
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
                  (att) =>
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
                                handleAtttributeValueSelection(e, att)
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
                        </div>
                      </div>
                    )
                )}
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
                  // dispatch(setProduct({ attributes: selectedAttributes }));

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
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinations.map((x, index) => {
                      const matchingVariantIndex = variantData.findIndex(
                        (variant) => isEqualVariants(variant, x)
                      );

                      const matchedProductVariant = product.result.find(
                        (variant) => isEqualVariants(variant.variant, x)
                      );
                      return (
                        <tr key={index}>
                          <td>
                            <div className="label">
                              {Object.entries(x).map(([key, value]) => (
                                <div key={key}>
                                  <span className="font-semibold ">{key}:</span>{" "}
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
                                type="file"
                                name={`file-${index}`}
                                accept="image/*"
                                multiple
                                className="file-input file-input-sm"
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
                        </tr>
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

export default EditProductAttributes;
