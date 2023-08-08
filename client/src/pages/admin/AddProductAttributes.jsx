import React, { useEffect, useState } from "react";
import { Card, Header } from "../../components";
import AttributeBannerImage from "../../assets/bannerImages/attributesImage.png";
import useCategories from "../../hooks/useCategories";
import SearchableDropdown from "../../components/SearchableDropdown";
import { ToastContainer } from "react-toastify";
import API_WRAPPER from "../../api";
import { debouncedShowToast } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setProduct } from "../../features/appConfig/addProductSlice";
import { nanoid } from "nanoid";

const AddProductAttributes = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [attributesList, setAttributesList] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attSelected, setAttSelected] = useState(false);
  const [combinations, setCombinations] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const p = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("AddProductAttributes.jsx", p);

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

  const createProduct = async () => {
    console.log("AddProductAttributes.jsx", p);
    const productFormData = new FormData();
    productFormData.append("name", p.name);
    productFormData.append("vendorId", p.vendorId);
    productFormData.append("description", p.desc);
    productFormData.append("tags", p.tags);
    productFormData.append("img", p.coverImg[0]);
    productFormData.append("attributes", JSON.stringify(p.attributes));
    productFormData.append("slug", randomSlug());

    const prodResponse = await API_WRAPPER.post(
      "/products/add-product",
      productFormData
    );
    const productId = prodResponse.data.data._id;
    console.log("AddProductAttributes.jsx", productId);
    if (prodResponse.status == 201) {
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
        const prodResponse = await API_WRAPPER.post(
          "/products/create-variant",
          variantFormData
        );
      }
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

  useEffect(() => {
    fetchAllAttributes();
  }, [categoryId]);

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
  useEffect(() => {
    setVariantData(
      combinations.map((combination) => ({
        ...combination,
        price: "",
        productQuantity: "",
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
        <div>
          {selectedAttributes.length < 1 ? (
            <div>
              <Card>
                <label className="label">Price</label>
                <input />
                <label className="label">Quantity</label>
                <input />
              </Card>
            </div>
          ) : (
            <Card>
              <label>Name:{p.name}</label>
              <label>description:{p.desc}</label>

              <button
                className="btn btn-accent float-right"
                onClick={createProduct}
              >
                Publish
              </button>
            </Card>
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
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
            <Card>
              <div className="col-span-2 md:col-span-1 p-4">
                <SearchableDropdown
                  handleSelect={handleSelectedValue}
                  items={categories}
                />
                <p>Selected Category: {categoryName}</p>
              </div>
            </Card>
            <Card>
              <label className="label font-bold">
                Select Attributes:(Optional){" "}
              </label>
              <div className="col-span-2 md:col-span-1 p-4">
                <select
                  name=""
                  onChange={(e) => {
                    attributeSelection(e);
                  }}
                  multiple={true}
                >
                  {convertAttributesList(attributesList).map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </Card>
          </div>
          <div id="selectedattributes" className="grid  relative">
            <Card id="selectedAtt" className="relative w-full">
              <label className="label font-bold">Select ed Attributes: </label>
              {selectedAttributes.length > 0 &&
                selectedAttributes.map((att) => (
                  <div
                    className="h-16 flex mx-10 gap-8 items-center font-semibold"
                    key={att._id}
                  >
                    <span>{att.name}</span>
                    <input
                      className="input h-8 input-accent"
                      name={att._id}
                      onKeyDown={(e) => handleAtttributeValueSelection(e, att)}
                    />
                    {attributeValues.map((elem) => {
                      if (elem.id === att._id) {
                        return elem?.values?.map((a, index) => (
                          <div
                            className="flex gap-1 items-center bg-slate-400 p-2 rounded-3xl"
                            onClick={(e) =>
                              removeAttributeValue(att._id, index)
                            }
                            key={index}
                          >
                            {a}
                            <span className="bg-red-600 rounded-full w-5 h-5 flex justify-center items-center">
                              x
                            </span>
                          </div>
                        ));
                      }
                      return null;
                    })}
                  </div>
                ))}
              <button
                className="btn btn-accent float-right right-10 bottom-5"
                onClick={() => {
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
            </Card>
          </div>
        </div>
      ) : (
        <div>
          <Card className="relative">
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Variant Name</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Quantity</th>
                      <th className="px-4 py-2">Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {combinations.map((x, index) => {
                      const matchingVariantIndex = variantData.findIndex(
                        (variant) => isEqualVariants(variant, x)
                      );

                      return (
                        <tr key={index}>
                          <td className="px-4 py-2">
                            <div className="label">
                              {Object.entries(x).map(([key, value]) => (
                                <div key={key} className="mb-2">
                                  <span className="font-semibold">{key}:</span>{" "}
                                  {value}
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex justify-center items-center">
                              <input
                                type="number"
                                name={`price-${index}`}
                                // value={
                                //   matchingVariantIndex !== -1
                                //     ? variantData[matchingVariantIndex].price
                                //     : ""
                                // }
                                className="input input-accent h-8"
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
                                // value={
                                //   matchingVariantIndex !== -1
                                //     ? variantData[matchingVariantIndex].quantity
                                //     : ""
                                // }
                                className="input input-accent h-8"
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
                                className="file-input file-input-bordered file-input-info w-full max-w-xs"
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
              className="btn btn-accent float-right"
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

export default AddProductAttributes;
