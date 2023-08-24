import { useForm, Controller } from "react-hook-form";
import Dropzone from "../../Dropzone";

const RequestQuoteForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // You can do something with the form data here
  };

  return (
    <div>
      <dialog id="request_quote_modal" className="modal">
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg text-center">Sourcing request</h3>
          <p className="py-4 text-center">
            Use this form if you have specific product requirements or can't
            find what you are looking for!
          </p>

          {/* Brand / Business Info */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Tell us about your brand / business
              </span>
            </label>
            <Controller
              name="brandInfo"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  className="px-2 py-4 border-[1px] border-base-300 outline-none rounded-md"
                  type="text"
                  {...field}
                />
              )}
            />
            {errors.brandInfo && (
              <p className="text-red-500">{errors.brandInfo.message}</p>
            )}
          </div>

          {/* Product Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Please describe the type of products, or services, you're
                looking for.
              </span>
            </label>
            <Controller
              name="productDescription"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  className="px-2 py-4 border-[1px] border-base-300 outline-none rounded-md"
                  type="text"
                  {...field}
                />
              )}
            />
            {errors.productDescription && (
              <p className="text-red-500">
                {errors.productDescription.message}
              </p>
            )}
          </div>

          {/* Product Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Category</span>
            </label>
            <Controller
              name="productCategory"
              control={control}
              rules={{ required: "Please select a product category" }}
              render={({ field }) => (
                <select
                  className="select rounded-md outline outline-base-200"
                  {...field}
                >
                  <option value="" disabled>
                    Select product category
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              )}
            />
            {errors.productCategory && (
              <p className="text-red-500">{errors.productCategory.message}</p>
            )}
          </div>

          {/* Customization Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select customization type</span>
            </label>
            <Controller
              name="customizationType"
              control={control}
              rules={{ required: "Please select a customization type" }}
              render={({ field }) => (
                <select
                  className="select rounded-md outline outline-base-200"
                  {...field}
                >
                  <option value="" disabled>
                    Select customization type
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              )}
            />
            {errors.customizationType && (
              <p className="text-red-500">{errors.customizationType.message}</p>
            )}
          </div>

          {/* Reference Image */}
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text">
                Attach reference image, please select
              </span>
            </label>
            <div className="border rounded-xl">
              <Dropzone />
            </div>
          </div>

          {/* Quantity Required */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantity required per product</span>
            </label>
            <Controller
              name="quantityRequired"
              control={control}
              rules={{ required: "Please select a quantity" }}
              render={({ field }) => (
                <select
                  className="select rounded-md outline outline-base-200"
                  {...field}
                >
                  <option value="" disabled>
                    Select quantity
                  </option>
                  <option value="15-100">15-100 per SKU</option>
                  <option value="101-500">101-500 per SKU</option>
                  <option value="501-1000">501-1000 per SKU</option>
                </select>
              )}
            />
            {errors.quantityRequired && (
              <p className="text-red-500">{errors.quantityRequired.message}</p>
            )}
          </div>

          {/* Destination State */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Destination State</span>
            </label>
            <Controller
              name="destinationState"
              control={control}
              rules={{ required: "Please select a destination state" }}
              render={({ field }) => (
                <select
                  className="select rounded-md outline outline-base-200"
                  {...field}
                >
                  <option value="" disabled>
                    Select destination state
                  </option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              )}
            />
            {errors.destinationState && (
              <p className="text-red-500">{errors.destinationState.message}</p>
            )}
          </div>

          {/* Delivery Location Type */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Delivery location type</span>
            </label>
            <Controller
              name="deliveryLocationType"
              control={control}
              rules={{ required: "Please select a delivery location type" }}
              render={({ field }) => (
                <select
                  className="select rounded-md outline outline-base-200"
                  {...field}
                >
                  <option value="" disabled>
                    Select location type
                  </option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
              )}
            />
            {errors.deliveryLocationType && (
              <p className="text-red-500">
                {errors.deliveryLocationType.message}
              </p>
            )}
          </div>

          {/* Destination Postal Code */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Destination Pin/Zip/Postal Code*
              </span>
            </label>
            <Controller
              name="destinationPostalCode"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  className="px-2 py-4 border-[1px] border-base-300 outline-none rounded-md"
                  type="text"
                  {...field}
                />
              )}
            />
            {errors.destinationPostalCode && (
              <p className="text-red-500">
                {errors.destinationPostalCode.message}
              </p>
            )}
          </div>

          <div>
            <h5 className="mt-4">
              Please share your details so we can respond:
            </h5>
            <p className="tet-xs">Your information is safe with us</p>
          </div>

          {/* Your Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your name</span>
            </label>
            <Controller
              name="yourName"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  className="px-2 py-4 border-[1px] border-base-300 outline-none rounded-md input-xs"
                  type="text"
                  {...field}
                />
              )}
            />
            {errors.yourName && (
              <p className="text-red-500">{errors.yourName.message}</p>
            )}
          </div>

          {/* Your Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your email</span>
            </label>
            <Controller
              name="yourEmail"
              control={control}
              rules={{
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  className="px-2 py-4 border-[1px] border-base-300 outline-none rounded-md input-xs"
                  type="email"
                  {...field}
                />
              )}
            />
            {errors.yourEmail && (
              <p className="text-red-500">{errors.yourEmail.message}</p>
            )}
          </div>

          {/* Your Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your phone</span>
            </label>
            <Controller
              name="yourPhone"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <input
                  className="px-2 py-4 border-[1px] border-base-300 outline-none rounded-md input-xs"
                  type="tel"
                  {...field}
                />
              )}
            />
            {errors.yourPhone && (
              <p className="text-red-500">{errors.yourPhone.message}</p>
            )}
          </div>

          {/* Submit and Close Buttons */}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary rounded-md">
              Submit
            </button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default RequestQuoteForm;
