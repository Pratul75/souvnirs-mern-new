import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_WRAPPER from "../../../api";
import { debouncedShowToast, getStatusStyles } from "../../../utils";
import { PATHS } from "../../../Routes/paths";
import parse from "html-react-parser";
export const useCollection = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);

  const [editedRow, setEditedRow] = useState({});
  const navigate = useNavigate();

  const fetchAllCollections = async () => {
    try {
      const response = await API_WRAPPER.get("/collection/get-all-collections");
      if (response?.status === 200) {
        setCollectionList(response?.data);
        debouncedShowToast("Collection loaded successfully!", "success");
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };
  console.log("Collection.jsx", selectedRow);
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        // accessor: "description",
        cell: ({ row }) => {
          return (
            <p>
              {row?.original?.description && parse(row?.original?.description)}
            </p>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(row?.original?.status);
        },
      },
    ],
    []
  );

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };
  console.log("Collection.jsx", editedRow);

  const data = useMemo(() => collectionList, [collectionList]);

  const handleDelete = (row) => {
    setSelectedRow(row);
    window.collection_delete_modal.showModal();
    console.log("ROW TO BE DELETED: ", row);
  };

  const submitEditedRow = async (e) => {
    e.preventDefault();
    console.log("Collection.jsx", editedRow);
    const response = await API_WRAPPER.put(
      `collection/update-collection-by-id/:${selectedRow._id}`,
      { ...editedRow }
    );
    if (response?.status === 200) {
      setApiTrigger((prevState) => !prevState);
      window.collection_edit_modal.close();
    }
  };
  // console.log('Collection.jsx', deactivat);

  const handleDeleteSubmit = async () => {
    try {
      const response = await API_WRAPPER.delete(
        `collection/delete-collection-by-id/:${selectedRow._id}`
      );
      if (response.status === 200) {
        window.collection_delete_modal.close();
        debouncedShowToast("Collection deleted successfully", "success");
        setApiTrigger((prevState) => !prevState);
      }
    } catch (error) {
      console.error("Error occurred while deleting collection:", error);
      debouncedShowToast(error.message, "error");
    }
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    navigate(`${PATHS.EditCollection}/${row._id}`);
    // window.collection_edit_modal.showModal();
    console.log("ROW TO BE EDITED: ", row);
  };

  useEffect(() => {
    fetchAllCollections();
  }, [apiTrigger]);

  const getFlatRowsData = (data) => {
    console.log("Collection.jsx", data);
  };
  return {
    columns,
    data,
    selectedRow,
    getFlatRowsData,
    handleDelete,
    handleEdit,
    submitEditedRow,
    handleEditChange,
    handleDeleteSubmit,
  };
};
