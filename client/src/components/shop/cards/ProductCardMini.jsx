import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import Ratings from "../components/Ratings";
import { fadeInVariants } from "../../../animation";

const ProductCardMini = ({
  id,
  title,
  price,
  rating,
  image,
  slug,
  showBorder,
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <motion.div
      variants={fadeInVariants}
      animate="animate"
      initial="initial"
      className={`${
        showBorder ? "border" : ""
      } rounded-xl w-full bg-base-100 shadow-xl`}
      onClick={() => navigate(`/productInfo/${slug}`)}
    >
      <div className="flex items-center p-4">
        <div className="w-20">
          <img className="object-cover w-full h-full" src={image} alt={title} />
        </div>
        <div className="flex flex-col justify-between ml-4">
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <Ratings rating={rating} />
            <p className="text-lg text-primary font-semibold">
              {token ? `$${price}` : "Login to reveal price"}
            </p>
          </div>
          <div className="flex gap-2 mt-2">
            <button className="btn btn-circle btn-ghost bg-rose-200">
              <AiOutlineHeart />
            </button>
            <button className="btn btn-circle btn-ghost bg-base-200">
              <BiShoppingBag />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

ProductCardMini.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  showBorder: PropTypes.bool,
};

export default ProductCardMini;
