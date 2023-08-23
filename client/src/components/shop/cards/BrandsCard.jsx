import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import ScrollAnimationWrapper from "../../ScrollAnimationWrapper";

const BrandsCard = ({ imagesList }) => {
  return (
    <ScrollAnimationWrapper>
      <div className="grid grid-cols-8 my-16">
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
    </ScrollAnimationWrapper>
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
