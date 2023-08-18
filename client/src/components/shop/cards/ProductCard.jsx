import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineHeart } from "react-icons/ai";
import Ratings from "../components/Ratings";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
import { useNavigate } from "react-router-dom";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../../features/appConfig/appSlice";
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
  const dispatch = useDispatch();
  const addToWishlist = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await API_WRAPPER.post("/wishlist/create", {
        productId: id,
      });
      if (response.status === 200)
        debouncedShowToast("added to wishlist", "success");
      dispatch(toggleRefresh());
    } else {
      const existingWL = localStorage.getItem("wishlist");
      const i = JSON.parse(existingWL).findIndex((a) => a == id);
      if (i == -1) {
        const updatedwl = [...JSON.parse(existingWL), id];
        localStorage.setItem("wishlist", JSON.stringify(updatedwl));
      }
    }
  };

  // TODO: need to be changed to icons switching instead of colors
  const handleHeartClick = () => {
    if (heartColor === "black") {
      setHeartColor("red");
    } else {
      setHeartColor("black");
    }
    addToWishlist();
  };
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeInVariants}
      animate="animate"
      initial="initial"
      key={id}
      className="card bg-base-200 px-3 py-2 cursor-pointer pb-8 w-96 h-auto"
      onClick={() => navigate(`/productInfo/${slug}`)}
    >
      <div className="card-title flex justify-between">
        <span className={`badge ${badgeColor}`}>{badgeText}</span>
        <button
          className="btn btn-circle bg-base-300 rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            handleHeartClick();
          }}
        >
          <AiOutlineHeart className="text-2xl" style={{ color: heartColor }} />
        </button>
      </div>
      <div className="flex justify-center">
        <div className="flex py-4  justify-center">
          <img
            className="w-[120%]"
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
