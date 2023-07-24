import { Header, ReusableTable } from "../../components";
// import CollectionBannerImg from "../../assets/images/collectionBannerImg.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { nanoid } from "nanoid";
import { debouncedShowToast, getStatusStyles } from "../../utils";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../animation";
import { ToastContainer } from "react-toastify";
const CollectionConditions = () => {
  const [collectionConditions, setCollectionConditions] = useState(null);
  const [collectionConditionList, setCollectionConditionList] = useState([]);
  const [conditionValueList, setConditionValueList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [selectedVal, setSelectedVal] = useState([])

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
        accessor: "conditionValues",
        Cell: ({ row }) => {
          return (
            <>
              {row.original.conditionValues.map((id) => (
                <p className="" key={nanoid()}>
                  {id}
                </p>
              ))}
            </>
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
        "/collection-condition/get-all-collection-conditions"
      );
      if (response.status === 200) {
        setCollectionConditionList(response?.data);
        console.log("COLLECTION CONDITIONS LIST: ", response?.data);
      }
    } catch (error) {
      console.error(
        "Error occured while getting all collection conditions",
        error
      );
    }
  };
  const convertAttributesList = (arr) => {
    console.log('CollectionConditions.jsx', arr);
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
    window.collection_condition_delete_modal.showModal();
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setSelectedVal(selectedRow.conditionValues);
    window.collection_condition_edit_modal.showModal();
  };
  console.log('CollectionConditions.jsx', selectedVal);
  const handleSubmit = (e) => {
    e.preventDefault();
    addCollectionCondition();
  };
  console.log('CollectionConditions.jsx', selectedRow);

  const editFormHandler = async () => {
    try {

      const response = await API_WRAPPER.put(
        `/collection-condition/update-collection-condition/:${selectedRow._id}`, { ...editedRow, conditionValues: selected }
      );
      console.log('CollectionConditions.jsx', response.data);
      window.collection_condition_edit_modal.close()

      setApiTrigger((prevState) => !prevState);
    } catch (error) {
      console.log('CollectionConditions.jsx', error);
    }
  }
  useEffect(() => {
    getAllCollectionCondition();
    getAllConditionValues();
  }, [apiTrigger]);

  useEffect(() => {
    console.log("MULTI SELECT STATE: ", selected);
  }, [selected]);

  return (
    <div>
      <Header
        heading="Collection Conditions"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum is simply dummy text of the printing and typesetting industry.  "
      // image={CollectionBannerImg}
      />
      <motion.form
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        onSubmit={handleSubmit}
        className="mt-4"
      >
        <div className="grid grid-cols-2">
          <div className="form-control  p-4 rounded-xl">
            <label htmlFor="collection-condition-input" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              onChange={(e) => handleChange(e)}
              className="input input-accent"
              placeholder="Enter Title"
              type="text"
              name="colle ction-condition-input"
            />
          </div>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Sub Condition</span>
            </label>

            <MultiSelect
              options={convertArr(conditionValueList)}
              value={selected}
              onChange={setSelected}
            />
          </div>
        </div>

        <button className="btn btn-accent w-1/2 mt-4 text-white">
          Add Title
        </button>
        <div className="mt-4">
          <ReusableTable
            tableTitle="Collection Condition List"
            columns={columns}
            data={data}
            showButtons
            enableDelete
            enableEdit
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </motion.form>

      {/* edit modal */}
      <dialog id="collection_condition_edit_modal" className="modal">
        <form onSubmit={(e) => submitEditedRow(e)} method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.title}
                className="input input-accent"
                type="text"
                name="title"
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">condition values</span>
              </label>
              <MultiSelect
                options={convertArr(conditionValueList)}
                value={selected}
                onChange={setSelected}
              />
            </div>


            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.status}
                className="select select-accent"
                name="status"
                id=""
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="DEACTIVE">DEACTIVE</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
          </div>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button type="button" onClick={(e) => { editFormHandler(e) }} className="btn btn-accent">
              Save changes
            </button>
            <button
              onClick={() => window.collection_edit_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>

      {/* delete modal */}
      <dialog id="collection_condition_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => deleteCollectionCondition(selectedRow?._id)}
              className="btn btn-error"
            >
              Delete
            </button>
            <button
              onClick={() => window.collection_condition_edit_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default CollectionConditions;
