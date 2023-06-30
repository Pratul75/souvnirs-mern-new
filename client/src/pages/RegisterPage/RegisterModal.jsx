import { BsArrowLeftShort } from "react-icons/bs";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterModal = () => {
  const schema = yup.object().shape({
    organizationName: yup
      .string()
      .min(2, "Minimum 2 characters")
      .required("Organization name is required"),
    country: yup
      .string()
      .notOneOf(["select country"], "Please select a country"),
    city: yup
      .string()
      .min(2, "Minimum 2 characters")
      .required("City is required"),
    organizationType: yup
      .string()
      .notOneOf(["Organization Type"], "Please select an organization type"),
    orderType: yup
      .string()
      .notOneOf(["select type"], "Please select an order type"),
    postalCode: yup
      .string()
      .min(2, "Minimum 2 characters")
      .required("Postal/Pin/Zip code is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("SUBMITTED DATA: ", data);
    // Add your logic here for form submission
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal w-full">
        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
          <button className="btn">
            <BsArrowLeftShort />
            Back
          </button>
          <h3 className="font-bold text-lg text-center">
            Complete your Profile
          </h3>
          <p className="py-4 text-center">
            This is required to ensure a trusted platform for buyers and sellers
          </p>
          <div className="w-full flex px-5 gap-4">
            <div className="form-control w-1/2">
              <label htmlFor="organization-name" className="label">
                <span className="label-text">Organization name</span>
              </label>
              <input
                className="input input-primary"
                type="text"
                name="organizationName"
                placeholder="Minimum 2 characters"
                {...register("organizationName")}
              />
              {errors.organizationName && (
                <span className="error-message text-error">
                  {errors.organizationName.message}
                </span>
              )}
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="country" className="label">
                <span className="label-text">Country</span>
              </label>
              <select
                className="select-primary select"
                name="country"
                id="country"
                {...register("country")}
              >
                <option defaultChecked value="select country">
                  Select country
                </option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
              {errors.country && (
                <span className="error-message">{errors.country.message}</span>
              )}
            </div>
          </div>

          <div className="w-full flex px-5 gap-4">
            <div className="form-control w-1/2">
              <label htmlFor="city" className="label">
                <span className="label-text">City</span>
              </label>
              <input
                className="input input-primary"
                type="text"
                name="city"
                placeholder="Minimum 2 characters"
                {...register("city")}
              />
              {errors.city && (
                <span className="error-message">{errors.city.message}</span>
              )}
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="organization-type" className="label">
                <span className="label-text">Organization Type</span>
              </label>
              <select
                className="select-primary select"
                name="organizationType"
                id="organization-type"
                {...register("organizationType")}
              >
                <option defaultChecked value="Organization Type">
                  Organization Type
                </option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
              {errors.organizationType && (
                <span className="error-message">
                  {errors.organizationType.message}
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex px-5 gap-4">
            <div className="form-control w-1/2">
              <label htmlFor="order-type" className="label">
                <span className="label-text">Order Type interested in</span>
              </label>
              <select
                className="select-primary select"
                name="orderType"
                id="order-type"
                {...register("orderType")}
              >
                <option defaultChecked value="select type">
                  Select type
                </option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
              {errors.orderType && (
                <span className="error-message">
                  {errors.orderType.message}
                </span>
              )}
            </div>
            <div className="form-control w-1/2">
              <label htmlFor="postal-code" className="label">
                <span className="label-text">Postal/Pin/Zip code</span>
              </label>
              <input
                className="input input-primary"
                type="text"
                name="postalCode"
                placeholder="Minimum 2 characters"
                {...register("postalCode")}
              />
              {errors.postalCode && (
                <span className="error-message">
                  {errors.postalCode.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="bg-gradient-to-r w-1/2 from-[#4C62C3] via-[#F15157] to-[#FE7D43] text-white font-semibold py-3 px-4 hover:shadow-lg rounded-[4px] text-2xl"
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

export default RegisterModal;
