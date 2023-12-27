import { Header } from "../../../components";
import { GoPlus } from "react-icons/go";
import { ToastContainer } from "react-toastify";
import { Table as ReusableTable } from "../../../components";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { getStatusStyles } from "../../../utils";
import "react-toastify/dist/ReactToastify.css";
import AttributeBannerImage from "../../../assets/bannerImages/attributesImage.png";
import useAttribute from "./useAttribute";
import ReuseTable from "../../../components/ui/Table/ReuseTable";
const Attributes = () => {
  const columns = [
    // {
    //   Header: "Attribute Id",
    //   accessor: "_id",
    // },
    {
      Header: "Attribute Name",
      accessor: "name",
    },
    // {
    //   Header: "Status",
    //   accessor: "status",
    //   Cell: ({ row }) => {
    //     return getStatusStyles(row?.original?.status);
    //   },
    // },
  ];

  const {
    attributesList,
    handleDelete,
    handleDeleteSubmit,
    handleEdit,
    handleEditChange,
    handleFormSubmit,
    selectedRow,
    setSelectedRow,
    setPageSize,
    setPage,
    pageSize,
    page,
    totalPagesShow,
    productLoading,
    SetSearchTex,
    seacrhText,
  } = useAttribute();

  console.log("---->selectedRow", selectedRow);

  return (
    <>
      <Header
        heading="Attribute Management"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. asdasd wda sw3e awe "
        image={AttributeBannerImage}
      />

      <div className="w-full flex justify-end gap-4 mt-8"></div>
      <div className="mt-5">
        <div className="flex justify-end">
          <Link to={PATHS.adminAddAttributes} className="btn btn-primary">
            <GoPlus stroke="1px" size={20} />
            Add Attribute
          </Link>
        </div>
        <ReuseTable
          tableTitle="Attributes List"
          columns={columns}
          data={attributesList}
          showButtons
          enableEdit
          enableDelete
          onEdit={handleEdit}
          onDelete={handleDelete}
          enablePagination
          pageSize={10}
          setPageSizeshow={setPageSize}
          setPageNumber={setPage}
          pageSizeShow={pageSize}
          pageNumber={page}
          totalPagesShow={totalPagesShow}
          productLoading={productLoading}
          SetSearchTex={SetSearchTex}
          seacrhText={seacrhText}
        />

        {/* <ReusableTable
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
        /> */}
        {/* edit modal */}
        <dialog id="attributes_edit_modal" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Edit Attribute</h3>
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Attribute Name</span>
                </label>
                <input
                  defaultValue={selectedRow?.name}
                  onChange={(e) => {
                    setSelectedRow({
                      ...selectedRow,
                      name: selectedRow?.name,
                      status: selectedRow?.status,
                    });
                    handleEditChange(e);
                  }}
                  className="input input-primary"
                  type="text"
                  name="name"
                  id=""
                />
              </div>
              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  defaultValue={selectedRow?.status}
                  onChange={(e) => {
                    setSelectedRow({
                      ...selectedRow,
                      name: selectedRow?.name,
                      status: e.target.value,
                    });
                    handleEditChange(e);
                  }}
                  className="select select-primary"
                  name="status"
                >
                  <option
                    selected={selectedRow?.status === "ACTIVE"}
                    value="ACTIVE"
                  >
                    ACTIVE
                  </option>
                  <option
                    selected={selectedRow?.status === "DEACTIVE"}
                    value="DEACTIVE"
                  >
                    DEACTIVE
                  </option>
                  <option
                    selected={selectedRow?.status === "PENDING"}
                    value="PENDING"
                  >
                    PENDING
                  </option>
                </select>
              </div> */}
            </div>
            <div className="modal-action flex gap-4">
              <button
                type="button"
                onClick={(e) => handleFormSubmit(e)}
                className="btn btn-primary"
              >
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
