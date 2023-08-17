import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineHeart } from "react-icons/ai";
import Ratings from "../components/Ratings";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
import { useNavigate } from "react-router-dom";
const ProductCard = ({
  id,
  title,
  price,
  discountPrice,
  rating,
  image,
  badgeColor,
  badgeText,
  slug,
  isDiscounted,
}) => {
  const [heartColor, setHeartColor] = useState("black");

  // TODO: need to be changed to icons switching instead of colors
  const handleHeartClick = () => {
    if (heartColor === "black") {
      setHeartColor("red");
    } else {
      setHeartColor("black");
    }
  };
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeInVariants}
      animate="animate"
      initial="initial"
      key={id}
      className="card bg-base-200 px-3 py-2 w-full cursor-pointer pb-8"
      onClick={() => navigate(`/productInfo/${slug}`)}
    >
      <div className="card-title flex justify-between">
        <span className={`badge ${badgeColor}`}>{badgeText}</span>
        <button
          className="btn btn-circle bg-base-300 rounded-full"
          onClick={handleHeartClick}
        >
          <AiOutlineHeart className="text-2xl" style={{ color: heartColor }} />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="flex py-4  justify-center">
          <img
            className="w-56"
            style={{
              mixBlendMode: "multiply",
            }}
            src={image}
            alt={title}
          />
        </div>
      </div>
      <div className="flex justify-center flex-col items-center gap-2">
        <h3 className="text-center text-neutral-700 text-base font-medium leading-[25px]">
          {title}
        </h3>
        {isDiscounted ? (
          <h5 className="justify-center flex w-36 items-center gap-4">
            <span className="line-through">${price}</span>
            <span className="text-primary">${discountPrice}</span>
          </h5>
        ) : (
          <h5 className="text-center text-red-600 text-lg font-medium leading-[18px]">
            ${price}
          </h5>
        )}
        <Ratings rating={rating} />
      </div>
    </motion.div>
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
