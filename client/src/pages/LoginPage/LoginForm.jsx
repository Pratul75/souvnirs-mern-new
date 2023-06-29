import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import SouvnirsLogoImg from "../../assets/images/souvnirsLogo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/index";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema()),
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="md:w-1/2 w-full ">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-1/2 p-8  shadow-2xl">
          {/* row 1 */}
          <div className="flex justify-center py-4">
            <img src={SouvnirsLogoImg} alt="" />
          </div>
          {/* row 2 */}
          <div className="flex justify-center gap-2">
            <p>Dont have an account?</p>
            <Link
              to={"/"}
              id="gradient-text"
              className="bg-gradient-to-r from-violet-700 via-red-500 to-yellow-500 text-transparent bg-clip-text underline"
            >
              Sign up here
            </Link>
          </div>
          {/* row 3 */}
          <div className="flex gap-4 w-full">
            <div className="form-control w-full">
              <label className="label" htmlFor="email">
                <span className="label-text">Your Email Address</span>
              </label>
              <input
                type="text"
                id="email"
                {...register("email")}
                className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                placeholder="name@companyname.com"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
          {/* row 4 */}
          <div className="flex gap-4 w-full">
            <div className="form-control w-full">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password")}
                  className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                  placeholder="enter here"
                />
                <div
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>
          {/* row 5  */}
          <div className="flex mt-5">
            <button
              className="bg-gradient-to-r w-full from-[#4C62C3] via-[#F15157] to-[#FE7D43] text-white font-semibold py-2 px-8  hover:shadow-lg rounded-[4px] text-xl"
              onClick={handleSubmit(onSubmit)}
            >
              SUBMIT
            </button>
          </div>
          {/* row 6 */}
          <div>
            <div className="form-control flex items-center gap-5 mt-5 flex-row">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="checkbox heckbox-primary"
                {...register("rememberMe")}
              />
              <label className="label" htmlFor="rememberMe">
                <span className="label-text">Remember me</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
