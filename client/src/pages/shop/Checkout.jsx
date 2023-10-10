import { BiSolidOffer } from "react-icons/bi";
import ShopBanner from "../../assets/shop/bannerImages/checkoutBaner.png";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import { Card } from "../../components";
import { RxCross2 } from "react-icons/rx";
import { nanoid } from "nanoid";
import Axios from "axios";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../animation";
import { CiDeliveryTruck } from "react-icons/ci";
import { AiOutlineHome } from "react-icons/ai";
import { useQuery } from "react-query";
import { fetchAddresses } from "../../api/apiCalls";

const Checkout = () => {
  const [items, setItems] = useState();
  const [address, setAddress] = useState();
  const [addresses, setAddresses] = useState();
  const [apiTrigger, setApiTrigger] = useState(false);
  const [showAddress, setshowAddress] = useState(false);
  const [selectedAddress, setselectedAddress] = useState({});
  const getCheckedOutItems = async () => {
    const response = await API_WRAPPER.get("/cart/mycart");
    console.log(response);
    setItems(response.data);
  };

  const { data, isLoading, error } = useQuery("get_addresses", fetchAddresses, {
    onSuccess: () => setAddresses(data?.data),
  });

  // useEffect(() => {
  //   setselectedAddress(data?.data[0]);
  // }, []);

  // adding address api call
  const addAddress = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.post("/addCustomerAddress", address);
    console.log(response);
    setApiTrigger((a) => !a);
    address_modal.close();
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getCheckedOutItems();
  }, []);

  useEffect(() => {
    // getAddresses();
  }, [apiTrigger]);

  // payment handler
  const paymentHandler = async (e) => {
    e.preventDefault();
    const orderUrl = `http://localhost:8080/order/create`;
    const response = await API_WRAPPER.post(orderUrl);
    const { data } = response;
    const options = {
      key: "rzp_live_80LvVdqLPUaiKR",
      name: "Souvnirs Bulk Gifting",
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

  const handleAddressChange = (address) => {
    console.log("SELECTED ADDRESS: ", address);
    setselectedAddress(address);
    setshowAddress(false);
  };

  console.log(
    "++++++++++>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
    selectedAddress,
    data?.data[0]
  );

  return (
    <div>
      <Banner
        bannerImage={ShopBanner}
        navigation={"Home/Checkout"}
        text={"Checkout"}
      />
      <div className="my-8">
        <div className="grid grid-cols-4 gap-4 mt-4 ">
          <div className="col-span-4 md:col-span-3 bg-base-200 p-4 px-8 rounded-xl">
            <h1 className="font-semibold text-2xl my-4">Delivery Address</h1>
            <div>
              <button
                onClick={() => {
                  address_modal.showModal();
                }}
                className="btn btn-info"
              >
                Add New
              </button>{" "}
              <button
                className="btn btn-primary"
                onClick={() => setshowAddress((prevState) => !prevState)}
              >
                {showAddress ? "Hide Addresses" : "Show Addresses"}
              </button>
            </div>
            {!showAddress && !selectedAddress ? (
              <p className="my-4 text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                cupiditate dolores saepe nihil labore, illum quaerat porro
                magnam aliquam eius at tenetur rem doloremque repudiandae in
                itaque aspernatur odit quae doloribus dolor perferendis laborum
                provident laboriosam vero? Harum, repellendus aliquid. Totam sed
                voluptate quis id cupiditate facere voluptates aliquid quam
                molestias, nostrum adipisci maiores natus culpa, nisi, deleniti
                inventore quos. Aperiam totam delectus obcaecati quis est
                repellendus incidunt fugit voluptate alias nisi accusamus
                deserunt.
              </p>
            ) : (
              <p>
                <div
                  className="col-span-1 bg-base-100 p-4 rounded-xl mt-4"
                  key={nanoid()}
                >
                  <div className="flex justify-between">
                    <input
                      className="radio radio-primary mr-2"
                      type="radio"
                      name="address"
                      id={selectedAddress._id}
                      checked={selectedAddress._id === selectedAddress._id}
                    />
                    <div className="badge badge-primary">
                      {selectedAddress.type}
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="flex flex-col">
                    <p className="font-bold">
                      <span>Name</span> {selectedAddress.name}
                    </p>
                    <p>
                      <span>Address:</span> {selectedAddress.address}
                    </p>
                    <p>
                      <span>City:</span> {selectedAddress.city}
                    </p>
                    <p>
                      <span>Pin Code:</span> {selectedAddress.pin_code}
                    </p>
                  </div>
                </div>
              </p>
            )}

            {showAddress && (
              <motion.div
                initial="initial"
                animate="animate"
                variants={fadeInVariants}
                className="grid gap-4 grid-cols-2 mt-8"
              >
                {addresses && addresses.length > 0 ? (
                  addresses.map((a) => (
                    <div
                      className="col-span-1 bg-base-100 p-4 rounded-xl"
                      key={nanoid()}
                    >
                      <div className="flex justify-between">
                        <input
                          onChange={() => handleAddressChange(a)}
                          className="radio radio-primary mr-2"
                          type="radio"
                          name="address"
                          id={a._id}
                          checked={a._id === selectedAddress._id}
                        />
                        <div className="badge badge-primary">{a.type}</div>
                      </div>
                      <hr className="my-4" />
                      <div className="flex flex-col">
                        <p className="font-bold">
                          <span>Name</span> {a.name}
                        </p>
                        <p>
                          <span>Address:</span> {a.address}
                        </p>
                        <p>
                          <span>City:</span> {a.city}
                        </p>
                        <p>
                          <span>Pin Code:</span> {a.pin_code}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  // Render something else or an empty state here if there are no addresses
                  <p>No addresses available.</p>
                )}
              </motion.div>
            )}
          </div>
          <div className="col-span-4 md:col-span-1 bg-base-200 p-4 rounded-xl">
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
                        ₹{item.product_quantity * item?.product_id?.price}
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
                <span className="text-sm font-semibold">Total (Rupees)</span>
                <span className="text-sm font-semibold">
                  ₹
                  {items && items.length > 0
                    ? items.reduce((total, item) => {
                        return (
                          total +
                          item?.product_quantity * +item?.product_id?.price
                        );
                      }, 0)
                    : 0}
                </span>
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-3 p-4 bg-base-200 rounded-xl">
            <h1 className=" font-semibold my-4">Delivery Options </h1>
            <div className="flex gap-4">
              <div className="bg-base-100 rounded-xl w-full p-4">
                <div className="form-control flex flex-row items-center justify-between gap-4">
                  <div className="flex justify-between items-center">
                    <input
                      type="radio"
                      className="radio radio-primary"
                      name="deliveryOptions"
                    />
                    <span className="label-text ml-4">
                      Standard Delivery Options
                    </span>
                  </div>
                  <label className="label ">
                    <CiDeliveryTruck color="gray" size={35} />
                  </label>
                </div>
              </div>
              <div className="bg-base-100 rounded-xl w-full p-4">
                <div className="form-control flex flex-row items-center justify-between gap-4">
                  <div className="flex justify-between items-center">
                    <input
                      type="radio"
                      className="radio radio-primary"
                      name="deliveryOptions"
                    />
                    <span className="label-text ml-4">
                      Future Delivery Options
                    </span>
                  </div>
                  <label className="label ">
                    <AiOutlineHome color="gray" size={35} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 md:col-span-1 p-4 bg-base-200 rounded-xl">
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
          {/* not neeeded as payment is taken care by razor pay */}
          {/* <div className="col-span-4 md:col-span-3 p-4 bg-base-200 rounded-xl">
            <h1 className="font-semibold my-4">Payment Options</h1>
            <div className="collapse bg-base-100 mt-4">
              <input className="checkbox-primary" type="checkbox" />
              <div className="collapse-title text-xl font-medium gap-4 flex items-center">
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
                <h1 className="text-sm">My Wallet</h1>
              </div>
              <div className="collapse-content">
                <p>
                  Pay digitally with SMS Pay Link. Cash may not be accepted in
                  COVID restricted areas. Know more.
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
