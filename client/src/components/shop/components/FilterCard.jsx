import { useEffect, useState } from "react"; // Import useState
import { nanoid } from "nanoid";
import { Card } from "../../index";
import PropTypes from "prop-types";

const FilterCard = ({ title, heading, filters, onSelect }) => {
  const [selectedFilters, setSelectedFilters] = useState([]); // State to store selected filters

  const handleFilterToggle = (filterName) => {
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(
        selectedFilters.filter((filter) => filter !== filterName)
      );
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };

  useEffect(() => {
    onSelect({ key: heading, values: selectedFilters });
  }, [selectedFilters, heading, onSelect]);

  return (
    <Card>
      <div className="p-4 ">
        <div className="flex justify-between items-center ">
          <h4 className="text-primary text-sm font-bold ">
            {heading && `Filter By ${heading}`}
          </h4>
          <h6
            className=" text-gray-500 underline text-sm cursor-pointer"
            onClick={() => {
              setSelectedFilters([]);
            }}
          >
            Clear all
          </h6>
        </div>
        <div className="text-md mt-4"></div>

        <div className="mt-4 h-80 overflow-scroll">
          {filters.map((filter) => {
            return (
              <div
                key={nanoid()}
                className="form-control flex flex-row items-center gap-4"
              >
                <input
                  className="checkbox checkbox-primary"
                  type="checkbox"
                  checked={selectedFilters.includes(filter.filterName)}
                  onChange={() => handleFilterToggle(filter.filterName)}
                />
                <label className="label">
                  <span className="label-text">{filter.filterName}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

FilterCard.propTypes = {
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      filterName: PropTypes.string.isRequired,
      productAmount: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func, // Add a new prop for handling selected filters
};

export default FilterCard;
