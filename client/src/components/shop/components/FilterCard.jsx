import { useEffect, useState } from "react"; // Import useState
import { nanoid } from "nanoid";
import Card from "../../Card";
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
  console.log("FilterCard.jsx", selectedFilters);

  useEffect(() => {
    onSelect({ key: heading, values: selectedFilters });
  }, [selectedFilters, heading, onSelect]);

  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-primary text-sm font-bold underline">{title}</h4>
          <h6 className="text-gray-500 underline text-sm">Clear all</h6>
        </div>
        <div className="text-md mt-4">{heading && `Filter By ${heading}`}</div>

        <div className="mt-4">
          {filters.map((filter) => {
            return (
              <div
                key={nanoid()}
                className="form-control flex flex-row items-center gap-4"
              >
                <input
                  className="checkbox checkbox-primary"
                  type="checkbox"
                  name=""
                  id=""
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
