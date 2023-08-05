import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
const FormInput = ({ label, name, control, errors, ...inputProps }) => {
  return (
    <div className="form-control col-span-1">
      <label htmlFor={name} className="label">
        <span className="label-text">{label}</span>
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            className="input input-primary"
            id={name}
            {...inputProps}
          />
        )}
      />
      {errors[name] && (
        <p className="text-sm text-error mt-2">{errors[name].message}</p>
      )}
    </div>
  );
};

export default FormInput;

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
