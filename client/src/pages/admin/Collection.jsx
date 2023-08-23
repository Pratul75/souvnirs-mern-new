import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
import { Header, ReusableTable } from "../../components";
import { debouncedShowToast, getStatusStyles } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { ToastContainer } from "react-toastify";
import parse from "html-react-parser";
import CollectionBannerImage from "../../assets/bannerImages/collectionImage.png";
const Collection = () => {
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
  return (
    <div>
      <Header
        heading="Collections"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
        image={CollectionBannerImage}
      />
      <div>
        <div className="flex justify-end my-4">
          <Link to={PATHS.adminAddCollection} className="btn btn-primary w-48">
            Add Collections
          </Link>
        </div>
        <ReusableTable
          tableTitle="Collection List"
          columns={columns}
          data={data}
          selectedFlatRows={getFlatRowsData}
          showButtons
          enableDelete
          enableEdit
          enablePagination
          pageSize={10}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {/* edit modal */}
      <dialog id="collection_edit_modal" className="modal">
        <form
          onSubmit={(e) => submitEditedRow(e)}
          method="dialog"
          className="modal-box"
        >
          <h3 className="font-bold text-lg">Hello!</h3>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.title}
                className="input input-primary"
                type="text"
                name="title"
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">description</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.description}
                className="input input-primary"
                type="text"
                name="description"
                id=""
              />
            </div>
            <div className="form-control">
              <div className="label">
                <span>Select Attributes</span>
              </div>
            </div>

            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.status}
                className="select select-primary"
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
            <button type="submit" className="btn btn-primary">
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
