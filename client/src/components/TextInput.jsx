import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const TextInput = ({ label, name, rules, placeholder, isRequired }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={name} className="text-gray-700 mb-2 text-[14px]">
        {label}
        {isRequired && <span>*</span>}
      </label>
      <input
        placeholder={placeholder}
        {...register(name, rules)}
        className={`border-[#19191999] border-[1px] rounded-[4px] px-6 py-4 focus:outline-none flex-grow ${
          errors[name] ? "border-red-500" : "border-gray-300"
        }`}
        style={{ "::placeholder": { color: "#757575" } }}
      />

      {errors[name] && (
        <p className="text-red-500 text-[16px] font-thin mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
};

export default TextInput;
