import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineHeart, AiOutlineLogin } from "react-icons/ai";
import Ratings from "../components/Ratings";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
import { Link, useNavigate } from "react-router-dom";
import API_WRAPPER, { baseUrl } from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { useDispatch } from "react-redux";
import { toggleRefresh } from "../../../features/appConfig/appSlice";
import { PATHS } from "../../../Routes/paths";

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
  isLoading,
  clasName,
}) => {
  const [heartColor, setHeartColor] = useState("black");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(price);

  const token = localStorage.getItem("token");

  const addToWishlist = async () => {
    if (token) {
      const response = await API_WRAPPER.post("/wishlist/create", {
        productId: id,
      });
      if (response.status === 200)
        debouncedShowToast("added to wishlist", "success");
      dispatch(toggleRefresh());
    } else {
      const existingWL = localStorage.getItem("wishlist");
      if (existingWL) {
        const i = JSON.parse(existingWL).findIndex((a) => a === id);
        if (i === -1) {
          const updatedwl = [...JSON.parse(existingWL), id];
          localStorage.setItem("wishlist", JSON.stringify(updatedwl));
        }
      } else {
        localStorage.setItem("wishlist", JSON.stringify([id]));
      }
    }
  };

  const handleHeartClick = () => {
    if (heartColor === "black") {
      setHeartColor("red");
    } else {
      setHeartColor("black");
    }
    addToWishlist();
  };

  return (
    <motion.div
      variants={fadeInVariants}
      whileHover={{
        scale: 1.05,
      }}
      animate="animate"
      initial="initial"
      key={id}
      className={`card  border  px-3 py-4 cursor-pointer w-96  shadow-lg ${clasName}`}
      onClick={() => navigate(`/productInfo/${slug}`)}
    >
      {isLoading ? (
        // Skeleton layout
        <div className="skeleton-layout">
          {/* Your skeleton layout goes here */}
        </div>
      ) : (
        // Actual card content
        <>
          <div className="card-title flex justify-between">
            <span className={`badge ${badgeColor}`}>{badgeText}</span>
            <button
              className="btn btn-circle bg-base-200 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleHeartClick();
              }}
            >
              <AiOutlineHeart
                className="text-2xl"
                style={{ color: heartColor }}
              />
            </button>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex py-4 justify-center w-2/3">
              <img
                className="aspect-square"
                style={{
                  mixBlendMode: "multiply",
                }}
                src={
                  !image?.includes("res.cloudinary") &&
                  !image?.includes("cdn.shopify")
                    ? `${baseUrl}/${image}`
                    : image
                }
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
              <h5 className="text-center  text-lg font-medium leading-[18px]">
                {token ? (
                  `₹ ${price}`
                ) : (
                  <Link to={PATHS.register} className="flex gap-4">
                    <span>
                      ${Math.floor(price / 100) * 100}-
                      {Math.ceil(price / 100) * 100}
                    </span>{" "}
                    {/* Not needed if showing range */}
                    {/* <AiOutlineLogin
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer"
                    /> */}
                  </Link>
                )}
              </h5>
            )}
            <Ratings rating={rating} />
          </div>
        </>
      )}
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
  isLoading: PropTypes.bool,
};

export default ProductCard;
