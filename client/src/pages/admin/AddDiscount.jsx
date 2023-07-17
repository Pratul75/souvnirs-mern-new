import { useState } from "react";
import { Header } from "../../components";

const AddDiscount = () => {
  const [discountData, setDiscountData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiscountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("INPUT STATE: ", discountData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(discountData);
    // Perform submit logic here
  };

  return (
    <div>
      <Header
        heading="Add Discount"
        subheading="This is a sub headinf for add discount section which reminds us to put a brief decsription about Add discounts page"
      />
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mt-4 grid grid-cols-4 gap-4"
      >
        {/* amount of prodcts -> Method */}
        <div className="col-span-3 p-4 bg-base-100 rounded-xl shadow-xl">
          <div className="flex justify-between py-4">
            <h2 className="font-bold">Amount of products</h2>
            <p className="text-gray-400">Product discount</p>
          </div>
          <hr />
          <div>
            <h2 className="py-4 font-bold">Method</h2>
            <div className="form-control flex-row items-center gap-4">
              <input
                className="radio radio-accent"
                type="radio"
                name="method"
                id=""
              />
              <label className="label">
                <span className="label-text">Discount Code</span>
              </label>
            </div>
            <div className="form-control flex-row items-center gap-4">
              <input
                className="radio radio-accent"
                type="radio"
                name="method"
                id=""
              />
              <label className="label">
                <span className="label-text">Automatic Discount</span>
              </label>
            </div>
            <div className="form-control flex flex-row justify-between items-center gap-4">
              <div className="form-control w-full ">
                <label htmlFor="" className="label">
                  <span className="label-text">Discount Code</span>
                </label>
                <input
                  onChange={(e) => handleInputChange(e)}
                  name="discountCode"
                  type="text"
                  className="input input-accent w-full"
                />
              </div>
              <div className="mt-8">
                <button className="btn btn-outline">Generate</button>
              </div>
            </div>
          </div>
        </div>
        {/* summary  */}
        <div className="col-span-1 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="py-4 font-bold">Summary</h2>
          <p className="mb-4">No discount code yet.</p>
          <p>Type and method</p>
          <ul className=" px-4 mb-4 ml-2">
            <li className="list-disc">Amount off products</li>
            <li className="list-disc">Code</li>
          </ul>
          <p>Details</p>
          <ul className="px-4 ml-2">
            <li className="list-disc">Can't combine with discounts</li>
          </ul>
          <hr className="my-4" />
          <div>
            <p>Performance</p>
            <p className="text-gray-400">Discount is not active yet.</p>
          </div>
        </div>
        {/* value -> applies To */}
        <div className="col-span-3 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Value</h2>
          <div className="py-4 flex items-center">
            <div className="join w-full">
              <input
                onChange={(e) => handleInputChange(e)}
                className="join-item btn "
                type="radio"
                name="typeTitle"
                aria-label="Fixed Amount"
              />
              <input
                onChange={(e) => handleInputChange(e)}
                className="join-item btn"
                type="radio"
                name="typeTitle"
                aria-label="Percentage"
              />
            </div>
            <div className="form-control">
              <label className="input-group">
                <input
                  onChange={(e) => handleInputChange(e)}
                  name="amountValue"
                  type="text"
                  placeholder="0.01"
                  className="input input-bordered"
                />
                <span>%</span>
              </label>
            </div>
          </div>
          <hr className="py-4" />
          <div>
            <h2 className="font-bold">Applies To</h2>
            <div className="form-control flex flex-row items-center gap-4 mt-4">
              <input
                onChange={(e) => handleInputChange(e)}
                className="radio radio-accent"
                type="radio"
                name="appliesTo"
                id=""
              />
              <label className="label">
                <span className="label-text">Specific Collections</span>
              </label>
            </div>
            <div className="form-control flex flex-row items-center gap-4">
              <input
                onChange={(e) => handleInputChange(e)}
                className="radio radio-accent"
                type="radio"
                name="appliesTo"
                id=""
              />
              <label className="label">
                <span className="label-text">Specific Products</span>
              </label>
            </div>
            <div className="form-control mt-4">
              <div className="input-group w-full">
                <input
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  placeholder="Search Collections"
                  className="input input-bordered flex-grow"
                />
                <button className="btn btn-square">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* sales channels */}
        <div className="col-span-1 p-4 bg-base-100 rounded-xl shadow-xl">
          <div className="flex justify-between">
            <h2 className="font-bold">Sales Channels </h2>
            <p className="text-gray-400">0 out of 3 selected</p>
          </div>
          <div className="mt-4">
            <div className="form-control flex flex-row items-center gap-4">
              <input
                onChange={(e) => handleInputChange(e)}
                name="salesChannels"
                className="checkbox checkbox-accent"
                type="checkbox"
              />
              <label className="label">
                <span className="label-text">Point on Sale</span>
              </label>
            </div>
            <div className="form-control flex flex-row items-center gap-4">
              <input
                onChange={(e) => handleInputChange(e)}
                name="salesChannels"
                className="checkbox checkbox-accent"
                type="checkbox"
              />
              <label className="label">
                <span className="label-text">Google & YouTube</span>
              </label>
            </div>
            <div className="form-control flex flex-row items-center gap-4">
              <input
                onChange={(e) => handleInputChange(e)}
                name="salesChannels"
                className="checkbox checkbox-accent"
                type="checkbox"
              />
              <label className="label">
                <span className="label-text">Facebook & Instagram</span>
              </label>
            </div>
          </div>
        </div>
        {/* minimum purchase requirements */}
        <div className="col-span-1 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Minimum purchase requirements</h2>
          <div className="mt-4">
            <div className="form-control fflex flex-row gap-4 items-center">
              <input
                onChange={(e) => handleInputChange(e)}
                name="minimumPurchaseRequirements"
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">No minimum requirements</span>
              </label>
            </div>
            <div className="form-control fflex flex-row gap-4 items-center">
              <input
                onChange={(e) => handleInputChange(e)}
                name="minimumPurchaseRequirements"
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">Minimum purchase amount(Rs)</span>
              </label>
            </div>
            <div className="form-control fflex flex-row gap-4 items-center">
              <input
                onChange={(e) => handleInputChange(e)}
                name="minimumPurchaseRequirements"
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">Minimum purchase amount(Rs)</span>
              </label>
            </div>
          </div>
        </div>
        {/* customer eligiblity */}
        <div className="col-span-1 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Customer Eligiblity</h2>
          <div className="mt-4">
            <div className="form-control fflex flex-row gap-4 items-center">
              <input
                onChange={(e) => handleInputChange(e)}
                name="customerEligiblity"
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">All Customers</span>
              </label>
            </div>
            <div className="form-control fflex flex-row gap-4 items-center">
              <input
                onChange={(e) => handleInputChange(e)}
                name="customerEligiblity"
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">Specific customer segments</span>
              </label>
            </div>
            <div className="form-control fflex flex-row gap-4 items-center">
              <input
                onChange={(e) => handleInputChange(e)}
                name="customerEligiblity"
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">Specific customers</span>
              </label>
            </div>
          </div>
        </div>
        {/* maximum discount uses */}
        <div className="col-span-2 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Maximum discount uses</h2>
          <div className="mt-4">
            <div className="form-control flex-row items-center gap-4">
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="maximumDiscountUses"
                onChange={(e) => handleInputChange(e)}
                id="limit-01"
              />
              <label className="label">
                <span className="label-text">
                  Limit number of times this discount can be used in total
                </span>
              </label>
            </div>
            <div className="form-control flex-row items-center gap-4">
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="maximumDiscountUses"
                onChange={(e) => handleInputChange(e)}
                id="limit-02"
              />
              <label className="label">
                <span className="label-text">
                  Limit to one use per customer
                </span>
              </label>
            </div>
          </div>
        </div>
        {/* combinations */}
        <div className="col-span-2 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Combinations</h2>
          <div className="mt-4">
            <p>This product discount can be combined with: </p>
            <div className="form-control flex-row items-center gap-4">
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="combinations"
                onChange={(e) => handleInputChange(e)}
              />
              <label className="label">
                <span className="label-text">Product discounts</span>
              </label>
            </div>
            <div className="form-control flex-row items-center gap-4">
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="combinations"
                onChange={(e) => handleInputChange(e)}
              />
              <label className="label">
                <span className="label-text">Shipping discounts</span>
              </label>
            </div>
          </div>
        </div>
        {/* active dates */}
        <div className="col-span-2 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Active Dates</h2>
          <div className="mt-4 flex  justify-between gap-4">
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Start date</span>
              </label>
              <input className="input input-accent" type="date" />
            </div>
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Start time (IST)</span>
              </label>
              <input className="input input-accent" type="time" />
            </div>
          </div>
          <div className="form-control flex flex-row items-center mt-4 gap-4">
            <input className="checkbox" type="checkbox" name="" id="" />
            <label className="label">
              <span className="label-text ">Set End Date</span>
            </label>
          </div>
        </div>
        {/* submit buttons */}
        <div className="col-span-4 flex gap-4 justify-end items-center mt-4 bg-base-100 p-4 rounded-xl shadow-xl">
          <button className="btn btn-accent flex-grow">Submit</button>
          <button className="btn btn-outline flex-grow">Reset</button>
        </div>
      </form>
    </div>
  );
};

export default AddDiscount;
