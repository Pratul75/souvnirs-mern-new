import ShopBanner from "../../assets/shop/bannerImages/shopBanner.png";
import Banner from "./Banner";
import { Card } from "../../components";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";

const CartPage = () => {
  return (
    <div>
      <Banner bannerImage={ShopBanner} text={"Cart"} navigation={"Home/Cart"} />
      <div className="mx-16">
        <div className="grid w-full grid-cols-4 mt-4 gap-4">
          <div className="col-span-3  rounded-xl">
            <Card>Cart Data</Card>
          </div>
          <div className="col-span-1">
            <Card>
              <div className=" py-4">
                <h2 className="text-2xl border-b">Cart Total</h2>
                <div className="form-control p-4">
                  <label className="label">
                    <span className="label-text">Apply Coupon</span>
                  </label>
                  <div className="join">
                    <input
                      type="text"
                      className="join-item input border border-primary w-full"
                    />
                    <button className="join-item btn btn-primary btn-square px-2">
                      Apply
                    </button>
                  </div>
                </div>

                <div className="flex flex-col w-full border-b p-4">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>$125</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Coupon Discount</p>
                    <p>(-)0.00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Shipping</p>
                    <p>$6.90</p>
                  </div>
                </div>
                <div className="flex justify-between px-4 py-2">
                  <h3>Total (USD)</h3>
                  <h3>$132.58</h3>
                </div>
                <div className="flex flex-col gap-4 px-2">
                  <button className="btn btn-primary ">
                    Proceed to checkout
                  </button>
                  <Link to={PATHS.landingPage} className="btn">
                    Return To Shopping
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
