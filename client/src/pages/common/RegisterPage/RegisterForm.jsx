import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import SouvnirsLogoImg from "../../../assets/images/souvnirsLogo.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerLevelOneSchema } from "../../../validations";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { BsArrowLeftShort } from "react-icons/bs";
import { decodeToken } from "react-jwt";
import { PATHS } from "../../../Routes/paths";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [levelOneRegisterData, setLevelOneRegisterData] = useState({});
  const [levelTwoRegisterData, setLevelTwoRegisterData] = useState({});
  const [selectedRole, setSelectedRole] = useState({});
  const [query] = useSearchParams();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerLevelOneSchema()),
    defaultValues: {
      option: query.get("sell") == "true" ? "vendor" : "customer",
    },
  });

  const onSubmitFirstLevel = async (data) => {
    console.log("REGISTER DATA: ", data);
    if (data) {
      const levelOnepayload = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        password: data.password,
      };
      setLevelOneRegisterData(levelOnepayload);
      console.log("LEVEL ONE PAYLOAD: ", levelOnepayload);

      if (data.option === "vendor") {
        setSelectedRole("vendor");
        console.log("VENDOR SELECTED");
      }

      if (data.option === "customer") {
        setSelectedRole("customer");
        console.log("CUSTOMER SELECTED");
      }

      return window.register_levelTwo_modal.showModal();
    }
  };

  const onSubmitSecondLevel = async (e) => {
    e.preventDefault();
    // console.log("SECOND LEVEL DATA: ", levelTwoRegisterData);
    try {
      let token;

      if (selectedRole === "vendor") {
        const levelOneResponse = await API_WRAPPER.post(
          "/auth/register/vendor",
          levelOneRegisterData
        );
        if (levelOneResponse?.status === 200) {
          // console.log("LEVEL ONE RESPONSE: ", levelOneResponse?.data);
          token = levelOneResponse?.data?.token;
          console.log("TOKEN: ", token);
          const { id, role } = decodeToken(token);
          // console.log("ROLE AND ID: ", id, role);
          const levelTwoResponse = await API_WRAPPER.post(
            "/store/create-store",
            {
              ...levelTwoRegisterData,
              vendorId: id,
              organization_type: levelTwoRegisterData?.organizationType,
              organization_name: levelTwoRegisterData?.organizationName,
            }
          );
          if (levelTwoResponse.status === 200) {
            // console.log("LEVEL TWO RESPONSE: ", levelTwoResponse?.data);
            localStorage.setItem("role", JSON.stringify(role));
            localStorage.setItem("token", JSON.stringify(token));
            navigate(PATHS.vendorDashboard);
          }
        }
      }

      if (selectedRole === "customer") {
        const payload = { ...levelOneRegisterData, ...levelTwoRegisterData };
        // console.log("PAYLOAD: ", payload);
        console.log("PAYLOAD: ", payload);

        const response = await API_WRAPPER.post(
          "/auth/register/customer",
          payload
        );
        console.log("RESPONSE: ", response?.status);
        if (response?.status === 200) {
          // console.log("RESPONSE OBJECT: ", response.data);
          const { role } = decodeToken(response?.data?.token);
          console.log("ROLE: ", role);
          localStorage.setItem("role", JSON.stringify(role));
          localStorage.setItem("token", JSON.stringify(response?.data?.token));
          navigate(PATHS.customerDashboard);
        }
      }
    } catch (error) {
      // console.log("RegisterForm.jsx", error?.response?.data);
      debouncedShowToast(error?.response?.data, "error");
    }
  };

  const handleSecondLevelHandleChange = (e) => {
    const { name, value } = e.target;
    // console.log("NAME: ", name, "VALUE: ", value);
    setLevelTwoRegisterData({ ...levelTwoRegisterData, [name]: value });
  };

  return (
    <>
      <div className=" w- screen  lg:w-1/2 w-full">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-screen  lg:w-3/4  p-4 bg-base-200 rounded-xl">
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
                  defaultChecked={!query.get("sell")}
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
                  defaultChecked={query.get("sell")}
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
                  defaultValue={"Vishesh"}
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
                  defaultValue={"Bajpayee"}
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
                  defaultValue={"vishesh@souvnirs.com"}
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
                    defaultValue={"Qwerty@123"}
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
              <div className="form-control w-1/2">
                <label className="label" htmlFor="mobile">
                  <span className="label-text">Mobile</span>
                </label>
                <input
                  type="text"
                  className="w-full input bg-transparent border-[1px] border-gray-700 rounded-[4px]"
                  placeholder="enter without country code"
                  defaultValue={"9876543210"}
                  {...register("mobile")}
                />
                {errors.mobile && (
                  <p className="text-red-500">{errors.mobile.message}</p>
                )}
              </div>
            </div>

            {/* row 8 */}
            <div className="flex flex-col mt-5">
              <div className="flex item-center gap-4">
                <div className="form-control">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-error checked:bg-base-200"
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
                onClick={handleSubmit(onSubmitFirstLevel)}
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* second level of registration */}
      <dialog id="register_levelTwo_modal" className="modal w-full">
        <form
          onSubmit={(e) => onSubmitSecondLevel(e)}
          method="dialog"
          className="modal-box w-11/12 max-w-5xl"
        >
          <button
            onClick={() => window.register_levelTwo_modal.close()}
            className="btn"
          >
            <BsArrowLeftShort />
            Back
          </button>
          <h3 className="font-bold text-lg text-center">
            Hi {levelOneRegisterData.firstName}! Complete your profile to
            continue
          </h3>
          <p className="py-4 text-center">
            This is required to ensure a trusted platform for buyers and sellers
          </p>
          <div className="w-full flex px-5 gap-4">
            <div className="form-control w-1/2">
              <label className="label">
                <span className="label-text">Organization name</span>
              </label>
              <input
                onChange={(e) => handleSecondLevelHandleChange(e)}
                className="input input-primary"
                type="text"
                name="organizationName"
                placeholder="Minimum 2 characters"
              />
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="country" className="label">
                <span className="label-text">Country</span>
              </label>
              <select
                onChange={(e) => handleSecondLevelHandleChange(e)}
                className="select-primary select"
                name="country"
                id="country"
              >
                <option defaultChecked value="select country">
                  Select country
                </option>
                <option>India</option>
                <option>United States</option>
                <option>Canada</option>
                <option>Japan</option>
              </select>
            </div>
          </div>

          <div className="w-full flex px-5 gap-4">
            <div className="form-control w-1/2">
              <label htmlFor="city" className="label">
                <span className="label-text">City</span>
              </label>
              <input
                onChange={(e) => handleSecondLevelHandleChange(e)}
                className="input input-primary"
                type="text"
                name="city"
                placeholder="Minimum 2 characters"
              />
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="organization-type" className="label">
                <span className="label-text">Organization Type</span>
              </label>
              <select
                onChange={(e) => handleSecondLevelHandleChange(e)}
                className="select-primary select"
                name="organizationType"
                id="organization-type"
              >
                <option value="" disabled selected>
                  select type
                </option>
                <option value="Digital/Online Retailer">
                  Digital/Online Retailer
                </option>
                <option value="Indipendent Ownner">Indipendent Ownner</option>
                <option value="Multi Channel Retailer">
                  Multi Channel Retailer
                </option>
                <option value="Lifestyle Brand">Lifestyle Brand</option>
                <option value="Wholesellter/Importer">
                  Wholesellter/Importer
                </option>
                <option value="Hotel, Restaurant, Cafe">
                  Hotel, Restaurant, Cafe
                </option>
                <option value="Architect/Interior Designer">
                  Architect/Interior Designer
                </option>
                <option value="Buying Agent">Buying Agent</option>
                <option value="Individual">Individual</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
          <div className="w-full flex px-5 gap-4">
            <div className="form-control w-1/2">
              <label htmlFor="order-type" className="label">
                <span className="label-text">Order Type interested in</span>
              </label>
              <select
                onChange={(e) => handleSecondLevelHandleChange(e)}
                className="select-primary select"
                name="orderTypeInterested"
                id="order-type"
              >
                <option disabled selected>
                  Select type
                </option>
                <option value="Read to ship small quantity">
                  Read to ship small quantity
                </option>
                <option value="Ready to ship large quantity">
                  Ready to ship large quantity
                </option>
                <option value="Made to order medium quantity">
                  Made to order medium quantity
                </option>
                <option value="Made to order large quantity">
                  Made to order large quantity
                </option>
                <option value="Commissioned pieces/projects">
                  Commissioned pieces/projects
                </option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="postal-code" className="label">
                <span className="label-text">Postal/Pin/Zip code</span>
              </label>
              <input
                onChange={(e) => handleSecondLevelHandleChange(e)}
                className="input input-primary"
                type="text"
                name="pinCode"
                placeholder="Minimum 2 characters"
              />
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              onClick={(e) => onSubmitSecondLevel(e)}
              type="button"
              className="bg-gradient-to-r w-1/2 from-[#4C62C3] via-[#F15157] to-[#FE7D43] text-white font-semibold py-3 px-4 hover:shadow-lg rounded-[4px] text-2xl"
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
