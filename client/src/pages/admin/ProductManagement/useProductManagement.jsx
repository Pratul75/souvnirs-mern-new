import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
const useProductManagement = () => {
  const navigate = useNavigate();
  const [productsList, setProductsList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [bulkData, setBulkData] = useState();
  const [loading, setLoading] = useState(false);
  const [disapprovalComment, setDisapprovalComment] = useState("");
  const [error, seterror] = useState("");

  const alterApproval = async (id, approved, comment = "") => {
    await API_WRAPPER.post(`/product/approval/${id}`, { approved, comment });
    setApiTrigger((prev) => !prev);
    window.disapproval_modal.close();
  };
  useEffect(() => {
    fetchProductsList();
  }, [apiTrigger]);

  const data = useMemo(() => productsList, [productsList]);

  const fetchProductsList = async () => {
    try {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setProductsList(response?.data);
        console.log("RESPONSE: ", response?.data);
      }
    } catch (error) {
      console.error({ error, messge: error.message });
    }
  };

  const handleDelete = (row) => {
    console.log("ROW TO BE DELETED: ", row);
    setSelectedRow(row);
    window.product_management_delete_modal.showModal();
  };

  const handleEdit = (row) => {
    console.log("ROW TO BE DELETED: ", row);
    if (row?.result?._id) {
      navigate(`${PATHS.EditProduct}/${row._id}?variantID=${row?.result._id}`);
    } else {
      navigate(`${PATHS.EditProduct}/${row._id}/`);
    }
    // window.edit_product_modal.showModal();
    // setSelectedRow(row);
    // console.log("ROW TO BE EDITED: ", row);
  };

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const submitEditedRow = async (updatedVal) => {
    const response = await API_WRAPPER.put(
      `/products/edit-product/:${selectedRow._id}`,
      updatedVal
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      window.product_management_edit_modal.close();
      debouncedShowToast(response.data.data);
      console.log(
        "EDITED SUCCESSFULLY WITH THE FOLLOWING RESPONSE: ",
        response?.status
      );
    } else {
      debouncedShowToast(response.data.data.error, "error");
    }
  };
  const handleSave = (inputValues) => {
    console.log("SAVING THE INPUT VALUES: ", inputValues);
    submitEditedRow(inputValues);
  };

  const deleteSelectedRow = async () => {
    const response = await API_WRAPPER.delete(
      `/products/delete-product/:${selectedRow._id}`
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      console.log(
        "SELECTED ROW IS DELETED WITH FOLLOWING RESPONSE: ",
        response?.data
      );
      debouncedShowToast(response?.data?.data, "success");
    } else {
      debouncedShowToast(response?.data?.data.error, "error");
    }
  };
  const bulkUpload = async () => {
    try {
      console.log(bulkData);
      setLoading(true);
      console.log("ProductManagement.jsx", bulkData);
      const buFormData = new FormData();
      buFormData.append("file", bulkData);
      const response = await API_WRAPPER.post(
        "/products/bulk-upload",
        buFormData
      );
      if (response.status == 200) {
        setLoading(false);
      }
      console.log("ProductManagement.jsx", response);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, [apiTrigger]);
  return {
    alterApproval,
    bulkUpload,
    deleteSelectedRow,
    handleSave,
    handleEditChange,
    data,
    setBulkData,
    selectedRow,
    setDisapprovalComment,
    disapprovalComment,
    loading,
    handleDelete,
    handleEdit,
    seterror,
    error,
  };
};

export default useProductManagement;
