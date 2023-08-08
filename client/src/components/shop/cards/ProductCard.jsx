import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineHeart } from "react-icons/ai";
import Ratings from "../components/Ratings";

const ProductCard = ({
  id,
  title,
  price,
  discountPrice,
  rating,
  image,
  badgeColor,
  badgeText,
}) => {
  const [heartColor, setHeartColor] = useState("black"); // Initial color

  const handleHeartClick = () => {
    if (heartColor === "black") {
      setHeartColor("red");
    } else {
      setHeartColor("black");
    }
  };

  return (
    <div
      key={id}
      className="card bg-base-300 p-4 hover:scale-105 transition-all ease-in-out cursor-pointer"
    >
      <div className="card-title flex justify-between">
        <span className={`badge ${badgeColor}`}>{badgeText}</span>
        <button className="btn btn-circle" onClick={handleHeartClick}>
          <AiOutlineHeart className="text-2xl" style={{ color: heartColor }} />
        </button>
      </div>
      <div className="flex py-4  justify-center">
        <img
          style={{
            mixBlendMode: "multiply",
          }}
          className="py-2"
          src={image}
          alt={title}
        />
      </div>
      <div>
        <h3 className="text-2xl">{title}</h3>
        <h5>
          <span className="text-primary">{discountPrice}</span> - {price}
        </h5>
        <Ratings rating={rating} />
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discountPrice: PropTypes.number,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  badgeColor: PropTypes.string.isRequired,
  badgeText: PropTypes.string.isRequired,
};

export default ProductCard;
