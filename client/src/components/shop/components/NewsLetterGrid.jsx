import { useState } from "react";
import PropTypes from "prop-types";
import ScrollAnimationWrapper from "../../ScrollAnimationWrapper";

const NewsLetterGrid = ({
  backgroundImage,
  heading,
  subheading,
  onSubscribe,
}) => {
  const [email, setEmail] = useState("");

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = () => {
    if (email && onSubscribe) {
      onSubscribe(email);
    }
  };

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <ScrollAnimationWrapper>
      <div className="flex mt-8 md:mt-16 justify-center">
        <div
          className="bg-white rounded-lg shadow-md p-4 md:p-6 w-full md:w-[480px] lg:w-[600px] xl:w-[1200px]"
          style={containerStyle}
        >
          <div className="py-3 md:py-5">
            <h1 className="text-2xl md:text-4xl text-center text-white font-semibold mb-2">
              {heading}
            </h1>
            <h6 className="text-xs md:text-sm text-center text-white mb-4">
              {subheading}
            </h6>
          </div>
          <div className="w-full justify-center flex">
            <div className="flex w-full md:w-1/2">
              <input
                className="flex-1 border-b py-2 px-2 md:px-4 focus:outline-none bg-transparent text-black md:text-white"
                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={handleInputChange}
              />
              <button
                className="border-b text-black md:text-white py-2 px-2 md:px-4 mx-2 md:mx-4 transition duration-300 hover:bg-black hover:text-white"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
};

NewsLetterGrid.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};

export default NewsLetterGrid;
