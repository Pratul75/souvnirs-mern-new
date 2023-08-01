import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Modal = ({
  id,
  title,
  message,
  inputs,
  defaultValues, // New prop for default values
  onClose,
  onSave,
  showCloseButton = true,
}) => {
  const [inputValues, setInputValues] = useState({});

  // Set default values when the modal is opened
  useEffect(() => {
    setInputValues(defaultValues || {});
  }, [defaultValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(inputValues);
    onClose();
  };
  return (
    <dialog id={id} className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        {inputs.map((input) => (
          input.type === "select" && input.name === "status" ?
            <div className="form-control">
              <label className="label">
                <span className="label-text">{input.label}</span>
              </label>
              <select onChange={handleInputChange} name={input.name} defaultValue={inputValues[input.name]} className="input input-accent">
                <option value="DEACTIVE">DEACTIVE</option>
                <option value="PENDING">PENDING</option>
                <option value="ACTIVE">ACTIVE</option>
              </select>
            </div>

            : <div key={input.name} className="form-control">
              <label className="label">
                <span className="label-text">{input.label}</span>
              </label>
              <input
                className="input input-accent"
                type={input.type}
                name={input.name}
                value={inputValues[input.name] || ""}
                onChange={handleInputChange}
              />
            </div>
        ))}
        <div className="modal-action">
          {showCloseButton && (
            <button className="btn" onClick={onClose}>
              Close
            </button>
          )}
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Modal;
Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  defaultValues: PropTypes.object, // New prop for default values
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
};

Modal.defaultProps = {
  showCloseButton: true,
};
