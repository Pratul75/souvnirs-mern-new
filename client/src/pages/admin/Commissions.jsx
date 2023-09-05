import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
import { debouncedShowToast } from "../../utils";
import { Header, Table } from "../../components";
import { ToastContainer } from "react-toastify";

const Commissions = () => {
  const [commissionList, setCommissionList] = useState([]);
  const [commissionToBeDeleted, setCommissionToBeDeleted] = useState({});
  const [commissionToBeEdited, setCommissionToBeEdited] = useState({});
  const [editedObject, setEditedObject] = useState({
    commissionType: "",
    commissionTypeValue: "",
  });
  const [apiTrigger, setApiTrigger] = useState(false);

  const getCommissionList = async () => {
    try {
      const response = await API_WRAPPER.get("/commission/get-all-commissions");
      if (response.status === 200) {
        console.log("COMMISSION LIST: ", response.data);
        setCommissionList(response.data);
        debouncedShowToast("Commission List loaded", "success");
      }
    } catch (error) {
      debouncedShowToast(error.messasge, "error");
    }
  };

  const toggleDelete = (row) => {
    console.log("ROW TO DELETE: ", row);
    setCommissionToBeDeleted(row);
    window.commission_delete_modal.showModal();
  };

  const toggleEdit = (row) => {
    console.log("ROW TO EDIT: ", row);
    setCommissionToBeEdited(row);
    window.commission_edit_modal.showModal();
  };

  const handleDelete = async () => {
    try {
      const response = await API_WRAPPER.delete(
        `/commission/delete-commission-by-id/${commissionToBeDeleted._id}`
      );
      if (response.status === 200) {
        setApiTrigger((prevState) => !prevState);
        debouncedShowToast("commission deleted successfully", "success");
        window.commission_delete_modal.close();
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const handleEdit = async () => {
    try {
      const response = await API_WRAPPER.put(
        `/commission/commission-by-id/${commissionToBeEdited._id}`,
        editedObject
      );
      if (response.status === 200) {
        setApiTrigger((prevState) => !prevState);
        window.commission_delete_modal.close();
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  useEffect(() => {
    getCommissionList();
  }, [apiTrigger]);

  useEffect(() => {
    console.log("EDITED OBJECT: ", editedObject);
  }, [editedObject]);

  const columns = [
    {
      Header: "Category ID",
      accessor: "categoryId",
    },
    {
      Header: "Commission Type",
      accessor: "commissionType",
    },
    {
      Header: "Commission Type Value",
      accessor: "commissionTypeValue",
    },
  ];

  const data = useMemo(() => commissionList, [commissionList]);

  return (
    <>
      <Header
        heading="Commissions"
        subheading="This section provides details about all the commissions that exists in the application"
      />
      <Link
        to={PATHS.adminAddCommission}
        className="btn btn-primary float-right mt-4"
      >
        Add Commissions
      </Link>
      <Table
        data={data}
        columns={columns}
        showButtons
        enableDelete
        enableEdit
        enablePagination
        pageSize={10}
        onEdit={toggleEdit}
        onDelete={toggleDelete}
      />

      {/* delete modal */}
      <dialog id="commission_delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected commission?
          </p>
          <div className="modal-action">
            <div method="dialog ">
              <button
                onClick={() => handleDelete()}
                className="btn btn-error mr-4"
              >
                Delete
              </button>
              <button
                onClick={() => window.commission_delete_modal.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>

      {/* edit modal */}
      <dialog id="commission_edit_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <p>{commissionToBeEdited?.categoryId}</p>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Commission Type</span>
            </label>
            <input
              onChange={(e) =>
                setEditedObject((prevState) => {
                  return { ...prevState, commissionType: e.target.value };
                })
              }
              defaultValue={commissionToBeEdited?.commissionType}
              type="text"
              className="input input-primary"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Commission Type Value</span>
            </label>
            <input
              onChange={(e) =>
                setEditedObject((prevState) => {
                  return { ...prevState, commissionTypeValue: e.target.value };
                })
              }
              defaultValue={commissionToBeEdited?.commissionTypeValue}
              type="number"
              className="input input-primary"
            />
          </div>
          <div className="modal-action">
            <div>
              <button
                onClick={() => handleEdit()}
                className="btn btn-primary mr-4"
              >
                Submit
              </button>
              <button
                onClick={() => window.commission_edit_modal.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
};

export default Commissions;
