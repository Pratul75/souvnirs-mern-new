import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineHeart } from "react-icons/ai";
import Ratings from "../components/Ratings";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
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
    <motion.div
      variants={fadeInVariants}
      animate="animate"
      initial="initial"
      key={id}
      className="card bg-base-200 px-3 py-2 w-full"
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
          src={image}
          alt={title}
        />
      </div>
      <div className="flex justify-center flex-col items-center gap-2">
        <h3 className="text-[16px] text-center">{title}</h3>
        <h5 className="justify-center flex w-36 items-center">
          <span className="text-primary">{discountPrice}</span> {price}
        </h5>
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
