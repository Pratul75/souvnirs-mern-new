import { useEffect, useState } from "react";
import { debouncedShowToast } from "../../../utils";
import API_WRAPPER from "../../../api";

const useAddChildMenu = () => {
  const [childMenuHeading, setChildMenuHeading] = useState("");
  const [childMenuType, setChildMenuType] = useState("");
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");
  const [link, setLink] = useState(`${childMenuType}/${selectedTypeDataValue}`);
  const [createdCards, setCreatedCards] = useState([]);
  const [areInputsValid, setAreInputsValid] = useState(false);
  const [subMenus, setSubmenus] = useState([]);
  const [subMenuId, setSubMenuId] = useState("");

  const getMainMenus = async () => {
    const response = await API_WRAPPER.get("/sub-menu");
    console.log("AddChildMenu.jsx", response);
    setSubmenus(response.data);
  };

  const handleApiCalls = async () => {
    if (childMenuType === "collection") {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (childMenuType === "category") {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (childMenuType === "productInfo") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        console.log("AddChildMenu.jsx", response.data);
        setSelectedTypeData(response.data);
      }
    } else if (childMenuType === "page") {
      // TODO: Handle page API call
    }
  };
  const createChildMenus = async () => {
    const response = await API_WRAPPER.post("/child-menu/create", createdCards);
    if (response) {
      debouncedShowToast("child-menu created successfully");
    }
  };

  const handleCardDelete = (index) => {
    const updatedCards = [...createdCards];
    updatedCards.splice(index, 1);
    setCreatedCards(updatedCards);
    debouncedShowToast("Submenu deleted successfully", "success");
  };
  console.log("AddChildMenu.jsx", createdCards);

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      subMenuId,
      heading: childMenuHeading,
      type: childMenuType,
      typeValue: selectedTypeDataValue,
      link: link,
    };
    setCreatedCards([...createdCards, newCard]);
    // Clear the form after submission
    setChildMenuHeading("");
    setSelectedTypeDataValue("");
    setChildMenuType("");
  };

  // side effects
  useEffect(() => {
    handleApiCalls();
  }, [childMenuType]);
  useEffect(() => {
    getMainMenus();
  }, []);

  useEffect(() => {
    setLink(`${childMenuType}/${selectedTypeDataValue}`);
    const ischildMenuHeadingValid = childMenuHeading.trim() !== "";
    const ischildMenuTypeValid = childMenuType !== "";
    const isSelectedTypeDataValueValid = selectedTypeDataValue !== "";

    // Update the validation state
    setAreInputsValid(
      ischildMenuHeadingValid &&
        ischildMenuTypeValid &&
        isSelectedTypeDataValueValid
    );
  }, [childMenuType, selectedTypeDataValue]);
  return {
    childMenuHeading,
    setChildMenuHeading,
    subMenus,
    setSubmenus,
    setSubMenuId,
    setChildMenuType,
    setSelectedTypeDataValue,
    selectedTypeData,
    childMenuType,
    areInputsValid,
    handleApiCalls,
    handleCardDelete,
    handleCardSubmit,
    createChildMenus,
    selectedTypeDataValue,
    createdCards,
  };
};

export default useAddChildMenu;
