import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";

const useAddSubMenus = () => {
  const [subMenuHeading, setSubMenuHeading] = useState("");
  const [subMenuType, setSubMenuType] = useState("");
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");
  const [link, setLink] = useState(`${subMenuType}/${selectedTypeDataValue}`);
  const [createdCards, setCreatedCards] = useState([]);
  const [areInputsValid, setAreInputsValid] = useState(false);
  const [mainMenus, setMainMenus] = useState([]);
  const [mainMenuId, setMainMenuId] = useState("");
  const [childMenuToggle, setChildMenuToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMainMenus = async () => {
    const response = await API_WRAPPER.get("/main-menu");
    console.log("AddSubMenus.jsx", response);
    setMainMenus(response.data);
  };

  const handleApiCalls = async () => {
    if (subMenuType === "collection") {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (subMenuType === "category") {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (subMenuType === "productInfo") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (subMenuType === "page") {
      // TODO: Handle page API call
    }
  };

  const handleCardDelete = (index) => {
    const updatedCards = [...createdCards];
    updatedCards.splice(index, 1);
    setCreatedCards(updatedCards);
    ``;
    debouncedShowToast("Submenu deleted successfully", "success");
  };
  const createSubMenus = async () => {
    setLoading(true);
    await API_WRAPPER.post("/sub-menu/create", createdCards);
    setLoading(false);
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const newCard = {
      mainMenuId,
      heading: subMenuHeading,
      type: subMenuType,
      typeValue: selectedTypeDataValue,
      link: link,
    };
    setCreatedCards([...createdCards, newCard]);
    // Clear the form after submission
    setSubMenuHeading("");
    setSelectedTypeDataValue("");
    setSubMenuType("");
  };
  const navigate = useNavigate();

  // side effects
  useEffect(() => {
    handleApiCalls();
  }, [subMenuType]);
  useEffect(() => {
    getMainMenus();
  }, []);

  useEffect(() => {
    setLink(`${subMenuType}/${selectedTypeDataValue}`);
    const isSubMenuHeadingValid = subMenuHeading.trim() !== "";
    const isSubMenuTypeValid = subMenuType !== "";
    const isSelectedTypeDataValueValid = selectedTypeDataValue !== "";

    // Update the validation state
    !childMenuToggle
      ? setAreInputsValid(
          isSubMenuHeadingValid &&
            isSubMenuTypeValid &&
            isSelectedTypeDataValueValid
        )
      : setAreInputsValid(isSubMenuHeadingValid);
  });
  console.log("AddSubMenus.jsx", mainMenuId);

  return {
    mainMenuId,
    setMainMenuId,
    mainMenus,
    setSubMenuHeading,
    subMenuHeading,
    setChildMenuToggle,
    childMenuToggle,
    setSubMenuType,
    setSelectedTypeDataValue,
    selectedTypeDataValue,
    selectedTypeData,
    subMenuType,
    areInputsValid,
    handleCardDelete,
    createdCards,
    createSubMenus,
    navigate,
    loading,
    handleCardSubmit,
  };
};

export default useAddSubMenus;
