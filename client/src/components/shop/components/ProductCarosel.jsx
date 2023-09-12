import { useState } from "react";
import PropTypes from "prop-types";

import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + items.length) % items.length);
  };

  return (
    <ScrollAnimationWrapper>
      <div className="flex flex-col justify-between h-full border-2 border-shopPrimaryColor">
        <div className="bg-shopPrimaryColor text-white py-4  px-2 border-2 border-shopPrimaryColor">
          <h1>Daily Deals</h1>
        </div>
        <div className="col-span-5 md:col-span-2 border mt-8">
          <div className="flex justify w-full">{items[currentIndex]}</div>
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Carousel;
