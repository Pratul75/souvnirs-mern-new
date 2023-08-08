import { useState } from "react";
import PropTypes from "prop-types";
import { BsCaretDown } from "react-icons/bs";
const SearchableDropdown = ({ items, handleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDropdown = () => {
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
    <div className="dropdown">
      <label
        tabIndex={0}
        className="m-1 btn btn-circle"
        onClick={toggleDropdown}
      >
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
                <a
                  onClick={() => selectItem({ id: item._id, name: item.name })}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SearchableDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default SearchableDropdown;
