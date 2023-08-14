import Dropzone from "../../Dropzone";

const RequestQuoteForm = () => {
  return (
    <div>
      <dialog id="request_quote_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg text-center">Sourcing request</h3>
          <p className="py-4 text-center">
            Use this form if you have specific product requirements or can't
            find what you are looking for!
          </p>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Tell us about your brand / business to help us find the right
                match.
              </span>
            </label>
            <input
              className=" px-2 py-4 border-[1px] border-base-300 outline-none rounded-md"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Please describe the type of products, or services, you're
                looking for.
              </span>
            </label>
            <input
              className=" px-2 py-4 border-[1px] border-base-300 outline-none rounded-md"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Category</span>
            </label>
            <select
              className="select rounded-md outline outline-base-200"
              name=""
              id=""
            >
              <option selected disabled>
                Select product category
              </option>
              <option value="A">A</option>
              <option value="A">B</option>
              <option value="A">B</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                if you have any customization requirements, please select thhem
                from the options below.
              </span>
            </label>
            <select
              className="select rounded-md outline outline-base-200"
              name=""
              id=""
            >
              <option selected disabled>
                Select customizastion type
              </option>
              <option value="A">A</option>
              <option value="A">B</option>
              <option value="A">B</option>
            </select>
          </div>

          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text">
                Attach reference image, please select
              </span>
            </label>
            <div className="w-1/2">
              <Dropzone />
            </div>
          </div>
          <div className="form-control flex flex-col">
            <label className="label">
              <span className="label-text">
                Please give an indication of quantity required per product (to
                match the right price and supplier)*
              </span>
            </label>
            <select
              className="select rounded-md outline outline-base-200"
              name=""
              id=""
              placeholder="15-100 per SKU"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Destination State</span>
            </label>
            <select className="select rounded-md outline outline-base-200">
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Delivery location type</span>
            </label>
            <select
              placeholder="Select location type"
              className="select rounded-md outline outline-base-200"
            >
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Destination Pin/Zip/Postal Code*
              </span>
            </label>
            <input
              className=" px-2 py-4 border-[1px] border-base-300 outline-none rounded-md"
              type="text"
              name=""
              id=""
            />
          </div>

          <div>
            <h5>Please share your details so we can respond:</h5>
            <p className="tet-xs">Your information is safe with us</p>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Your name</span>
            </label>
            <input
              className=" px-2 py-4 border-[1px] border-base-300 outline-none rounded-md input-xs"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your email</span>
            </label>
            <input
              className=" px-2 py-4 border-[1px] border-base-300 outline-none rounded-md input-xs"
              type="email"
              name=""
              id=""
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your phone</span>
            </label>
            <input
              className=" px-2 py-4 border-[1px] border-base-300 outline-none rounded-md input-xs"
              type="tel"
              name=""
              id=""
            />
          </div>

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary rounded-md">Submit</button>
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default RequestQuoteForm;
