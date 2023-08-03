import PropTypes from "prop-types";
import { getRandomColor } from "../../utils";
import Avatar from "../Avatar";
const AvatarGroup = ({ totalAmount }) => {
  return (
    <div className="avatar-group -space-x-4">
      <Avatar bgColor={getRandomColor()} initials="JC" />
      <Avatar bgColor={getRandomColor()} initials="JC" />
      <Avatar bgColor={getRandomColor()} initials="JC" />
      <Avatar bgColor={getRandomColor()} initials="JC" />
      <Avatar bgColor="bg-base-200" initials={`+${totalAmount}`} />
    </div>
  );
};

AvatarGroup.propTypes = {
  totalAmount: PropTypes.number.isRequired,
};

export default AvatarGroup;
