import { useState } from "react";
import PropTypes from "prop-types";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
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
    <div className="flex justify-between">
      <ScrollAnimationWrapper>
        <div className="col-span-5 md:col-span-2 border mt-8">
          <div className="flex justify w-full">{items[currentIndex]}</div>
        </div>
      </ScrollAnimationWrapper>
      <div className=" w-full h-72  mt-8 pr-20">
        <img className=" h-full w-full  object-cover " src={BannerImage} />
      </div>
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Carousel;
