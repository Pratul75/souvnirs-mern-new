import { useEffect, useState } from "react";
import API_WRAPPER from "../api";

const useProducts = () => {
  const [productsList, setProductsList] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setProductsList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all products", error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return productsList;
};

export default useProducts;
