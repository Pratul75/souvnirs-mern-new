import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../../api";
import { debouncedShowToast, getStatusStyles } from "../../../utils";
import { nanoid } from "nanoid";

const useCollectionConditions = () => {
  const [collectionConditions, setCollectionConditions] = useState(null);
  const [collectionConditionList, setCollectionConditionList] = useState([]);
  const [conditionValueList, setConditionValueList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedVal, setSelectedVal] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const [editedRow, setEditedRow] = useState({});
  // table columns
  const columns = useMemo(
    () => [
      {
        Header: "Collection Condition Title",
        accessor: "title",
      },
      {
        Header: "Condition Values",
        accessor: "result",
        Cell: ({ row }) => {
          return (
            <>
              {row.original.result.map((id) => (
                <p className="" key={nanoid()}>
                  {id.conditionValue}
                </p>
              ))}
            </>
          );
        },
      },
      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: ({ row }) => {
      //     return getStatusStyles(row?.original?.status);
      //   },
      // },
    ],
    []
  );
  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const convertArr = (arr) => {
    const convertedArr = arr.map((item) => {
      return { label: item.conditionValue, value: item._id };
    });

    return convertedArr;
  };

  // table data
  const data = useMemo(
    () => collectionConditionList,
    [collectionConditionList]
  );

  const addCollectionCondition = async () => {
    try {
      const response = await API_WRAPPER.post(
        `/collection-condition/create-collection-condition`,
        {
          title: collectionConditions,
          conditionValues: selected.map((item) => item?.value),
        }
      );
      console.log("RESPONSE: ", response?.data);
      setApiTrigger((prevState) => !prevState);
      debouncedShowToast(
        "Collection condition created successfully",
        "success"
      );
    } catch (error) {
      console.error(
        "Error occured while adding new collection condition",
        error
      );
      debouncedShowToast(error.message, "error");
    }
  };

  const getAllCollectionCondition = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/collection-condition/get-all-collection-conditions/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        setCollectionConditionList(response?.data?.collectionConditions);
        setTotalPagesShow(response?.data?.totalPages);
        console.log("COLLECTION CONDITIONS LIST: ", response?.data);
      }
    } catch (error) {
      debouncedShowToast(error?.message, "error");
      console.error(
        "Error occured while getting all collection conditions",
        error
      );
    }
  };
  const convertAttributesList = (arr) => {
    console.log("CollectionConditions.jsx", arr);
    const convertedArr = arr.map(({ _id, name }) => ({
      label: name,
      value: _id,
    }));
    console.log("CONVERTED ARR: ", convertedArr);
    return convertedArr;
  };
  const getAllConditionValues = async () => {
    const response = await API_WRAPPER.get(
      "/condition-value/get-all-condition-values"
    );
    if (response.status === 200) {
      setConditionValueList(response?.data);
      console.log("CONDITION VALUE LIST: ", response?.data);
    }
  };

  const deleteCollectionCondition = async (id) => {
    try {
      const response = await API_WRAPPER.delete(
        `/collection-condition/delete-collection-condition/:${id}`
      );
      if (response.status === 200) {
        setApiTrigger((prevState) => !prevState);
        debouncedShowToast(
          "Collection Condition Deleted Successfully",
          "success"
        );
        getAllCollectionCondition();
        console.log("DELETE RESPONSE: ", response);
      }
    } catch (error) {
      console.error("Error occured while deleting collection condition", error);
      debouncedShowToast(error.message, "error");
    }
  };

  const handleChange = (e) => {
    setCollectionConditions(e.target.value);
  };

  const handleDelete = (row) => {
    // deleteCollectionCondition(row._id);
    setSelectedRow(row);
    window.collection_condition_delete_modals.showModal();
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setSelectedVal(selectedRow.conditionValues);
    window.collection_condition_edit_modal.showModal();
  };
  console.log("CollectionConditions.jsx", selectedVal);
  const handleSubmit = (e) => {
    e.preventDefault();
    addCollectionCondition();
  };
  console.log("CollectionConditions.jsx", selectedRow);

  const editFormHandler = async () => {
    try {
      const response = await API_WRAPPER.put(
        `/collection-condition/update-collection-condition/:${selectedRow._id}`,
        { ...editedRow, conditionValues: selected }
      );
      console.log("CollectionConditions.jsx", response.data);
      window.collection_condition_edit_modal.close();
      setApiTrigger((prevState) => !prevState);
    } catch (error) {
      console.log("CollectionConditions.jsx", error);
    }
  };
  useEffect(() => {
    getAllCollectionCondition();
    getAllConditionValues();
  }, [apiTrigger, page, pageSize, seacrhText]);

  useEffect(() => {
    console.log("MULTI SELECT STATE: ", selected);
  }, [selected]);

  return {
    handleSubmit,
    handleChange,
    convertArr,
    conditionValueList,
    selected,
    setSelected,
    columns,
    data,
    handleEdit,
    handleDelete,
    handleEditChange,
    selectedRow,
    editFormHandler,
    deleteCollectionCondition,
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

export default useCollectionConditions;
