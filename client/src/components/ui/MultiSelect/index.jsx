import { useState } from "react";

const MultiSelect = ({ options, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOptions(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <select
      multiple
      className="form-multiselect block w-full mt-1 rounded-md shadow-sm border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      value={selectedOptions}
      onChange={handleOptionChange}
    >
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default MultiSelect;
