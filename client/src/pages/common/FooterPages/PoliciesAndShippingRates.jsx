import { Header } from "../../../components";
const PoliciesAndShippingRates = () => {
  return (
    <div className="mt-4">
      <Header
        heading="Policies and Shipping Rates"
        subheading="This section provides brief overview about Policies and Shippin Rates"
      />
      <div className="mt-4">
        <div className="grid grid-cols-2  gap-3">
          <div className=" bg-base-200 rounded-xl p-4 col-span-1 border">
            <h2 className="text-2xl font-semibold">Shipping Address</h2>
            <p>
              Orders are sent to the shipping address entered on the order form.
              Make sure the address you entered is complete and accurate. IKO is
              not responsible for packages that are non-delivered due to
              incorrect shipping addresses. Order fulfillment will take about 10
              to 15 days after the order is placed.
            </p>
          </div>

          <div className=" bg-base-200 rounded-xl p-4 col-span-1 border">
            <h2 className="text-2xl font-semibold">International Buyers</h2>
            <p>
              All orders shipped to countries outside of the U.S. may be subject
              to import taxes, customs duties, and fees that are paid by the
              buyer. The value of payment received cannot be altered to decrease
              international customs fees. Additional charges for customs
              clearance must be paid by the buyer at the time of pick up. We
              have no control over these charges. Customs policies vary widely
              from country to country, and you should contact your local customs
              office for further information. When customs clearance procedures
              are required, it can cause delays beyond our control and beyond
              the original delivery estimates. Feel free to contact your local
              customs office for further information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesAndShippingRates;
