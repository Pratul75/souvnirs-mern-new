import { Header, ReusableTable } from "../../../components";
// import CollectionBannerImg from "../../assets/images/collectionBannerImg.png";
import { MultiSelect } from "react-multi-select-component";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
import { ToastContainer } from "react-toastify";
import CollectionBannerImage from "../../../assets/bannerImages/collectionImage.png";
import useCollectionConditions from "./useCollectionConditions";

const CollectionConditions = () => {
  const {
    columns,
    conditionValueList,
    convertArr,
    data,
    deleteCollectionCondition,
    editFormHandler,
    handleChange,
    handleDelete,
    handleEdit,
    handleEditChange,
    handleSubmit,
    selected,
    selectedRow,
    setSelected,
  } = useCollectionConditions();
  return (
    <div>
      <Header
        heading="Collection Conditions"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ipsum is simply dummy text of the printing and typesetting industry.  "
        image={CollectionBannerImage}
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
              className="input input-primary"
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

        <button className="btn btn-primary w-1/2 mt-4 text-white">
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
            enablePagination
            pageSize={10}
            onDelete={handleDelete}
          />
        </div>
      </motion.form>

      {/* edit modal */}
      <dialog id="collection_condition_edit_modal" className="modal">
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
            <button
              type="button"
              onClick={(e) => {
                editFormHandler(e);
              }}
              className="btn btn-primary"
            >
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
