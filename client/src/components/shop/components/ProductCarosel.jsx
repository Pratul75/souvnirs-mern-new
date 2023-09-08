import { useState } from "react";
import PropTypes from "prop-types";

import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";
import BannerImage from "../../../../src/assets/bannerImages/banner.jpg";

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
      <div className="flex justify-between h-full">
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
