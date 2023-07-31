import { Header } from "../../components";
import { GoPlus } from "react-icons/go";
import { ToastContainer } from "react-toastify";
// import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
import ReusableTable from "../../components/Table";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import API_WRAPPER from "../../api"
import { useEffect, useState } from "react";
import { getStatusStyles, debouncedShowToast } from "../../utils";
import "react-toastify/dist/ReactToastify.css";

const Attributes = () => {
  const [attributesList, setAttributesList] = useState([]);
  const [getApiTrigger, setGetApiTrigger] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRowObject, setEditedRowObject] = useState({});
  const navigate = useNavigate();

  // Modify the API call functions to show toasts on success or error
  const fetchAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get("/attribute/get-all-attributes");
      if (response.status === 200) {
        console.log("ALL ATTRIBUTES LIST: ", response?.data);
        setAttributesList(response?.data);
        debouncedShowToast("Attributes loaded successfully!", "success");
      }
    } catch (error) {
      console.error("Error occurred while fetching all attributes list", error);
      debouncedShowToast("Error fetching attributes!", "error");
    }
  };

  const columns = [
    {
      Header: "Attribute Id",
      accessor: "_id",
    },
    {
      Header: "Attribute Name",
      accessor: "name",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => {
        return getStatusStyles(row?.original?.status);
      },
    },
  ];

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
    setEditedRowObject({ ...editedRowObject, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API_WRAPPER.put(
        `/attribute/update-attribute/:${selectedRow._id}`,
        editedRowObject
      );
      if (response.status === 201) {
        console.log("ATTRIBUTE EDITED: ", response);
        setGetApiTrigger((prevState) => !prevState);
        window.attributes_edit_modal.close();
        navigate(PATHS.adminAttribute);
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
  }, [getApiTrigger]);

  return (
    <>
      <Header
        heading="Attribute Management"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. asdasd wda sw3e awe "
        // image={CategoryBnnerImng}
      />

      <div className="w-full flex justify-end gap-4 mt-8"></div>
      <div className="mt-5">
        <div className="flex justify-end">
          <Link
            to={PATHS.adminAddAttributes}
            className="btn bg-themeColor text-white font-thin w-48 mb-4"
          >
            <GoPlus stroke="1px" size={20} />
            Add Attribute
          </Link>
        </div>
        <ReusableTable
          tableTitle="Attributes List"
          data={attributesList}
          columns={columns}
          showButtons
          enableDelete
          enableEdit
          onDelete={handleDelete}
          onEdit={handleEdit}
          pageSize={10}
          enablePagination
        />
        {/* edit modal */}
        <dialog id="attributes_edit_modal" className="modal">
          <form

            method="dialog"
            className="modal-box"
          >
            <h3 className="font-bold text-lg">Edit Attribute</h3>
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Attribute Name</span>
                </label>
                <input
                  defaultValue={selectedRow?.name}
                  onChange={(e) => handleEditChange(e)}
                  className="input input-accent"
                  type="text"
                  name="name"
                  id=""
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  defaultValue={selectedRow?.status}
                  onChange={(e) => handleEditChange(e)}
                  className="select select-accent"
                  name="status"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="DEACTIVE">DEACTIVE</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>
            </div>
            <div className="modal-action flex gap-4">
              <button type="button" onClick={(e) => handleFormSubmit(e)} className="btn btn-accent">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => window.attributes_edit_modal.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
        {/* delete modal */}
        <dialog id="attributes_delete_modal" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}

              <button
                onClick={() => handleDeleteSubmit()}
                className="btn btn-error"
              >
                Delete
              </button>
              <button
                onClick={() => window.attributes_delete_modal.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <ToastContainer />
    </>
  );
};
export default Attributes;
