import { useState } from "react";
import PropTypes from "prop-types";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ScrollAnimationWrapper from "../../ScrollAnimationWrapper";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="col-span-5 md:col-span-2 border">
      <div className="flex justify-between items-center px-4 py-2  bg-primary">
        <h4 className="text-2xl text-white">Daily Deals</h4>
        <div className="flex gap-4">
          <BsFillArrowLeftCircleFill
            onClick={() => prevSlide()}
            className="text-white text-2xl cursor-pointer"
          />
          <BsFillArrowRightCircleFill
            onClick={() => nextSlide()}
            className="text-white text-2xl cursor-pointer"
          />
        </div>
      </div>
      <div className=" h-full flex items-center">{items[currentIndex]}</div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Carousel;
