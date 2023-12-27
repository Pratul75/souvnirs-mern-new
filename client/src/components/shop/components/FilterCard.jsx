import { useEffect, useState } from "react"; // Import useState
import { nanoid } from "nanoid";
import { Card } from "../../index";
import PropTypes from "prop-types";

const FilterCard = ({ title, heading, filters, onSelect, bulkFilter }) => {
  const [selectedFilters, setSelectedFilters] = useState([]); // State to store selected filters
  const [filterNames, setFiltersNames] = useState({
    Name: "",
    checked: true,
  });

  const handleFilterToggle = (filterName, event) => {
    console.log(
      "bulkFilter==>",
      selectedFilters,
      filterName,
      event?.checked,
      bulkFilter
    );
    setFiltersNames((pre) => ({
      ...pre,
      Name: filterName,
      checked: event?.checked,
    }));
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(
        selectedFilters.filter((filter) => filter !== filterName)
      );
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  };

  useEffect(() => {
    console.log("----____--___>", bulkFilter);
    if (bulkFilter) {
      let inputArray = [
        { key: heading, values: selectedFilters },
        ...bulkFilter,
      ];
      const uniqueEntriesMap = new Map();

      // Iterate through the input array
      inputArray.forEach((entry) => {
        const key = entry.key;
        const values = entry.values;

        // Skip entries with empty values
        if (values.length === 0) {
          return;
        }

        // If the key is not in the map, add it, or if the values length is greater than the stored entry, update the map
        if (
          !uniqueEntriesMap.has(key) ||
          values[0] > uniqueEntriesMap.get(key).values[0]
        ) {
          uniqueEntriesMap.set(key, entry);
        }
      });

      // Convert the map values back to an array
      const resultArray = Array.from(uniqueEntriesMap.values());
      if (!filterNames?.checked) {
        let findInd = resultArray.findIndex((item) => item?.key == heading);
        let valueindex = resultArray[findInd]?.values.findIndex(
          (item) => item == filterNames?.Name
        );
        resultArray[findInd].values.splice(valueindex, 1);
        if (resultArray[findInd].values.length <= 0) {
          resultArray.splice(findInd, 1);
        }
      }
      onSelect(resultArray);
    }
  }, [selectedFilters]);

  return (
    <Card>
      <div className="p-4 border border-r-5 rounded-xl">
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

        <div className="mt-4 h-30 overflow-scroll">
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
                  onChange={(e) => {
                    handleFilterToggle(filter.filterName, e?.target);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
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
  onSelect: PropTypes.func.isRequired, // Add a new prop for handling selected filters
};

export default FilterCard;
