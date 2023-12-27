import { useState, useEffect } from "react";
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
  setProductId,
}) => {
  const [heartColor, setHeartColor] = useState();
  const [wishList, setWishList] = useState([]);
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

  const getWishlist = async () => {
    try {
      const getdata = await API_WRAPPER.get("/wishlist/getmywishlist");
      setWishList(getdata?.data?.data?.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const handleHeartClick = (id) => {
    if (heartColor === "black") {
      setHeartColor("red");
      addToWishlist();
    } else {
      setHeartColor("black");
      addToWishlist();
    }
  };

  useEffect(() => {
    const findind = wishList?.findIndex((item) => item?.productId?._id == id);
    if (findind >= 0) {
      setHeartColor("red");
    } else {
      setHeartColor("black");
    }
  }, [id, wishList]);

  return (
    <motion.div
      variants={fadeInVariants}
      animate="animate"
      initial="initial"
      key={id}
      // style={{ border: "1px solid" }}
      className={`card  border px-3 py-4 cursor-pointer w-auto md:w-96  shadow-lg ${clasName}`}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        navigate(`/productInfo/${slug}`);
      }}
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
                handleHeartClick(id);
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
                className="aspect-square h-48"
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
            <h3 className="text-center text-neutral-700 text-base font-medium leading-[25px] h-8 overflow-hidden">
              {title}
            </h3>
            {isDiscounted ? (
              <h5 className="justify-center flex w-36 items-center gap-4 h-6">
                <span className="line-through">${price}</span>
                <span className="text-primary">${discountPrice}</span>
              </h5>
            ) : (
              <h5 className="text-center  text-lg font-medium leading-[18px] h-6">
                {token ? (
                  `₹ ${price}`
                ) : (
                  <Link to={PATHS.register} className="flex gap-4">
                    <span>
                      {Math.ceil(price / 100) * 100 <= 100
                        ? "less than ₹100"
                        : `₹${Math.floor(price / 100) * 100}-${
                            Math.ceil(price / 100) * 100
                          }`}
                      {}
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
            {/* <div className="flex justify-center items-center flex-col gap-4 mt-4">
              <button className="btn btn-primary">Add to Cart</button>
              <button className="btn btn-accent w-32">Buy Now</button>
            </div> */}
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
