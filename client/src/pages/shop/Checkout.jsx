import { BiSolidOffer } from "react-icons/bi";
import ShopBanner from "../../assets/shop/bannerImages/checkoutBaner.png";
import Banner from "./Banner";
import { useEffect, useMemo, useState } from "react";
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
import { ItemsLoading } from "../common/ItemsLoading";
import { LoadingComponent } from "../../components/LoadinComponent/LoadingComponent";

const Checkout = () => {
  const [items, setItems] = useState();
  const [address, setAddress] = useState();
  const [addresses, setAddresses] = useState();
  const [apiTrigger, setApiTrigger] = useState(false);
  const [showAddress, setshowAddress] = useState(false);
  const [selectedAddress, setselectedAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const [CouponChange, handleCouponChange] = useState("");
  const [error, setError] = useState("");
  const [loadingCoupon, setLoadingCoupon] = useState(false);
  const [Applycoupons, setApplyCoupons] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [prevTotal, setPrevTotal] = useState([]);
  const [storeData, setstoreData] = useState([]);

  const getCheckedOutItems = async () => {
    const response = await API_WRAPPER.get("/cart/mycart");
    console.log(response);
    setItems(response.data);
    let datatotal = [];
    for (let i = 0; i < response?.data?.length; i++) {
      let datas = await getWishListdata(response.data[i]?.product_id);
      datatotal.push(datas);
    }
    setstoreData(datatotal);
  };

  const getWishListdata = async (product) => {
    try {
      const result = await API_WRAPPER(
        `/check/products/data?productId=${product?._id}`
      );
      if (result?.data?.success) {
        return {
          show: true,
          data: result?.data?.data[0],
        };
      } else {
        return {
          show: false,
          data: {},
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("99999****-<", storeData);

  // const { data, isLoading, error } = useQuery("get_addresses", fetchAddresses, {
  //   onSuccess: () => setAddresses(data?.data),
  // });

  const getAllAddress = async () => {
    try {
      let responce = await API_WRAPPER.get("/getCustomerAddress");
      setAddresses(responce?.data);
      setselectedAddress(responce?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllAddress();
  }, []);

  // useEffect(() => {
  //   setselectedAddress(data?.data[0]);
  // }, []);

  // adding address api call
  const addAddress = async (e) => {
    e.preventDefault();
    const response = await API_WRAPPER.post("/addCustomerAddress", address);
    setApiTrigger((a) => !a);
    address_modal.close();
    getAllAddress();
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setLoading(true);
    e.preventDefault();
    // const orderUrl = `http://localhost:8080/order/create`;
    const orderUrl = `https://souvnirs-be.el.r.appspot.com/order/create`;
    const response = await API_WRAPPER.post(orderUrl);
    const { data } = response;
    setLoading(false);
    const options = {
      key: "rzp_live_80LvVdqLPUaiKR",
      name: "Souvnirs Bulk Gifting",
      description: "Some Description",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          // const url = `http://localhost:8080/order/capture/${paymentId}`;
          const url = `https://souvnirs-be.el.r.appspot.com/order/capture/${paymentId}`;
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

  console.log("---+++===,,,>>>,,<<<....>>>", addresses);

  const hanldeCoupon = async () => {
    if (CouponChange.trim() === "") {
      setError("Please enter a value.");
    } else {
      setError("");
      setLoadingCoupon(true);
      let data = {
        code: CouponChange,
        productIds: items?.map((item) => item?.product_id?._id),
      };
      if (!Applycoupons) {
        setApplyCoupons(true);
        let responce = await API_WRAPPER.post("/check/coupon/code", data);
        setLoadingCoupon(false);
        if (responce?.data?.success) {
          if (responce?.data?.productDiscount.length > 0) {
            let productDiscount = responce?.data?.productDiscount;
            let cloneData = [...items];
            cloneData?.map((itm, index) => {
              let checkIndex = productDiscount.findIndex(
                (itn) => itn?.id == itm?.product_id?._id
              );
              if (checkIndex >= 0) {
                let price = itm?.variant_id
                  ? itm?.variant_id?.price
                  : itm?.product_id?.price;
                let checkVariante = itm?.variant_id ? 1 : 2;
                cloneData[index].mainprice = price;
                if (productDiscount[checkIndex]?.type == "percentage") {
                  cloneData[
                    index
                  ].discount = `${productDiscount[checkIndex]?.discount}%`;
                  if (checkVariante == 1) {
                    let subtraction =
                      (Number(productDiscount[checkIndex]?.discount) / 100) *
                      Number(price);
                    let result = Number(price) - subtraction;
                    cloneData[index].variant_id.price = result;
                  } else {
                    let subtraction =
                      (Number(productDiscount[checkIndex]?.discount) / 100) *
                      Number(price);
                    let result = Number(price) - subtraction;

                    cloneData[index].product_id.price = result;
                  }
                } else {
                  cloneData[index].discount =
                    productDiscount[checkIndex]?.discount;
                  if (checkVariante == 1) {
                    let result =
                      Number(price) -
                      Number(productDiscount[checkIndex]?.discount);
                    cloneData[index].variant_id.price = result;
                  } else {
                    let result =
                      Number(price) -
                      Number(productDiscount[checkIndex]?.discount);
                    cloneData[index].product_id.price = result;
                  }
                }
              }
            });
            console.log("---->>>>>999___>", cloneData);
            setItems(cloneData);
          } else {
            setError(responce?.data?.msg);
          }
        } else {
          setLoadingCoupon(false);
          setError(responce?.data?.msg);
        }
      } else {
        setLoadingCoupon(false);
      }

      // let cloneData = [...items];
      // setItems(cloneData);
      // setCoupons(responce?.data?.productDiscount);
    }
  };

  const getActualPrice = (type, per, price) => {
    console.log("type, per, price", { type, per, price });
    let check = type == "percentage" ? true : false;
    if (type && per && price !== undefined) {
      if (check) {
        let decimalPercentage = Number(per) / 100;

        // Calculate the subtraction
        let result = Number(price) - decimalPercentage * Number(price);
        return result;
      } else {
        let result = Number(price) - Number(per);
        return result;
      }
    } else {
      return Number(price);
    }
  };

  const calculatedata = () => {
    console.log("==>datas", items);
    let totalPice = 0;
    items?.map((itm) => {
      let checkVariante = itm?.variant_id ? 1 : 2;
      if (checkVariante == 1) {
        let price =
          Number(itm?.variant_id?.price) * Number(itm?.product_quantity);
        totalPice += price;
      } else {
        let price =
          Number(itm?.product_id?.price) * Number(itm?.product_quantity);
        totalPice += price;
      }
    });
    setTotalPrice(totalPice);
  };

  useEffect(() => {
    calculatedata();
  }, [items, hanldeCoupon]);

  console.log("0000____------_____----->", items);

  return (
    <div>
      <Banner
        bannerImage={ShopBanner}
        navigation={"Home/Checkout"}
        text={"Checkout"}
      />
      <div className="my-8">
        <div className="grid grid-cols-4 gap-2 mt-4 ">
          <div className="col-span-4 md:col-span-2 bg-base-200 p-2 px-4 rounded-xl">
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
          <div className="col-span-4 md:col-span-2 bg-base-200 p-4 rounded-xl">
            <div className="py-4">
              <h4>Coupon code</h4>
              <hr className="my-4" />
              <div className="border-b">
                <div className="flex items-center">
                  <input
                    type="text"
                    className={`border p-2 mr-2 rounded-md ${
                      error && "border-red-500 p-0 mr-2"
                    }`}
                    // className="border p-2 mr-2 rounded-md"
                    placeholder="Enter Coupon code..."
                    onChange={(e) => handleCouponChange(e.target?.value)}
                  />
                  <button
                    onClick={hanldeCoupon}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    {loadingCoupon ? (
                      <svg
                        aria-hidden="true"
                        class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      "Apply"
                    )}
                  </button>
                </div>
                {error && <p className="text-red-500 mb-2">{error}</p>}
              </div>
            </div>

            <div className="py-4">
              <h4>Order Summary</h4>
              <hr className="my-4" />
              <div className="border-b">
                {items &&
                  items.map((item, index) => {
                    // if (storeData[index]?.show) {
                    //   if (item?.variant_id) {
                    //   }
                    // }

                    let totalPrice = 0;
                    if (item?.variant_id) {
                      let variPrice =
                        item.product_quantity *
                        item?.variant_id?.price.toFixed(2);
                      if (storeData[index]?.show) {
                        totalPrice = getActualPrice(
                          storeData[index]?.data?.typeTitle,
                          storeData[index]?.data?.typeValue,
                          variPrice
                        );
                      } else {
                        totalPrice = variPrice;
                      }
                    } else {
                      let produPrice =
                        item.product_quantity *
                        item?.product_id?.price.toFixed(2);
                      if (storeData[index]?.show) {
                        totalPrice = getActualPrice(
                          storeData[index]?.data?.typeTitle,
                          storeData[index]?.data?.typeValue,
                          produPrice
                        );
                      } else {
                        totalPrice = produPrice;
                      }
                    }

                    return (
                      <div
                        key={nanoid()}
                        className="flex justify-between w-full my-4"
                      >
                        <span className="text-sm">
                          {item?.product_id?.name} X {item.product_quantity}
                        </span>
                        <span className="text-sm">
                          {" "}
                          {/* mainprice */}₹
                          {item?.discount
                            ? `${
                                storeData[index]?.show
                                  ? getActualPrice(
                                      storeData[index]?.data?.typeTitle,
                                      storeData[index]?.data?.typeValue,
                                      item?.mainprice * item.product_quantity
                                    )
                                  : item?.mainprice * item.product_quantity
                              } - ${item?.discount} = ${totalPrice}`
                            : totalPrice}
                          {/* {item?.discount && `- ${item?.discount}`} */}
                        </span>
                      </div>
                    );
                    12;
                  })}
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
                  ₹{totalPrice.toFixed(2)}
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
      {loading && <ItemsLoading />}
    </div>
  );
};

export default Checkout;
