import { useEffect, useState } from "react";
import { debouncedShowToast } from "../../../utils";
import { useNavigate } from "react-router-dom";
import API_WRAPPER from "../../../api";

const useAddMainMenus = () => {
  const [menuHeaderTitlesList, setMenuHeaderTitlesList] = useState([]);
  const [subMenuToggle, setSubMenuToggle] = useState(false);
  const [mainMenuData, setMainMenuData] = useState({ title: "", type: "" });
  const [selectedTypeData, setSelectedTypeData] = useState([]);
  const [selectedTypeDataValue, setSelectedTypeDataValue] = useState("");

  // provide headers to select from
  const getAllMenuHeaderTitles = async () => {
    const response = await API_WRAPPER.get("/menu/list/show");
    if (response?.status === 200) {
      setMenuHeaderTitlesList(response?.data);
    }
  };

  const handleApiCalls = async () => {
    if (mainMenuData.type === "collection") {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (mainMenuData.type === "category") {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (mainMenuData.type === "productInfo") {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setSelectedTypeData(response.data);
      }
    } else if (mainMenuData.type === "page") {
      // TODO: Handle page API call
    }
  };

  const navigate = useNavigate();
  console.log("AddMainMenus.jsx", selectedTypeDataValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMainMenuData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createMainMenu = async (e) => {
    e.preventDefault();
    try {
      const response = await API_WRAPPER.post("/main-menu/create", {
        ...mainMenuData,
        link: `${mainMenuData.type}/${selectedTypeDataValue}`,
      });
      debouncedShowToast("Main Menu Item Created Successfully", "success");
      navigate("/admin/menus");
      console.log("AddMainMenus.jsx", response);
    } catch (e) {
      console.log("AddMainMenus.jsx", e);
      debouncedShowToast(e.response.data, "error");
    }
  };

  useEffect(() => {
    getAllMenuHeaderTitles();
  }, []);

  useEffect(() => {
    handleApiCalls();
  }, [mainMenuData.type]);

  useEffect(() => {
    console.log("MAIN MENU DATA: ", mainMenuData);
  }, [mainMenuData]);
  return {
    mainMenuData,
    handleApiCalls,
    menuHeaderTitlesList,
    setSubMenuToggle,
    subMenuToggle,
    createMainMenu,
    navigate,
    handleInputChange,
    setSelectedTypeDataValue,
    selectedTypeData,
    selectedTypeDataValue,
  };
};

export default useAddMainMenus;
