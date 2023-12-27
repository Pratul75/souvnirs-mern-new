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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");
  const [storeFilter, setStoreFilter] = useState({
    sortBy: "",
    name: "",
  });

  const alterApproval = async (id, approved, comment = "") => {
    await API_WRAPPER.post(`/product/approval/${id}`, { approved, comment });
    setApiTrigger((prev) => !prev);
    window.disapproval_modal.close();
    fetchProductsList();
  };

  useEffect(() => {
    fetchProductsList();
  }, [
    apiTrigger,
    page,
    pageSize,
    seacrhText,
    storeFilter?.name,
    storeFilter?.sortBy,
  ]);

  const FilterDataCall = (item, selectedSort) => {
    setStoreFilter({
      ...storeFilter,
      name: selectedSort?.name,
      sortBy: item?.value,
    });
    setPage(1);
  };

  const data = useMemo(() => productsList, [productsList]);

  const fetchProductsList = async () => {
    try {
      if (storeFilter?.sortBy && storeFilter?.name) {
        setProductLoading(true);
        const response = await API_WRAPPER.get(
          `/get/products?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}&sortBy=${storeFilter?.sortBy}&name=${storeFilter?.name}`
        );
        if (response.status === 200) {
          setProductLoading(false);
          setProductsList(response?.data.productsList);
          setTotalPagesShow(response?.data?.totalPages);
          console.log("RESPONSE: ", response?.data);
        }
      } else {
        setProductLoading(true);
        const response = await API_WRAPPER.get(
          `/get/products?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
        );
        if (response.status === 200) {
          setProductLoading(false);
          setProductsList(response?.data.productsList);
          setTotalPagesShow(response?.data?.totalPages);
          console.log("RESPONSE: ", response?.data);
        }
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
        toast.success("uploaded successfully");
        fetchProductsList();
        // window.product_management_Product_success.showModal();
      }
      console.log("ProductManagement.jsx", response);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const ResetFilter = () => {
    setStoreFilter({
      sortBy: "",
      name: "",
    });
    SetSearchTex("");
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
    setSelectedRow,
    bulkData,
    setPageSize,
    setPage,
    pageSize,
    page,
    totalPagesShow,
    productLoading,
    SetSearchTex,
    seacrhText,
    FilterDataCall,
    ResetFilter,
  };
};

export default useProductManagement;
