import { useState } from "react";
import { Header } from "../../components";

const AddDiscount = () => {
  const [discountData, setDiscountData] = useState({});
  const [
    minimumPurchaseAmountInputToggle,
    setMinimumPurchaseAmountInputToggle,
  ] = useState(false);
  const [
    minimumQuantityOfItemsInputToggle,
    setMinimumQuantityOfItemsInputToggle,
  ] = useState(false);
  const [
    specificCustomerSegmentInputToggle,
    setSpecificCustomerSegmentInputToggle,
  ] = useState(false);
  const [specificCustomerInputToggle, setSpecificCustomerInputToggle] =
    useState(false);
  const [showEndDateAndTimeToggle, setShowEndDateAndTimeToggle] =
    useState(false);

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
  };

  const handleEndDateChange = (e) => {
    const { name, value } = e.target;
    const startDate = discountData.activeDate;
    if (startDate && value < startDate) {
      alert("End date cannot be less than start date!");
      return;
    }
    handleInputChange(e);
  };

  return (
    <div>
      <Header
        heading="Add Discount"
        subheading="This is a sub heading for the add discount section which reminds us to put a brief description about the Add Discounts page"
      />
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-4 gap-4">
        {/* amount of products -> Method */}
        <div className="col-span-3 p-4 bg-base-100 rounded-xl shadow-xl">
          <div className="flex justify-between py-4">
            <h2 className="font-bold">Amount of products</h2>
            <p className="text-gray-400">Product discount</p>
          </div>
          <hr />
          <div>
            <div className="form-control flex flex-row items-center gap-4">
              <div className="form-control w-full">
                <label htmlFor="" className="label">
                  <span className="label-text">Discount Title</span>
                </label>
                <input
                  onChange={handleInputChange}
                  name="discountTitle"
                  type="text"
                  className="input input-accent w-full"
                />
              </div>
            </div>
          </div>
        </div>
        {/* customer eligibility */}
        <div className="col-span-1 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Customer Eligibility</h2>
          <div className="mt-4">
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={() => {
                  setSpecificCustomerInputToggle(false);
                  setSpecificCustomerSegmentInputToggle(false);
                }}
                name="eligibilityTitle"
                className="radio radio-accent"
                type="radio"
                value="all-customers"
              />
              <label className="label">
                <span className="label-text">All Customers</span>
              </label>
            </div>
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={() => {
                  setSpecificCustomerSegmentInputToggle(
                    (prevState) => !prevState
                  );
                  setSpecificCustomerInputToggle(false);
                }}
                name="eligibilityTitle"
                value={"specific-customer-segment"}
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">Specific customer segments</span>
              </label>
            </div>
            {specificCustomerSegmentInputToggle && (
              <div>
                <input
                  onChange={handleInputChange}
                  className="input input-accent w-full"
                  type="text"
                  name="eligibilityValue"
                  id="eligibility-value"
                  placeholder="enter SCG value"
                />
              </div>
            )}
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={() => {
                  setSpecificCustomerInputToggle((prevState) => !prevState);
                  setSpecificCustomerSegmentInputToggle(false);
                }}
                name="eligibilityTitle"
                value="specific-customer"
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">Specific customers</span>
              </label>
            </div>
            {specificCustomerInputToggle && (
              <div>
                <input
                  onChange={handleInputChange}
                  className="input input-accent w-full"
                  type="text"
                  name="eligibilityValue"
                  id="eligibility-value"
                  placeholder="enter SCG value"
                />
              </div>
            )}
          </div>
        </div>
        {/* value */}
        <div className="col-span-3 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Value</h2>
          <div className="py-4 grid grid-cols-2 mt-5">
            <div className="join col-span-1 ">
              <input
                onChange={handleInputChange}
                className="join-item btn "
                type="radio"
                name="typeTitle"
                value={"fixedAmount"}
                aria-label="Fixed Amount"
              />
              <input
                onChange={handleInputChange}
                className="join-item btn"
                type="radio"
                name="typeTitle"
                value={"Percentage"}
                aria-label="Percentage"
              />
            </div>
            <div className="form-control col-span-1 w-full">
              <label className="input-group">
                <input
                  onChange={handleInputChange}
                  name="typeValue"
                  type="text"
                  placeholder="0.01"
                  className="input input-bordered w-full" // Added w-full class here
                />
                <span>%</span>
              </label>
            </div>
          </div>
        </div>

        {/* minimum purchase requirements */}
        <div className="col-span-1 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Minimum purchase requirements</h2>
          <div className="mt-4">
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={() => {
                  setMinimumPurchaseAmountInputToggle(false);
                  setMinimumQuantityOfItemsInputToggle(false);
                }}
                name="requirementTitle"
                className="radio radio-accent"
                type="radio"
                value="no-minimum-requirements"
              />
              <label className="label">
                <span className="label-text">No minimum requirements</span>
              </label>
            </div>
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={() => {
                  setMinimumPurchaseAmountInputToggle(
                    (prevState) => !prevState
                  );
                  setMinimumQuantityOfItemsInputToggle(false);
                }}
                name="requirementTitle"
                className="radio radio-accent"
                type="radio"
                value="minimum-purchase-amount"
              />
              <label className="label">
                <span className="label-text">Minimum purchase amount(Rs)</span>
              </label>
            </div>

            {minimumPurchaseAmountInputToggle && (
              <div>
                <input
                  onChange={handleInputChange}
                  className="input input-accent w-full"
                  type="text"
                  name="requirementValue"
                  id="requirement-value"
                  placeholder="enter min purchase amount"
                />
              </div>
            )}
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                onChange={() => {
                  setMinimumQuantityOfItemsInputToggle(
                    (prevState) => !prevState
                  );
                  setMinimumPurchaseAmountInputToggle(false);
                }}
                name="requirementTitle"
                className="radio radio-accent"
                type="radio"
              />
              <label className="label">
                <span className="label-text">Minimum quantity of items</span>
              </label>
            </div>
            {minimumQuantityOfItemsInputToggle && (
              <div>
                <input
                  onChange={handleInputChange}
                  className="input input-accent w-full"
                  type="text"
                  name="requirementValue"
                  id="requirement-value"
                  placeholder="enter min quantity of items"
                />
              </div>
            )}
          </div>
        </div>
        {/* applies to */}
        <div className="col-span-3 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Applies To</h2>
          <div className="mt-4">
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                className="radio radio-accent"
                type="radio"
                name="specifyCollection"
                id="specifyCollection"
              />
              <label className="label">
                <span className="label-text">Specify Collections</span>
              </label>
            </div>
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                className="radio radio-accent"
                type="radio"
                name="specifyCollection"
                id="specifyCollection"
              />
              <label className="label">
                <span className="label-text">Specify Products</span>
              </label>
            </div>
            <div className="form-control flex flex-row gap-4 items-center">
              <input
                className="radio radio-accent"
                type="radio"
                name="specifyCollection"
                id="specifyCollection"
              />
              <label className="label">
                <span className="label-text">Specify Categories</span>
              </label>
            </div>

            <div className="form-control flex mt-4">
              <div className="input-group ">
                <input
                  type="text"
                  placeholder="Search…"
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
        {/* maximum discount uses */}
        <div className="col-span-1  p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Maximum discount uses</h2>
          <div className="mt-4">
            <div className="form-control flex-row items-center gap-4">
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="maximumDiscountUses"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
        {/* active dates */}
        <div className="col-span-3 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Active Dates</h2>
          <div className="mt-4 flex  justify-between gap-4">
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Start date</span>
              </label>
              <input
                onChange={handleInputChange}
                className="input input-accent"
                type="date"
                name="activeDate"
              />
            </div>
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Start time (IST)</span>
              </label>
              <input
                onChange={handleInputChange}
                className="input input-accent"
                type="time"
                name="activeTime"
              />
            </div>
          </div>
          <div className="form-control flex flex-row items-center mt-4 gap-4">
            <input
              onChange={() =>
                setShowEndDateAndTimeToggle((prevState) => !prevState)
              }
              className="checkbox"
              type="checkbox"
              name=""
              id=""
            />
            <label className="label">
              <span className="label-text ">Set End Date</span>
            </label>
          </div>
          {showEndDateAndTimeToggle && (
            <div className="mt-4 flex  justify-between gap-4">
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">End Date</span>
                </label>
                <input
                  onChange={handleEndDateChange}
                  className="input input-accent"
                  type="date"
                  name="endDate"
                />
              </div>
              <div className="form-control flex-grow">
                <label className="label">
                  <span className="label-text">Start Time (IST)</span>
                </label>
                <input
                  onChange={handleInputChange}
                  className="input input-accent"
                  type="time"
                  name="endTime"
                />
              </div>
            </div>
          )}
        </div>

        {/* combinations */}
        <div className="col-span-1 p-4 bg-base-100 rounded-xl shadow-xl">
          <h2 className="font-bold">Combinations</h2>
          <div className="mt-4">
            <p>This product discount can be combined with:</p>
            <div className="form-control flex-row items-center gap-4">
              <input
                className="checkbox checkbox-accent"
                type="checkbox"
                name="combinations"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
              <label className="label">
                <span className="label-text">Shipping discounts</span>
              </label>
            </div>
          </div>
        </div>

        {/* submit buttons */}
        <div className="col-span-4 flex gap-4 justify-end items-center mt-4  border-t-[1px] p-4 ">
          <div className="flex w-1/2 justify-end gap-4 mt-4">
            <button className="btn w-32  btn-accent ">Submit</button>
            <button className="btn w-32  btn-outline ">Reset</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDiscount;
