import PropTypes from "prop-types";
import { getRandomColor } from "../../utils";
import Avatar from "../Avatar";
const AvatarGroup = ({ totalAmount }) => {
  return (
    <div className="avatar-group -space-x-4">
      <Avatar bgColor={getRandomColor()} />
      <Avatar bgColor={getRandomColor()} />
      <Avatar bgColor={getRandomColor()} />
      <Avatar bgColor={getRandomColor()} />
      <div className="avatar placeholder">
        <div className="w-12 bg-base-100 text-neutral-content">
          <span>+{totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

AvatarGroup.propTypes = {
  totalAmount: PropTypes.number.isRequired,
};

export default AvatarGroup;
