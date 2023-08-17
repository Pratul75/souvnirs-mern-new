import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const imageUrls = [
  "https://via.placeholder.com/1980x1080",
  "https://via.placeholder.com/1980x1080",
  "https://via.placeholder.com/1980x1080",
];

const TestimonialsCarosel = () => {
  // current index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // next image toggle
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };
  // previous image toggle
  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  return (
    <div className="relative h-[350px] mt-16">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentImageIndex}
          src={imageUrls[currentImageIndex]}
          alt={`Image ${currentImageIndex}`}
          className="w-full h-full object-cover rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <button
        onClick={prevImage}
        className="absolute btn btn-circle top-1/2 left-5 transform -translate-y-1/2 px-4 py-2  text-white"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextImage}
        className="absolute btn btn-circle top-1/2 right-5 transform -translate-y-1/2 px-4 py-2  text-white"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default TestimonialsCarosel;
