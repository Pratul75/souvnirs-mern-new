import { useState } from "react";
import PropTypes from "prop-types";
import { BsCaretDown } from "react-icons/bs";
const SearchableDropdown = ({ items, handleSelect, categoryName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("index.jsx", categoryName);
  const toggleDropdown = (e) => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectItem = (item) => {
    handleSelect(item);
    setIsOpen(false);
  };

  return (
    <div
      onClick={(e) => toggleDropdown(e)}
      className="flex items-center gap-4 justify-between cursor-pointer"
    >
      <p className="font-bold">Selected Category: {categoryName}</p>
      <div className="dropdown">
        <label tabIndex={0} className="m-1 btn btn-circle">
          <BsCaretDown className="text-2xl text-primary" />
        </label>
        {isOpen && (
          <div className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <input
              type="text"
              className="input input-sm input-primary"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <ul tabIndex={0} className="max-h-48 overflow-y-auto">
              {filteredItems.map((item, index) => (
                <li key={index}>
                  <a onClick={() => selectItem(item)}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

SearchableDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default SearchableDropdown;
