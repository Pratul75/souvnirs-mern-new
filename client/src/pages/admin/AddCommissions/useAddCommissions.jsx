import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";

const useAddCommissions = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [commissionType, setCommissionType] = useState("PERCENTAGE");
  const [commissionTypeValue, setCommissionTypeValue] = useState("");
  // error states

  const getCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setCategories(response.data);
        console.log("CATEGORIES RESPONSE: ", response.data);
        debouncedShowToast("Categories loaded successfully", "success");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await API_WRAPPER.post("/commission/create-commission", {
        categoryId: selectedCategory,
        commissionType,
        commissionTypeValue,
      });
      if (response.status === 201) {
        debouncedShowToast("Commission added successfully", "success");
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return {
    handleCategorySelect,
    handleSubmit,
    categories,
    selectedCategory,
    setCommissionType,
    setCommissionTypeValue,
  };
};

export default useAddCommissions;
