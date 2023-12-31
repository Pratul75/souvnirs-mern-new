import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";
import Avatar from "../../ui/Avatar";

const testimonials = [
  {
    id: 1,
    content: (
      <div className="mx-14 md:mx-36">
        <h1 className="text-center text-4xl mb-10 text-white mt-10">
          {" "}
          Customer Reviews{" "}
        </h1>
        <div className="grid grid-cols-3 gap-4 my-8">
          <div className="col-span-1 hidden md:block border p-4 hover:scale-105 transition ease-in-out duration-300  bg-transparent rounded-xl">
            <p className="p-4 text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              corrupti dolor quos dolores dolorem perferendis laudantium
              voluptatibus
            </p>
            <div className="bg-violet-600 p-4 flex gap-10 rounded-l-full">
              <div className="avatar placeholder">
                <div className="bg-accent text-neutral-content rounded-full w-24">
                  <span className="text-3xl">K</span>
                </div>
              </div>
              <div className="flex flex-col text-white">
                <h2>Merida Swan</h2>
                <p>Chairman</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden md:block border p-4 hover:scale-105 transition ease-in-out duration-300  bg-transparent rounded-xl">
            <p className="p-4 text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              corrupti dolor quos dolores dolorem perferendis laudantium
              voluptatibus
            </p>
            <div className="bg-violet-600 p-4 flex gap-10 rounded-l-full">
              <div className="avatar placeholder">
                <div className="bg-primary text-neutral-content rounded-full w-24">
                  <span className="text-3xl">K</span>
                </div>
              </div>
              <div className="flex flex-col text-white">
                <h2>Merida Swan</h2>
                <p>Chairman</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden md:block border p-4 hover:scale-105 transition ease-in-out duration-300  bg-transparent rounded-xl">
            <p className="p-4 text-white">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              corrupti dolor quos dolores dolorem perferendis laudantium
              voluptatibus
            </p>
            <div className="bg-violet-600 p-4 flex gap-10 rounded-l-full">
              <div className="avatar placeholder">
                <div className="bg-secondary text-neutral-content rounded-full w-24">
                  <span className="text-3xl">K</span>
                </div>
              </div>
              <div className="flex flex-col text-white">
                <h2>Merida Swan</h2>
                <p>Chairman</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="mx-14 md:mx-36">
        <h1 className="text-center text-4xl mb-10 text-white mt-10">
          {" "}
          Customer Reviews{" "}
        </h1>
        <div className="grid grid-cols-3 gap-4 my-4">
          <div className="col-span-3 md:col-span-1 bg-white rounded-xl">
            <p className="p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              corrupti dolor quos dolores dolorem perferendis laudantium
              voluptatibus
            </p>
            <div className="bg-rose-600 hidden  p-4 md:flex gap-10 rounded-l-full">
              <Avatar bgColor="bg-primary" initials="VB" />
              <div className="flex flex-col text-white">
                <h2>Merida Swan</h2>
                <p>Chairman</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden md:block bg-white rounded-xl">
            <p className="p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              corrupti dolor quos dolores dolorem perferendis laudantium
              voluptatibus
            </p>
            <div className="bg-teal-600 p-4 flex gap-10 rounded-l-full">
              <Avatar bgColor="bg-primary" initials="VB" />
              <div className="flex flex-col text-white">
                <h2>Merida Swan</h2>
                <p>Chairman</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden md:block bg-white rounded-xl">
            <p className="p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              corrupti dolor quos dolores dolorem perferendis laudantium
              voluptatibus
            </p>
            <div className="bg-violet-600 p-4 flex gap-10 rounded-l-full">
              <Avatar bgColor="bg-primary" initials="VB" />
              <div className="flex flex-col text-white">
                <h2>Merida Swan</h2>
                <p>Chairman</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="mx-14 md:mx-36">
        <h1 className="text-center text-4xl mb-10 text-white mt-10">
          {" "}
          Customer Reviews{" "}
        </h1>
        <div className="grid grid-cols-3 gap-4 my-4">
          <div className="col-span-3 md:col-span-1 bg-white rounded-xl">
            <p className="p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              corrupti dolor quos dolores dolorem perferendis laudantium
              voluptatibus
            </p>
            <div className="bg-violet-600 hidden  p-4 md:flex gap-10 rounded-l-full">
              <Avatar bgColor="bg-primary" initials="VB" />
              <div className="flex flex-col text-white">
                <h2>Merida Swan</h2>
                <p>Chairman</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden md:block bg-white rounded-xl">
            <p className="p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              corrupti dolor quos dolores dolorem perferendis laudantium
              voluptatibus
            </p>
            <div className="bg-violet-600 p-4 flex gap-10 rounded-l-full">
              <Avatar bgColor="bg-primary" initials="VB" />
              <div className="flex flex-col text-white">
                <h2>Merida Swan</h2>
                <p>Chairman</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden md:block bg-white rounded-xl">
            <p className="p-4">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              corrupti dolor quos dolores dolorem perferendis laudantium
              voluptatibus
            </p>
            <div className="bg-violet-600 p-4 flex gap-10 rounded-l-full">
              <Avatar bgColor="bg-primary" initials="VB" />
              <div className="flex flex-col text-white">
                <h2>Merida Swan</h2>
                <p>Chairman</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const TestimonialsCarousel = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex(
      (prevIndex) => (prevIndex + 1) % testimonials.length
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <ScrollAnimationWrapper>
      <div className="relative h-[350px] my-16">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentTestimonial.id}
            className="w-full flex items-center justify-center rounded-lg shadow-lg bg-gradient-to-r from-violet-700  to-shopPrimaryColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="">
              <p className="text-xl">{currentTestimonial.content}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevTestimonial}
          className="absolute btn btn-circle top-2/3 left-5 transform -translate-y-1/2 px-4 py-2 text-violet-600"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextTestimonial}
          className="absolute btn btn-circle top-2/3 right-5 transform -translate-y-1/2 px-4 py-2 text-violet-600"
        >
          <FaArrowRight />
        </button>
      </div>
    </ScrollAnimationWrapper>
  );
};

export default TestimonialsCarousel;
