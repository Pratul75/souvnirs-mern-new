import React, { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../../api";
import { debouncedShowToast, getStatusStyles } from "../../../utils";
import { useNavigate } from "react-router-dom";

const useVendor = () => {
  const [vendorList, setVendorList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [convertedArr, setConvertedArr] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);

  console.log("Vendor.jsx", selectedStore);
  const handleDeleteModalClose = () => {
    return window.vendor_edit_modal.close();
  };
  const convertToDesiredOutcome = (vendors, stores) => {
    const result = [];

    for (const store of stores) {
      const vendor = vendors.find((v) => v._id === store.vendor_id);

      if (vendor) {
        const outcome = {
          id: vendor._id,
          vendorName: vendor.firstName + " " + vendor.lastName,
          contact: vendor.mobile,
          store: store._id,
          country: store.country,
          status: store.status,
        };

        result.push(outcome);
      }
    }
    setConvertedArr(result);
    return result;
  };
  const navigate = useNavigate();
  const handleSave = (inputValues) => {
    console.log("SAVING THE INPUT VALUES: ", inputValues);
    submitEditedRow(inputValues);
  };
  // const handleEditChange = (e) => {
  //   setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  // };
  const columns = useMemo(
    () => [
      {
        Header: "Vendor Name",
        accessor: "firstName",
      },
      {
        Header: "Contact",
        accessor: "mobile",
      },

      {
        Header: "email",
        accessor: "email",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(row?.original?.status);
        },
      },
    ],
    [storeList]
  );
  const data = useMemo(() => convertedArr, [convertedArr]);

  const fetchVendorList = async () => {
    try {
      const response = await API_WRAPPER.get("/vendors/get-vendors");
      if (response.status === 200) {
        setVendorList(response?.data?.data);
      }
    } catch (error) {
      console.error("Error occurred while fetching all vendorList", error);
    }
  };
  console.log("Vendor.jsx", selectedRow);

  const submitEditedRow = async (data) => {
    try {
      console.log("Vendor.jsx", selectedRow);
      const response = await API_WRAPPER.put(
        `/vendors/update-vendor/:${selectedRow._id}`,
        data
      );
      setApiTrigger((res) => !res);
    } catch (e) {
      console.log("Vendor.jsx", e);
    }
  };

  const fetchStoreList = async () => {
    try {
      const response = await API_WRAPPER.get("/store/get-all-stores");
      if (response.status === 200) {
        setStoreList(response?.data?.stores);
      }
    } catch (error) {
      y;
      console.error("Error occurred while fetching all storeList", error);
    }
  };

  const submitHandleDelete = async () => {
    try {
      const response = await API_WRAPPER.delete(
        `/vendors/delete-vendor/:${selectedRow?._id}`
      );
      if (response.status === 200) {
        debouncedShowToast("Vendor deleted successfully!", "success");
        setApiTrigger((prevState) => !prevState);
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const handleDelete = (row) => {
    console.log("ROW TO BE DELETED: >>>>>>>>>>>>", row);
    setSelectedRow(row);
    window.vendor_delete_modal.showModal();
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    window.vendor_edit_modal.showModal();
    console.log("ROW TO BE EDITED: ", row);
  };

  const handleModalFormSubmit = async (e) => {
    try {
      const response = await API_WRAPPER.put(
        `/store/update-store/:${selectedStore._id}`,
        selectedStore
      );
      console.log("EDITED RESPONSE", response.data);

      window.storeFilterModal.close();

      setEditedProduct(null);
    } catch (error) {
      console.error("Error occurred while editing product", error);
    }
  };

  useEffect(() => {
    fetchVendorList();
    fetchStoreList();
  }, [apiTrigger]);

  useEffect(() => {
    convertToDesiredOutcome(vendorList, storeList);
  }, [storeList, vendorList]);
  return {
    selectedRow,
    columns,
    vendorList,
    handleDelete,
    handleEdit,
    handleDeleteModalClose,
    handleSave,
    selectedStore,
    setSelectedStore,
    handleModalFormSubmit,
    submitHandleDelete,
  };
};

export default useVendor;
