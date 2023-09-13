import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";

const useCategory = () => {
  const [attributesList, setAttributesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [formData, setFormData] = useState({});
  const [parentCategories, setParentCategories] = useState([]);

  const navigate = useNavigate();

  const getAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get("/attribute/get-all-attributes");
      if (response.status === 200) {
        setAttributesList(response?.data);
      }
    } catch (error) {
      console.error({
        message: "Error occurred while fetching all attributes",
        error,
      });
    }
  };

  const getParentCategories = async () => {
    const response = await API_WRAPPER.get("/category/parent/");
    console.log("AddCategory.jsx", response.data);
    setParentCategories(response.data);
  };

  useEffect(() => {
    getAllAttributes();
    getParentCategories();
  }, []);

  useEffect(() => {
    const filteredResults = attributesList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [attributesList, searchQuery]);

  const handleAddAttribute = (attribute) => {
    console.log("ATTRIBUTE: ", attribute);

    setSelectedAttributes((prevState) => {
      if (prevState.includes(attribute)) {
        return prevState;
      } else {
        return [...prevState, attribute];
      }
    });
  };

  const handleAttributeDelete = (attribute) => {
    const updatedAttributes = selectedAttributes.filter(
      (selectedAttribute) => selectedAttribute._id !== attribute._id
    );
    setSelectedAttributes(updatedAttributes);
  };
  console.log("AddCategory.jsx", formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    console.log("FORM DATA: ", formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.post("/category/add-category", {
      ...formData,
      attributes: selectedAttributes.map((item) => item._id),
    });
    console.log("RESPONSE AFTER ADDING CATEGORY: ", response.data);
    if (response.status === 201) {
      navigate("/admin/categories");
      debouncedShowToast("category created", "success");
    }
  };
  //   dont know whats the use of this function
  function generateCombinations(attributes) {
    const combinations = [];

    const generateCombination = (currentCombination, index) => {
      if (index === attributes.length) {
        combinations.push(currentCombination);
        return;
      }

      const attribute = attributes[index];
      for (let i = 0; i < attribute.values.length; i++) {
        const newCombination = { ...currentCombination };
        newCombination[attribute.name] = attribute.values[i];
        generateCombination(newCombination, index + 1);
      }
    };

    generateCombination({}, 0);

    return combinations;
  }

  return {
    handleSubmit,
    handleInputChange,
    searchQuery,
    setSearchQuery,
    searchResults,
    handleAddAttribute,
    selectedAttributes,
    handleAttributeDelete,
    parentCategories,
  };
};

export default useCategory;
