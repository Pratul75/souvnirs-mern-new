import PropTypes from "prop-types";
import { nanoid } from "nanoid";

const BrandsCard = ({ imagesList }) => {
  return (
    <div className="grid grid-cols-8 mt-16">
      {imagesList?.map(({ image, alt }) => {
        return (
          <div
            key={nanoid()}
            className="col-span-4 md:col-span-1 flex items-center justify-center p-4 border-[1px] border-base-200"
          >
            <img src={image} alt={alt} />
          </div>
        );
      })}
    </div>
  );
};

BrandsCard.propTypes = {
  imagesList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};

export default BrandsCard;
