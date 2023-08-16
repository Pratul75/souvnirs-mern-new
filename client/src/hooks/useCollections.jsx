import { useEffect, useState } from "react";
import API_WRAPPER from "../api";

const useCollections = () => {
  const [collectionList, setCollectionList] = useState([]);
  const getAllCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setCollectionList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all categories", error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return collectionList;
};

export default useCollections;
