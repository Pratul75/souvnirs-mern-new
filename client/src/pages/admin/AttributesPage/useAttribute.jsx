import { useEffect, useState } from "react";
import { debouncedShowToast } from "../../../utils";
import API_WRAPPER from "../../../api";

const useAttribute = () => {
  const [attributesList, setAttributesList] = useState([]);
  const [getApiTrigger, setGetApiTrigger] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRowObject, setEditedRowObject] = useState({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const fetchAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/attribute/get-all-attributes/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        console.log("ALL ATTRIBUTES LIST: ", response?.data);
        setAttributesList(response?.data?.attributes);
        setTotalPagesShow(response?.data?.totalPages);
        // debouncedShowToast("Attributes loaded successfully!", "success");
      }
    } catch (error) {
      console.error("Error occurred while fetching all attributes list", error);
      debouncedShowToast("Error fetching attributes!", "error");
    }
  };
  const handleEdit = (row) => {
    console.log("ROW TO EDIT: ", row);
    setSelectedRow(row);
    window.attributes_edit_modal.showModal();
  };

  const handleDelete = (row) => {
    console.log("ROW TO DELETE: ", row);
    setSelectedRow(row);
    window.attributes_delete_modal.showModal();
  };
  const handleEditChange = (e) => {
    setEditedRowObject({
      ...editedRowObject,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(editedRowObject);
    try {
      const response = await API_WRAPPER.put(
        `/attribute/update-attribute/:${selectedRow._id}`,
        editedRowObject
      );
      if (response.status === 200) {
        console.log("ATTRIBUTE EDITED: ", response);
        window.attributes_edit_modal.close();
        setGetApiTrigger((prevState) => !prevState);
        debouncedShowToast("Attribute edited successfully!", "success");
      }
    } catch (error) {
      console.error("Error occurred while updating attribute:", error);
      debouncedShowToast("Error editing attribute!", "error");
    }
  };
  const handleDeleteSubmit = async () => {
    try {
      const response = await API_WRAPPER.delete(
        `/attribute/delete-attribute/:${selectedRow._id}`
      );
      if (response?.status === 200) {
        console.log("DELETED ROW: ", response?.data);
        setGetApiTrigger((prevState) => !prevState);
        debouncedShowToast("Attribute deleted successfully!", "success");
      }
    } catch (error) {
      console.error("Error occurred while deleting attribute:", error);
      debouncedShowToast("Error deleting attribute!", "error");
    }
  };

  useEffect(() => {
    fetchAllAttributes();
  }, [getApiTrigger, page, pageSize, seacrhText]);

  return {
    handleDeleteSubmit,
    handleFormSubmit,
    handleEditChange,
    handleDelete,
    handleEdit,
    attributesList,
    selectedRow,
    setSelectedRow,
    setPageSize,
    setPage,
    pageSize,
    page,
    totalPagesShow,
    productLoading,
    SetSearchTex,
    seacrhText,
  };
};

export default useAttribute;
