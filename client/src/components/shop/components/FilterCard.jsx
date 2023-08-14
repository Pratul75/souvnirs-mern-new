import { nanoid } from "nanoid";
import Card from "../../Card";
import PropTypes from "prop-types";

const FilterCard = ({ title, heading, filters }) => {
  return (
    <Card>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-primary text-sm font-bold underline">{title}</h4>
          <h6 className="text-gray-500 underline text-sm">Clear all</h6>
        </div>
        <div className="text-md mt-4">{heading && heading}</div>
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
};

export default FilterCard;
