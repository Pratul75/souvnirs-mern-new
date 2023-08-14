import { BiSolidOffer } from "react-icons/bi";
import ShopBanner from "../../assets/shop/bannerImages/shopBanner.png";
import Banner from "./Banner";

const Checkout = () => {
  return (
    <div>
      <Banner
        bannerImage={ShopBanner}
        navigation={"Home/Checkout"}
        text={"Checkout"}
      />
      <div className="mx-16">
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="col-span-3 bg-base-200 p-4 rounded-xl">
            <h1 className="font-semibold tect-2xl my-4">Delivery Address </h1>
            <div className="flex gap-4">
              <div className="bg-base-100 rounded-xl w-full p-4 flex justify-between">
                <div className="flex gap-4">
                  <input
                    className="radio radio-primary "
                    type="radio"
                    name=""
                    id=""
                  />
                  <div>
                    <p className="">Jack Joans</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur recusandae obcaecati nulla reprehenderit
                      blanditiis earum aliquid. Necessitatibus molestias id nisi
                      dignissimos tenetur minima, aut delectus voluptates quia,
                      magni, libero perspiciatis.
                    </p>
                  </div>
                </div>
                <p className="badge badge-primary">Home</p>
              </div>
              <div className="bg-base-100 rounded-xl w-full p-4 flex justify-between">
                <div className="flex gap-4">
                  <input
                    className="radio radio-primary "
                    type="radio"
                    name=""
                    id=""
                  />
                  <div>
                    <p className="">Jack Joans</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Consectetur recusandae obcaecati nulla reprehenderit
                      blanditiis earum aliquid. Necessitatibus molestias id nisi
                      dignissimos tenetur minima, aut delectus voluptates quia,
                      magni, libero perspiciatis.
                    </p>
                  </div>
                </div>
                <p className="badge badge-primary">Work</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-base-200 p-4 rounded-xl">
            <div className="py-4">
              <h4>Order Summary</h4>
              <hr className="my-4" />
              <div className="border-b">
                <div className="flex justify-between w-full my-4">
                  <span className="text-xs">Bell Pepper X 1</span>
                  <span className="text-xs"> $32.00</span>
                </div>
                <div className="flex justify-between w-full my-4">
                  <span className="text-xs">Egg Plant X 3</span>
                  <span className="text-xs"> $11.45</span>
                </div>
                <div className="flex justify-between w-full my-4">
                  <span className="text-xs">Onion X 4</span>
                  <span className="text-xs"> $12.45</span>
                </div>
                <div className="flex justify-between w-full my-4">
                  <span className="text-xs">Potato X 3</span>
                  <span className="text-xs"> $3.45</span>
                </div>
                <div className="flex justify-between w-full my-4">
                  <span className="text-xs"> Broccoli X 2</span>
                  <span className="text-xs"> $2.45</span>
                </div>
              </div>
              <div className="my-4 flex justify-between">
                <span className="text-sm">Sub Total</span>
                <span className="text-sm">$111.45</span>
              </div>
              <div className="my-4 flex justify-between">
                <span className="text-sm">Shipping</span>
                <span className="text-sm">$8.00</span>
              </div>
              <div className="my-4 flex justify-between">
                <span className="text-sm font-semibold text-primary">
                  Coupon Discount
                </span>
                <span className="text-sm font-semibold text-primary">
                  -$8.00
                </span>
              </div>
              <hr className="my-4" />
              <div className="my-4 flex justify-between">
                <span className="text-sm font-semibold">Total (USD)</span>
                <span className="text-sm font-semibold">$90</span>
              </div>
            </div>
          </div>

          <div className="col-span-3 p-4 bg-base-200 rounded-xl">
            <h1 className=" font-semibold my-4">Delivery Options </h1>
            <div className="flex gap-4">
              <div className="bg-base-100 rounded-xl w-full p-4">
                <div className="form-control flex flex-row items-center  gap-4">
                  <input type="radio" className="radio radio-primary" />
                  <label className="label">
                    <span className="label-text">
                      Standard Delivery Options
                    </span>
                  </label>
                </div>
              </div>
              <div className="bg-base-100 rounded-xl w-full p-4">
                <div className="form-control flex flex-row items-center  gap-4">
                  <input type="radio" className="radio radio-primary" />
                  <label className="label">
                    <span className="label-text">Future Delivery Options</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 p-4 bg-base-200 rounded-xl">
            <h2 className="text-sm flex gap-4">
              <BiSolidOffer className="text-2xl" />
              Available Offers
            </h2>
            <ul className="menu flex flex-col gap-1">
              <li className="list-disc text-[8px]">
                Combo: BB Royal Almond/Badam Californian, Extra Bold 100 gm...
              </li>
              <li className="list-disc text-[8px]">
                Combo: Royal Cashew Californian, Extra Bold 100 gm + BB Royal
                Honey 500 gm
              </li>
            </ul>
            <div>
              <button className="btn btn-primary w-full">Place Order</button>
            </div>
          </div>

          <div className="col-span-3 p-4 bg-base-200 rounded-xl">
            <h1 className="font-semibold my-4">Payment Options</h1>
            <div className="collapse bg-base-100 mt-4">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium gap-4 flex items-center">
                <input
                  className="radio radio-primary"
                  type="radio"
                  name=""
                  id=""
                />
                <h1 className="text-sm">Cash On Delivery</h1>
              </div>
              <div className="collapse-content">
                <p>
                  Pay digitally with SMS Pay Link. Cash may not be accepted in
                  COVID restricted areas. Know more.
                </p>
              </div>
            </div>
            <div className="collapse bg-base-100 mt-4">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium gap-4 flex items-center">
                <input
                  className="radio radio-primary"
                  type="radio"
                  name=""
                  id=""
                />
                <h1 className="text-sm">Credit or Debit Card</h1>
              </div>
              <div className="collapse-content">
                <p>
                  Pay digitally with SMS Pay Link. Cash may not be accepted in
                  COVID restricted areas. Know more.
                </p>
              </div>
            </div>
            <div className="collapse bg-base-100 mt-4">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium gap-4 flex items-center">
                <input
                  className="radio radio-primary"
                  type="radio"
                  name=""
                  id=""
                />
                <h1 className="text-sm">Net Banking</h1>
              </div>
              <div className="collapse-content">
                <p>
                  Pay digitally with SMS Pay Link. Cash may not be accepted in
                  COVID restricted areas. Know more.
                </p>
              </div>
            </div>
            <div className="collapse bg-base-100 mt-4">
              <input type="checkbox" />
              <input
                className="radio radio-primary"
                type="radio"
                name=""
                id=""
              />
              <div className="collapse-title text-xl font-medium gap-4 flex items-center">
                <input
                  className="radio radio-primary"
                  type="radio"
                  name=""
                  id=""
                />
                <h1 className="text-sm">My Wallet</h1>
              </div>
              <div className="collapse-content">
                <p>
                  Pay digitally with SMS Pay Link. Cash may not be accepted in
                  COVID restricted areas. Know more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
