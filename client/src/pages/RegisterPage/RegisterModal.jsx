import { BsArrowLeftShort } from "react-icons/bs";

const RegisterModal = () => {
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
      ;
    </>
  );
};

export default RegisterModal;
