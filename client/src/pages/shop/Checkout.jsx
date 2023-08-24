import { BiSolidOffer } from "react-icons/bi";
import ShopBanner from "../../assets/shop/bannerImages/checkoutBaner.png";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import { Card } from "../../components";
import { RxCross2 } from "react-icons/rx";
import { nanoid } from "nanoid";
import Axios from "axios";

const Checkout = () => {
  const [items, setItems] = useState();
  const [address, setAddress] = useState();
  const [addresses, setAddresses] = useState();
  const [apiTrigger, setApiTrigger] = useState(false);
  const getCheckedOutItems = async () => {
    const response = await API_WRAPPER.get("/checkedout");
    console.log(response);
    setItems(response.data);
  };
  const getAddresses = async () => {
    const response = await API_WRAPPER.get("/getCustomerAddress");
    console.log(response);
    setAddresses(response.data);
  };
  const addAddress = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.post("/addCustomerAddress", address);
    console.log(response);
    setApiTrigger((a) => !a);
    address_modal.close();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getCheckedOutItems();
  }, []);

  useEffect(() => {
    getAddresses();
  }, [apiTrigger]);
  console.log("Checkout.jsx", address);

  const paymentHandler = async (e) => {
    e.preventDefault();
    const orderUrl = `http://localhost:8080/order/create`;
    const response = await API_WRAPPER.post(orderUrl);
    const { data } = response;
    const options = {
      key: "rzp_live_80LvVdqLPUaiKR",
      name: "Souvnirs",
      description: "Some Description",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `http://localhost:8080/order/capture/${paymentId}`;
          const captureResponse = await Axios.post(url, {});
          console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <Banner
        bannerImage={ShopBanner}
        navigation={"Home/Checkout"}
        text={"Checkout"}
      />
      <div className="my-8">
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="col-span-3 bg-base-200 p-4 rounded-xl">
            <h1 className="font-semibold tect-2xl my-4">
              Delivery Address
              <button
                onClick={() => {
                  address_modal.showModal();
                }}
                className="mx-5 cursor-pointer bg-gray-300 py-2 px-5 rounded-3xl"
              >
                Add New
              </button>{" "}
            </h1>
            <div className="flex gap-4">
              {addresses && addresses.length > 0 ? (
                addresses.map((a) => (
                  <div
                    key={a._id}
                    className="bg-base-100 rounded-xl w-full p-4 flex justify-between"
                  >
                    <div className="flex gap-4">
                      <input
                        className="radio radio-primary "
                        type="radio"
                        name=""
                        id=""
                      />
                      <div>
                        <p className="">{a.name}</p>
                        <p>{a.address}</p>
                        <p>{a.city}</p>
                        <p>{a.pin_code}</p>
                      </div>
                    </div>
                    <p className="badge badge-primary">{a.type}</p>
                  </div>
                ))
              ) : (
                // Render something else or an empty state here if there are no addresses
                <p>No addresses available.</p>
              )}
            </div>
          </div>
          <div className="col-span-1 bg-base-200 p-4 rounded-xl">
            <div className="py-4">
              <h4>Order Summary</h4>
              <hr className="my-4" />
              <div className="border-b">
                {items &&
                  items.map((item) => (
                    <div
                      key={nanoid()}
                      className="flex justify-between w-full my-4"
                    >
                      <span className="text-sm">
                        {item?.product_id?.name} X {item.product_quantity}
                      </span>
                      <span className="text-sm">
                        {" "}
                        ${item.product_quantity * item?.product_id?.price}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="my-4 flex justify-between">
                {/* <span className="text-sm">Sub Total</span>
                <span className="text-sm">$111.45</span>
              </div>
              <div className="my-4 flex justify-between">
                <span className="text-sm">Shipping</span>
                <span className="text-sm">$8.00</span> */}
              </div>
              <div className="my-4 flex justify-between">
                {/* <span className="text-sm font-semibold text-primary">
                  Coupon Discount
                </span>
                <span className="text-sm font-semibold text-primary">
                  -$8.00
                </span> */}
              </div>
              <hr className="my-4" />
              <div className="my-4 flex justify-between">
                <span className="text-sm font-semibold">Total (USD)</span>
                <span className="text-sm font-semibold">
                  $
                  {items && items.length > 0
                    ? items.reduce((total, item) => {
                        return (
                          total + item.product_quantity * +item.product_id.price
                        );
                      }, 0)
                    : 0}
                </span>
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
              <button
                className="btn btn-primary w-full"
                onClick={(e) => paymentHandler(e)}
              >
                Place Order
              </button>
            </div>
          </div>
          <dialog id="address_modal">
            <Card>
              <div className="p-5  rounded-2xl relative ">
                <h3 className="font-semibold text-lg">Add New Address</h3>
                <span
                  className="absolute right-5 top-5 text-2xl cursor-pointer"
                  onClick={() => address_modal.close()}
                >
                  <RxCross2 />
                </span>
                <div className="grid gap-5 grid-cols-2 w-full">
                  <div className="form-control w-full col-span-1">
                    <label className="label">Name</label>
                    <input
                      name="name"
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      className="input input-primary"
                    />
                  </div>
                  <div className="form-control w-full col-span-1">
                    <label className="label">Type</label>
                    <select
                      name="type"
                      onChange={(e) => handleInputChange(e)}
                      className="input input-primary"
                    >
                      <option selected disabled>
                        Select address Type
                      </option>
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="form-control w-full col-span-2">
                    <label className="label">Full Address</label>
                    <input
                      name="address"
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      className="input input-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="form-control w-full col-span-1">
                    <label className="label">City</label>
                    <input
                      name="city"
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      className="input input-primary"
                    />
                  </div>
                  <div className="form-control w-full col-span-1">
                    <label className="label">Pin code</label>
                    <input
                      name="pin_code"
                      onChange={(e) => handleInputChange(e)}
                      type="number"
                      className="input input-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div className="form-control w-full col-span-1">
                    <label className="label">Country</label>
                    <input
                      name="country"
                      onChange={(e) => handleInputChange(e)}
                      type="text"
                      className="input input-primary"
                    />
                  </div>
                  <div className="col-span-1 flex flex-col justify-end items-center">
                    <button
                      onClick={addAddress}
                      className="btn btn-primary px-10 py-2"
                    >
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </dialog>

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
