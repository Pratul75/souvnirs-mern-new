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

const AddProductAttributes = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [attributesList, setAttributesList] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attSelected, setAttSelected] = useState(false);
  const [combinations, setCombinations] = useState([]);
  const [variantData, setVariantData] = useState([]);
  const [showData, setShowData] = useState([]);

  const p = useSelector((state) => state.product);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log('AddProductAttributes.jsx', p);

  const categories = useCategories();

  const generateValueCombinations = () => {
    const combination = [];

    function generateCombinations(attributes, index = 0, current = {}, result = []) {
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

  const handleSelectedValue = (category) => {
    setCategoryId(category?.id);
    setCategoryName(category?.name);
    dispatch(setProduct({ categoryId: category?.id }));

  };
  const scrollToSection = () => {
    const targetElement = document.getElementById('selectedattributes');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' }); // You can use 'auto' for instant scrolling
    }
  };

  const convertAttributesList = (arr) => {
    return arr.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
  };
  const attributeSelection = (e) => {
    const selectedAttribute = attributesList.find((att) => att._id === e.target.value);

    if (!selectedAttributes.some(att => att._id === selectedAttribute._id)) {
      setSelectedAttributes((prevSelectedAttributes) => [...prevSelectedAttributes, selectedAttribute]);
      scrollToSection();
    }
  };


  const handleAtttributeValueSelection = (e, attribute) => {
    if (e.key === "Enter") {
      const existingIndex = attributeValues.findIndex(
        (item) => item.id === attribute._id
      );

      const newEntry = { name: attribute.name, id: attribute._id, values: [e.target.value] };

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
      const response = await API_WRAPPER.get(`/attribute/get-all-attributes/${categoryId}`);
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

    setVariantData(prevData => {
      const updatedData = [...prevData];
      updatedData[index][field] = value;
      return updatedData;
    });
  };
  console.log('AddProductAttributes.jsx', selectedAttributes);

  const handleTableFileChange = (e, index) => {
    const files = e.target.files;

    setVariantData(prevData => {
      const updatedData = [...prevData];
      updatedData[index].files = files;
      return updatedData;
    });
  };
  console.log('AddProductAttributes.jsx', variantData);

  const isEqualVariants = (variant1, variant2) => {
    // Implement your logic to compare two variants here
    // For simplicity, I'm assuming each variant is an object with properties
    return JSON.stringify(variant1) === JSON.stringify(variant2);
  };
  useEffect(() => {
    setVariantData(combinations.map(combination => ({
      ...combination,
      price: "",
      quantity: "",
      files: null,
    })));
  }, [combinations]);

  return (
    <div>
      <Header
        heading={attSelected ? "Add Product Variants" : "Add Product Attributes"}
        subheading="Add attributes, categories and their configuration on this page"
        image={AttributeBannerImage}
      />
      {!attSelected ? (
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
              <div className="col-span-2 md:col-span-1 p-4">
                <select
                  name=""
                  onChange={(e) => {
                    attributeSelection(e)

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
          {selectedAttributes.length > 0 && (
            <div
              id="selectedattributes"
              className="grid grid-cols-4 relative"
            >
              <Card id="selectedAtt" className="relative w-full">
                <label className="label font-bold">Selected Attributes: </label>
                {selectedAttributes.map((att) => (
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
                          <span key={index}>{a}</span>
                        ));
                      }
                      return null;
                    })}
                  </div>
                ))}
                <button
                  className="btn btn-accent absolute right-10 bottom-5"
                  onClick={() => {

                    generateValueCombinations();
                    dispatch(setProduct({ attributes: selectedAttributes }))
                    setAttSelected(true);
                  }}
                >
                  Next
                </button>
              </Card>
            </div>
          )}
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
                      const matchingVariantIndex = variantData.findIndex((variant) =>
                        isEqualVariants(variant, x)
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
                                name={`quantity-${index}`}
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
                                    "quantity"
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
            <button className="btn btn-accent float-right"> Next</button>
          </Card>
        </div>
      )
      }
      <ToastContainer />
    </div >
  );
};

export default AddProductAttributes;
