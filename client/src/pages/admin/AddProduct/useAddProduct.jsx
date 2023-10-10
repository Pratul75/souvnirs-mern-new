import { useEffect, useState } from "react";
import { PATHS } from "../../../Routes/paths";
import API_WRAPPER from "../../../api";
import { useDispatch } from "react-redux";
import { debouncedShowToast } from "../../../utils";
import { setProduct } from "../../../features/appConfig/addProductSlice";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchAllCollections } from "../../../api/apiCalls";
import { setActiveCollection } from "../../../features/appConfig/appSlice";

const useAddProduct = () => {
  let FORMDAtA = JSON.parse(localStorage.getItem("productFormData"));
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [vendorsList, setVendorsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({});
  const [tagValue, setTagValue] = useState("");
  const [tagsArray, setTagsArray] = useState([]);
  const [preview, setPreview] = useState();
  const [foregroundWidth, setForegroundWidth] = useState(100); // default width
  const [foregroundHeight, setForegroundHeight] = useState(100); // default height
  const [selectedShape, setSelectedShape] = useState("square"); // default shape is "Square"
  const [foregroundX, setForegroundX] = useState(0);
  const [foregroundY, setForegroundY] = useState(0);

  const { data: collections } = useQuery(
    "get_collections",
    fetchAllCollections
  );

  const collectionOptions = () => {
    return collections?.data?.map((collection) => {
      return { value: collection._id, label: collection?.title };
    });
  };

  const handleDrag = (e, data) => {
    const parentElement = document.getElementById("parentElement"); // replace with the actual parent element ID
    const newX = Math.floor((data.x / parentElement.clientWidth) * 100);
    const newY = Math.floor((data.y / parentElement.clientHeight) * 100);

    setForegroundX(newX);
    setForegroundY(newY);

    // TODO: Update the formData object with the new values and store in db
    setFormData((prevData) => ({
      ...prevData,
      customization: {
        xAxis: newX,
        yAxis: newY,
        height: foregroundHeight,
        width: foregroundWidth,
      },
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("PRODUCT FORM DATA: ", formData);
    let mainData = { ...formData };
    mainData.img = "";
    localStorage.setItem("productFormData", JSON.stringify(mainData));
  }, [formData]);
  // get all categories
  const getAllCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        setCategoriesList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all categories", error);
    }
  };

  // get all vendors
  const getAllVendors = async () => {
    try {
      const response = await API_WRAPPER.get("/vendors/get-vendors");
      if (response.status === 200) {
        setVendorsList(response?.data?.data);
        // need to check what to be done here
        if (vendorsList.length == 1) {
          debouncedShowToast("vendor list is empty array", "error");
        }
      }
    } catch (error) {
      console.error("Error occured while getting all vendors", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !description ||
      tagsArray.length < 1 ||
      !formData.vendorId ||
      !preview
    ) {
      debouncedShowToast("Fill all required fields", "info");
      return;
    }
    dispatch(
      setProduct({
        ...formData,
        description,
        tags: tagsArray,
        customization: {
          xAxis: foregroundX,
          yAxis: foregroundY,
          height: foregroundHeight,
          width: foregroundWidth,
        },
      })
    );
    navigate(PATHS.adminAddProductAttributes);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTagInputChange = (event) => {
    setTagValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && tagValue.trim() !== "") {
      setTagsArray([...tagsArray, tagValue.trim()]);
      setTagValue("");
    }
  };

  const removeTag = (tagToRemove) => {
    const filteredTags = tagsArray.filter((tag) => tag !== tagToRemove);
    setTagsArray(filteredTags);
  };

  const handleForegroundWidthChange = (e) => {
    const newWidth = parseInt(e.target.value);
    const img = new Image();
    img.src = preview;

    img.onload = () => {
      const maxWidth = img.naturalWidth;

      if (newWidth <= maxWidth) {
        setForegroundWidth(newWidth);

        // Update the formData object with the new width
        setFormData((prevData) => ({
          ...prevData,
          foregroundWidth: newWidth,
        }));
      } else {
        setForegroundWidth(maxWidth);
        setFormData((prevData) => ({
          ...prevData,
          foregroundWidth: maxWidth,
        }));
      }
    };
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    dispatch(
      setActiveCollection(
        collections?.data?.filter((collection) => {
          return collection._id === value;
        })[0]
      )
    );
  };

  useEffect(() => {
    getAllCategories();
    getAllVendors();
  }, []);
  useEffect(() => {}, [selectedCategory]);
  useEffect(() => {
    if (formData.img) {
      const imageUrl = URL.createObjectURL(formData.img);
      setPreview(imageUrl);
    }
  }, [formData.img]);
  return {
    handleInputChange,
    description,
    setDescription,
    formData,
    vendorsList,
    tagValue,
    handleTagInputChange,
    handleKeyDown,
    tagsArray,
    removeTag,
    setFormData,
    preview,
    handleSubmit,
    handleDrag,
    foregroundHeight,
    foregroundWidth,
    selectedShape,
    handleForegroundWidthChange,
    setForegroundHeight,
    setSelectedShape,
    foregroundX,
    foregroundY,
    collectionOptions,
    filterOption,
    onChange,
  };
};

export default useAddProduct;
