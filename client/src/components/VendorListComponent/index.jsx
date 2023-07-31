import PropTypes from "prop-types";
import Avatar from "../Avatar";
import { getRandomColor } from "../../utils";
const VendorListComponent = ({ firstName, lastName }) => {
  return (
    <div className="w-full p-4 bg-base-100 border-[1px] border-base-300 rounded-xl flex  gap-2 items-center mb-2 ">
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
