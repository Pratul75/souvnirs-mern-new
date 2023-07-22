import PropTypes from "prop-types";

const Avatar = ({ initials, bgColor, className, onClick }) => {
  return (
    <div onClick={onClick} className={`avatar placeholder ${className}`}>
      <div className={`${bgColor} text-neutral-content rounded-full w-8`}>
        <span className="text-md">{initials}</span>
      </div>
    </div>
  );
};

Avatar.propTypes = {
  initials: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Avatar;
