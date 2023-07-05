import PropTypes from "prop-types";
import Avatar from "../Avatar";
import { getRandomColor } from "../../../utils";
const VendorListComponent = ({ firstName, lastName }) => {
  return (
    <div className="w-full p-4 bg-base-200 rounded-xl flex  gap-2 items-center">
      <div>
        <Avatar
          bgColor={getRandomColor()}
          initials={`${firstName[0]}${lastName[0]}`}
        />
      </div>
      <div>
        <h3>
          {firstName} {lastName}
        </h3>
      </div>
    </div>
  );
};

VendorListComponent.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default VendorListComponent;
