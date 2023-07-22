import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import SouvnirsLogoImg from "../../../assets/images/souvnirsLogo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../validations";
import { BsArrowLeftShort } from "react-icons/bs";
import API_WRAPPER from "../../../api";
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema()),
  });

  const onSubmit = async (data) => {
    console.log("REGISTER DATA: ", data);
    if (data) {
      const payload = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        password: data.password,
      };
      if (data.option === "vendor") {
        const response = await API_WRAPPER.post(
          `/auth/register/vendor`,
          payload
        );
        console.log("VENDOR RESPONSE: ", response.data);
      }

      if (data.option === "customer") {
        const response = await API_WRAPPER.post(
          "/auth/register/customer",
          payload
        );
        console.log("CUSTOMER RESPONSE: ", response.data);
      }
      const modal = document.getElementById("register_modal");
      modal.style.background = "white";
      modal.showModal();
      return window.register_modal.showModal();
    }
  };

  return (
    <>
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
                  value="customer"
                  {...register("option")}
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
                  value="vendor"
                  {...register("option")}
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
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="form-control w-1/2 ">
                <label className="label" htmlFor="lastName">
                  <span className="label-text"> Last Name</span>
                </label>
                <input
                  type="text"
                  className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                  placeholder="enter here"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            {/* row 5 */}
            <div className="flex">
              <div className="form-control w-full ">
                <label className="label" htmlFor="email">
                  <span className="label-text"> Email</span>
                </label>
                <input
                  type="text"
                  className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                  placeholder="ename@companyname.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            {/* row 6 */}
            <div className="flex gap-4">
              {/* row 6 */}
              <div className="form-control w-1/2">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                    placeholder="Minimum 8 characters"
                    {...register("password")}
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
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="form-control w-1/2  ">
                <label className="label" htmlFor="mobile">
                  <span className="label-text">Mobile</span>
                </label>
                <input
                  type="text"
                  className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                  placeholder="enter without country code"
                  {...register("mobile")}
                />
                {errors.mobile && (
                  <p className="text-red-500">{errors.mobile.message}</p>
                )}
              </div>
            </div>

            {/* row 7 */}
            <div className="flex mt-5">
              <div className="flex justify-center items-center w-1/2 p-4 rounded-[4px] bg-gray-100 border-[2px] border-gray-300">
                <div className="form-control flex flex-row gap-4">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    {...register("checkbox1")}
                  />
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
                  Standard <span className="text-red-400">T&C</span> apply,
                  Please check the box to proceed.
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
                  dont spam)
                </p>
              </div>
            </div>
            {/* row 10 */}
            <div className="flex flex-col mt-5">
              <div className="flex item-center gap-4">
                <div className="form-control">
                  <input type="checkbox" className="checkbox checkbox-error" />
                </div>
                <p>
                  Happy to receive non-promotional Order updates on WhatsApp
                </p>
              </div>
            </div>

            <div className="flex mt-5">
              <button
                className="bg-gradient-to-r w-full from-[#4C62C3] via-[#F15157] to-[#FE7D43] text-white font-semibold py-6 px-8  hover:shadow-lg rounded-[4px] text-2xl"
                onClick={handleSubmit(onSubmit)}
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* modal*/}
      <dialog id="register_modal" className="modal w-full">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <button className="btn">
            <BsArrowLeftShort />
            Back
          </button>
          <h3 className="font-bold text-lg text-center">
            Complete your Profile
          </h3>
          <p className="py-4 text-center">
            this is required to ensure a trusted platform for buyers and sellers
          </p>

          <div className="w-full flex px-5 gap-4">
            <div className="form-control w-1/2">
              <label htmlFor="organization-name" className="label">
                <span className="label-text">Organization name</span>
              </label>
              <input
                className="input input-primary"
                type="text"
                name="organization-name"
                placeholder="minimum 2 chcaracters"
              />
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="organization-name" className="label">
                <span className="label-text">Country</span>
              </label>
              <select className="select-primary select" name="" id="">
                <option defaultChecked value="select country">
                  select country
                </option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </div>
          </div>

          <div className="w-full flex px-5 gap-4">
            <div className="form-control w-1/2">
              <label htmlFor="organization-name" className="label">
                <span className="label-text">City</span>
              </label>
              <input
                className="input input-primary"
                type="text"
                name="organization-name"
                placeholder="minimum 2 characters"
              />
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="organization-name" className="label">
                <span className="label-text">Organization Type</span>
              </label>
              <select className="select-primary select" name="" id="">
                <option defaultChecked value="select country">
                  Organization Type
                </option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </div>
          </div>
          <div className="w-full flex px-5 gap-4">
            <div className="form-control w-1/2">
              <label htmlFor="organization-name" className="label">
                <span className="label-text">Order Type interested in</span>
              </label>
              <select className="select-primary select" name="" id="">
                <option defaultChecked value="select country">
                  select type
                </option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="organization-name" className="label">
                <span className="label-text">Postal/Pin/Zip code</span>
              </label>
              <input
                className="input input-primary"
                type="number"
                name="organization-name"
                placeholder="minimum 2 characters"
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="bg-gradient-to-r w-1/2 from-[#4C62C3] via-[#F15157] to-[#FE7D43] text-white font-semibold py-3 px-4  hover:shadow-lg rounded-[4px] text-2xl"
              onClick={handleSubmit(onSubmit)}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default RegisterForm;
