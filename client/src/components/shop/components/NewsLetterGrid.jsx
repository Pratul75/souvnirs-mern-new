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

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="flex mx-16 justify-center mt-4">
      <div
        className="bg-white rounded-lg shadow-md p-6 w-full py-16"
        style={containerStyle}
      >
        <div className="py-5">
          <h1 className="text-4xl text-center text-white font-semibold mb-2">
            {heading}
          </h1>
          <h6 className="text-sm text-center text-white mb-4">{subheading}</h6>
        </div>
        <div className="w-full justify-center flex">
          <div className="flex w-1/2">
            <input
              className="flex-1 border-b py-2 px-4  focus:outline-none bg-transparent text-white"
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={handleInputChange}
            />
            <button
              className="border-b text-white  py-2 px-4 mx-8 transition duration-300 hover:bg-white hover:text-black"
              onClick={handleSubscribe}
            >
              Subscribe
            </button>
          </div>
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
