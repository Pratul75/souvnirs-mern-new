import { useEffect, useState } from "react";
import API_WRAPPER from "../api";
import { debouncedShowToast } from "../utils";

const useAttributes = ({ selectedCategory }) => {
  const [attributesList, setAttributesList] = useState([]);

  const fetchAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/attribute/get-all-attributes/${selectedCategory}`
      );
      if (response.status === 200) {
        setAttributesList(response?.data);
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  useEffect(() => {
    fetchAllAttributes();
  });

  return attributesList;
};

export default useAttributes;
