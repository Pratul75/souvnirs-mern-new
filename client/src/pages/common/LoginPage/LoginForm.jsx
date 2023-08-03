import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { ToastContainer } from "react-toastify";
import { decodeToken } from "react-jwt";
import { PATHS } from "../../../Routes/paths";
import { getLoginInfo } from "../../../features/appConfig/appSlice";
import { useDispatch } from "react-redux";
import SouvnirsLogoImg from "../../../assets/images/souvnirsLogo.png";
import { CiMail } from "react-icons/ci";
import { PiPasswordLight } from "react-icons/pi";
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      debouncedShowToast("Email is required", "error");
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      debouncedShowToast("Password is required", "error");
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) return;
      const response = await API_WRAPPER.post("/auth/login", formData);
      if (response.status === 200) {
        const token = response?.data?.token;
        const { id, role } = decodeToken(token);
        console.log("DECODED TOKEN OBJECTS: ", { id, role });
        debouncedShowToast("You are logged in", "success");

        if (response?.data) {
          localStorage.setItem("role", JSON.stringify(role));

          if (response?.data?.token) {
            console.log("LoginForm.jsx", role);
            dispatch(getLoginInfo(role));
            localStorage.setItem("token", JSON.stringify(token));
            return navigate(PATHS.adminDashboard);
          }
        }
      }
    } catch (error) {
      console.error("Error while logging in:", error);
      debouncedShowToast(error.response.data.error, "error");
    }
  };

  return (
    <div className="w-screen lg:w-1/2">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full p-8 ">
          <div className="flex justify-center py-4 mb-5 md:mb-0 ">
            <img className="w-56" src={SouvnirsLogoImg} alt="" />
          </div>

          <form onSubmit={onSubmit}>
            <div className="flex gap-4 w-full">
              <div className="form-control w-full">
                <div className="flex gap-4 justify-center  items-center">
                  <label className="label" htmlFor="email">
                    <CiMail className="text-5xl" />
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-3/4 input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                    placeholder="name@companyname.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <div className="form-control w-full flex flex-col justify-center items-center">
                <div className="flex justify-center gap-4 w-full items-center relative">
                  <label className="label" htmlFor="password">
                    {/* <span className="label-text">Password</span> */}
                    <PiPasswordLight className="text-5xl" />
                  </label>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-3/4 input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                    placeholder="enter password here"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                  <div
                    className="absolute right-[3.5vw] top-5 cursor-pointer"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="form-control flex items-center gap-5 mt-5 flex-row md:ml-12">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  className="checkbox heckbox-primary"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({ ...formData, rememberMe: e.target.checked })
                  }
                />
                <label className="label" htmlFor="rememberMe">
                  <span className="label-text">Remember me</span>
                </label>
              </div>
            </div>
            <div className="flex mt-5">
              <button
                type="submit"
                className="bg-gradient-to-r w-full from-[#4C62C3] via-[#F15157] to-[#FE7D43] text-white font-semibold py-2 px-8  hover:shadow-lg rounded-[4px] text-xl mx-11"
              >
                SUBMIT
              </button>
            </div>
          </form>

          <div className="flex justify-center gap-2">
            <p>Dont have an account?</p>
            <Link
              to={"/register"}
              id="gradient-text"
              className="bg-gradient-to-r from-violet-700 via-red-500 to-yellow-500 text-transparent bg-clip-text underline"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
