import { useState } from "react";
import SouvnirsLogoImg from "../../assets/images/souvnirsLogo.png";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="md:w-1/2 w-full">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-3/4  p-4">
          {/* row 1 */}
          <div className="flex justify-center py-4">
            <img src={SouvnirsLogoImg} alt="Souvnirs Logo" />
          </div>
          {/* row 2 */}
          <div className="flex justify-center gap-2">
            <p>Already have an account?</p>
            <Link
              to={"/login"}
              id="gradient-text"
              className="bg-gradient-to-r from-violet-700 via-red-500 to-yellow-500 text-transparent bg-clip-text underline"
            >
              Sign in here
            </Link>
          </div>
          {/* row 3 */}
          <div className="flex gap-4">
            <div className="flex flex-row items-center gap-4 form-control">
              <span className="text-sm">Please select:</span>
              <input
                type="radio"
                className="radio radio-error"
                name="option"
                id="buy"
              />
              <label className="label" htmlFor="buy">
                <span className="label-text uppercase font-semibold">
                  Buy from Souvnirs
                </span>
              </label>
            </div>
            <div className="flex flex-row items-center gap-4 form-control">
              <input
                type="radio"
                className="radio radio-error"
                name="option"
                id="sell"
              />
              <label className="label" htmlFor="sell">
                <span className="label-text uppercase">Sell on Souvnirs</span>
              </label>
            </div>
          </div>
          {/* row 4 */}
          <div className="flex gap-4 w-full">
            <div className="form-control w-1/2 ">
              <label className="label" htmlFor="firstName">
                <span className="label-text"> First Name</span>
              </label>
              <input
                type="text"
                className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                placeholder="enter here"
              />
            </div>
            <div className="form-control w-1/2 ">
              <label className="label" htmlFor="firstName">
                <span className="label-text"> Last Name</span>
              </label>
              <input
                type="text"
                className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                placeholder="enter here"
              />
            </div>
          </div>
          {/* row 5 */}
          <div className="flex">
            <div className="form-control w-full ">
              <label className="label" htmlFor="firstName">
                <span className="label-text"> Email</span>
              </label>
              <input
                type="text"
                className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                placeholder="ename@companyname.com"
              />
            </div>
          </div>
          {/* row 6 */}
          <div className="flex gap-4">
            {/* row 6 */}
            <div className="form-control w-1/2">
              <label className="label" htmlFor="firstName">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                  placeholder="Minimum 8 characters"
                />
                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="form-control w-1/2  ">
              <label className="label" htmlFor="firstName">
                <span className="label-text">Mobile</span>
              </label>
              <input
                type="text"
                className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                placeholder="enter without country code"
              />
            </div>
          </div>

          {/* row 7 */}
          <div className="flex mt-5">
            <div className="flex justify-center items-center w-1/2 p-4 rounded-[4px] bg-gray-100 border-[2px] border-gray-300">
              <div className="form-control flex flex-row gap-4">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <span>I am not robot</span>
              </div>
            </div>
          </div>
          {/* row 8 */}
          <div className="flex flex-col mt-5">
            <div className="flex item-center gap-4">
              <div className="form-control">
                <input
                  type="checkbox"
                  className="checkbox checkbox-error checked:bg-white"
                />
              </div>
              <p>
                Standard <span className="text-red-400">T&C</span> apply, Please
                check the box to proceed.
              </p>
            </div>
          </div>
          {/* row 9 */}
          <div className="flex flex-col mt-5">
            <div className="flex item-center gap-4">
              <div className="form-control">
                <input type="checkbox" className="checkbox checkbox-error" />
              </div>
              <p>
                I would like to receive emails on new products & offers. (we
                don't spam)
              </p>
            </div>
          </div>
          {/* row 10 */}
          <div className="flex flex-col mt-5">
            <div className="flex item-center gap-4">
              <div className="form-control">
                <input type="checkbox" className="checkbox checkbox-error" />
              </div>
              <p>Happy to receive non promotional Order updastes on Whatsaap</p>
            </div>
          </div>

          <div className="flex mt-5">
            <button className="bg-gradient-to-r w-full from-[#4C62C3] via-[#F15157] to-[#FE7D43] text-white font-semibold py-6 px-8  hover:shadow-lg rounded-[4px] text-2xl">
              CREATE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
