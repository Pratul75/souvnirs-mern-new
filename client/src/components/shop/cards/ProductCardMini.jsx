import PropTypes from "prop-types";
import Ratings from "../components/Ratings";
import { BiShoppingBag } from "react-icons/bi";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
import { useNavigate } from "react-router-dom";
const ProductCardMini = ({ id, title, price, rating, image, slug }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      animate="animate"
      initial="initial"
      variants={fadeInVariants}
      key={id}
      className="flex justify-between gap-4 bg-base-200 rounded-xl cursor-pointer"
      onClick={() => navigate(`/productInfo/${slug}`)}
    >
      <div className="">
        <img
          style={{
            mixBlendMode: "multiply",
          }}
          src={image}
          alt={title}
        />
      </div>
      <div className="flex flex-col justify-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center justify-between gap-2 rounded-full mt-2">
          <div>
            <p className="text-xl text-primary font-semibold">${price}.00</p>
            <Ratings rating={rating} />
          </div>
          <div>
            <button className="btn btn-circle">
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
};

export default ProductCardMini;
