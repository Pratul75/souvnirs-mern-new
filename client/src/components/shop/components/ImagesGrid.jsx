import PropTypes from "prop-types";

const ImagesGrid = ({ imagesData }) => {
  return (
    <div className="grid grid-cols-7 mt-4">
      {imagesData.map(({ image, alt }) => (
        <div key={alt}>
          <img src={image} alt={alt} />
        </div>
      ))}
    </div>
  );
};

ImagesGrid.propTypes = {
  imagesData: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ImagesGrid;
