import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import PropTypes from "prop-types";
const Ratings = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar className="text-yellow-500 text-xl" key={i} />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt className="text-yellow-500 text-xl" key={fullStars} />
      );
    }

    const remainingStars = 5 - stars.length;

    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaRegStar
          className="text-yellow-500 text-xl"
          key={fullStars + (hasHalfStar ? 1 : 0) + i}
        />
      );
    }

    return stars;
  };

  return <div className="flex gap-2">{renderStars()}</div>;
};
Ratings.propTypes = {
  rating: PropTypes.number.isRequired,
};
export default Ratings;
