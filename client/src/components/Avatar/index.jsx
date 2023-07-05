import PropTypes from "prop-types";

const Avatar = ({ initials, bgColor }) => {
  return (
    <div className="avatar placeholder">
      <div className={`${bgColor} text-neutral-content rounded-full w-8`}>
        <span className="text-md">{initials}</span>
      </div>
    </div>
  );
};

Avatar.propTypes = {
  initials: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default Avatar;
