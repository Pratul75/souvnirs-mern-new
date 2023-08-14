import Banner from "./Banner";
import ShopBanner from "../../assets/shop/bannerImages/shopBanner.png";
import { BiSolidBadgeCheck } from "react-icons/bi";
const OrderSuccess = () => {
  return (
    <div>
      <Banner
        text={"Order Success"}
        bannerImage={ShopBanner}
        navigation={"Home/Orders"}
      />
      <div className="py-16 bg-base-100">
        <div className="flex flex-col items-center justify-center">
          <BiSolidBadgeCheck className="text-8xl text-primary" />
          <h4>Order Placed Successfully</h4>
          <p>Payment is successful and your order is on the way</p>
          <p>Transaction ID: 12398010289123</p>
        </div>
      </div>
      <div className="mx-16"></div>
    </div>
  );
};

export default OrderSuccess;
