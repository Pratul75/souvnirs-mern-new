import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import { PATHS } from "../../../Routes/paths";
import { useNavigate } from "react-router-dom";

const useCategories = () => {
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState([]);
  const [attributesList, setAttributesList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const getAllCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        console.log("ALL CATEGORIES LIST: ", response.data);
        setCategoriesList(response?.data);
      }
    } catch (error) {
      console.error("Error occurred while fetching all categories", {
        error,
      });
    }
  };

  const convertAttributesList = (arr) => {
    const convertedArr = arr.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
    console.log("CONVERTED ARR: ", convertedArr);
    return convertedArr;
  };

  const getAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get("/attribute/get-all-attributes");
      if (response.status === 200) {
        setAttributesList(response?.data);
        console.log("ATTRIBUTES LIST RESPONSE: ", response?.data);
      }
    } catch (error) {
      console.error("Error occurred in fetching all attributes", error);
    }
  };

  const handleDelete = (row) => {
    console.log("SELECTED ROW: ", row);
    window.categories_delete_modal.showModal();
    setSelectedRow(row);
  };

  const handleEdit = (row) => {
    console.log("SELECTED ROW: ", row);
    navigate(`${PATHS.EditCategory}/${row._id}`);
  };

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
    console.log("EDITED ROW: ", editedRow);
  };

  const submitEditedRow = async () => {
    // e.preventDefault();
    const response = await API_WRAPPER.put(
      `/category/update-category/:${selectedRow._id}`,
      { ...editedRow, attributes: selectedAttributes.map((item) => item.value) }
    );
    if (response?.status === 200) {
      setApiTrigger((prevState) => !prevState);
      window.categories_edit_modal.close();
    }
  };

  const submitDeleteCategory = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.delete(
      `/category/delete-category/:${selectedRow._id}`
    );
    if (response.status === 200) {
      console.log("CATEGORY DELETED", response?.data);
      window.categories_delete_modal.close();
      setApiTrigger((prevState) => !prevState);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [apiTrigger]);

  useEffect(() => {
    getAllAttributes();
  }, []);

  useEffect(() => {}, [selectedAttributes]);
  console.log("SELECTED ATTRIBUTES: ", editedRow);

  useEffect(() => {
    // Set default selected values for MultiSelect based on selectedRow.attributes
    const defaultSelectedAttributes = selectedRow.attributes
      ? selectedRow.attributes.map((attributeId) => {
          const attribute = attributesList.find(
            (attr) => attr._id === attributeId
          );
          return {
            label: attribute?.name || "", // Set label to attribute name if found, otherwise an empty string
            value: attributeId,
          };
        })
      : [];
    setSelectedAttributes(defaultSelectedAttributes);
  }, [selectedRow, attributesList]);
  console.log("Categories.jsx", selectedRow);

  return {
    categoriesList,
    handleDelete,
    handleEdit,
    handleEditChange,
    selectedRow,
    convertAttributesList,
    attributesList,
    submitEditedRow,
    submitDeleteCategory,
    selectedAttributes,
    setSelectedAttributes,
    getAllCategories,
  };
};

export default useCategories;
