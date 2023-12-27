import { Header, ReusableTable } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { ToastContainer } from "react-toastify";

import CollectionBannerImage from "../../../assets/bannerImages/collectionImage.png";
import { useCollection } from "./useCollection";
import DeleteCollectionModal from "./DeleteCollectionModal";
import ReuseTable from "../../../components/ui/Table/ReuseTable";

const Collection = () => {
  const {
    columns,
    data,
    selectedRow,
    getFlatRowsData,
    handleDelete,
    handleDeleteSubmit,
    handleEdit,
    handleEditChange,
    submitEditedRow,
    setPageSize,
    setPage,
    pageSize,
    page,
    totalPagesShow,
    productLoading,
    SetSearchTex,
    seacrhText,
  } = useCollection();
  const navigate = useNavigate();

  const handleShow = (row) => {
    navigate(`${PATHS.adminCollectionDetails}/${row?.title}`);
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
          <Link
            to={PATHS.adminAddProductToCollection}
            className="btn btn-primary ml-4"
          >
            Add Product to collection
          </Link>
        </div>
        {/* <ReusableTable
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
        /> */}
        <ReuseTable
          tableTitle="Collection List"
          columns={columns}
          data={data}
          showButtons
          enableEdit
          enableShowDetials
          enableDelete
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShow={handleShow}
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
      {/* delete collection modal */}
      <DeleteCollectionModal deleteHandler={handleDeleteSubmit} />

      <ToastContainer />
    </div>
  );
};

export default Collection;
