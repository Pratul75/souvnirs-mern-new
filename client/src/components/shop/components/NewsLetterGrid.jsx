import { useState } from "react";
import PropTypes from "prop-types";

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

  return (
    <div className="flex w-full justify-center mx-16">
      <div className="w-3/4 bg-white rounded-lg shadow-md p-6">
        <img
          className="object-cover mb-4"
          src={backgroundImage}
          alt="newsletter"
        />
        <div>
          <h1 className="text-3xl font-semibold mb-2">{heading}</h1>
          <h6 className="text-xs text-gray-500 mb-4">{subheading}</h6>
        </div>
        <div className="flex">
          <input
            className="flex-1 rounded-l-md py-2 px-4 border border-gray-300 focus:outline-none"
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-md py-2 px-4 transition duration-300"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

NewsLetterGrid.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  onSubscribe: PropTypes.func.isRequired,
};

export default NewsLetterGrid;
