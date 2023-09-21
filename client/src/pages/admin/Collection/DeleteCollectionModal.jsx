import PropTypes from "prop-types";
const DeleteCollectionModal = ({ deleteHandler }) => {
  return (
    <dialog id="collection_delete_modal" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">
          Are you sure you want to delete the selected collection?
        </p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={() => deleteHandler()} className="btn btn-error">
            Delete
          </button>
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteCollectionModal;
DeleteCollectionModal.propTypes = {
  deleteHandler: PropTypes.func.isRequired,
};
