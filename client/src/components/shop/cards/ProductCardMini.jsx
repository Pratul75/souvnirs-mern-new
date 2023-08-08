import PropTypes from "prop-types";
import Ratings from "../components/Ratings";
import { BiShoppingBag } from "react-icons/bi";
const ProductCardMini = ({ id, title, price, rating, image }) => {
  return (
    <div key={id} className="flex justify-between gap-4">
      <div className="">
        <img src={image} alt={title} />
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center justify-between gap-2 bg-purple-100 p-2 px-4 rounded-full mt-2">
          <div>
            <p className="text-2xl text-primary font-semibold">${price}.00</p>
            <Ratings rating={rating} />
          </div>
          <div>
            <button className="btn btn-circle">
              <BiShoppingBag />
            </button>
          </div>
        </div>
      </div>
    </div>
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
