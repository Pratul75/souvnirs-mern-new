import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
import { Header, ReusableTable } from "../../components";
import { debouncedShowToast, getStatusStyles } from "../../utils";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import { ToastContainer } from "react-toastify";

const Collection = () => {
  const [collectionList, setCollectionList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);

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

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
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

  const data = useMemo(() => collectionList, [collectionList]);

  const handleDelete = (row) => {
    setSelectedRow(row);
    window.collection_delete_modal.showModal();
    console.log("ROW TO BE DELETED: ", row);
  };

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
    window.collection_edit_modal.showModal();
    console.log("ROW TO BE EDITED: ", row);
  };

  useEffect(() => {
    fetchAllCollections();
  }, [apiTrigger]);

  return (
    <div>
      <Header
        heading="Collections"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
      />
      <div>
        <div className="flex justify-end my-4">
          <Link to={PATHS.adminAddCollection} className="btn btn-accent">
            Add Collections
          </Link>
        </div>
        <ReusableTable
          columns={columns}
          data={data}
          showButtons
          enableDelete
          enableEdit
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {/* edit modal */}
      <dialog id="collection_edit_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-accent">Save Changes </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>

      {/* delete modal */}
      <dialog id="collection_delete_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected collection?
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button
              onClick={() => handleDeleteSubmit()}
              className="btn btn-error"
            >
              Delete
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
      <ToastContainer />
    </div>
  );
};

export default Collection;
