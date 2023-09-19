import PaymentsImage from "../../../assets/shop/cardImages/payment.png";
import SouvnirsLogo from "../../../assets/images/souvnirsLogoDarkMode.png";
import { CiLocationOn } from "react-icons/ci";
import { BsPhone } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-[#252525] mt-4 ">
      <div className="mx-4 grid grid-cols-4 py-8">
        <div className=" col=span-4 md:col-span-1 p-4">
          <img className="w-52" src={SouvnirsLogo} alt="" />
        </div>

        <div className=" col=span-4 md:col-span-1 text-gray-400">
          <h2 className="text-2xl my-4 text-white">Our Policies</h2>
          <ul className="flex flex-col gap-4">
            <li className="hover:text-white cursor-pointer">
              Policies and shipping rates
            </li>
            <li className="hover:text-white cursor-pointer">
              Seller Agreement
            </li>
            <li className="hover:text-white cursor-pointer">
              Seller registration
            </li>
            <li className="hover:text-white cursor-pointer">Buyer Agreement</li>
          </ul>
        </div>
        <div className=" col=span-4 md:col-span-1 text-gray-400">
          <h2 className="text-2xl my-4 text-white">Quick Links</h2>
          <ul className="flex flex-col gap-4">
            <li className="hover:text-white cursor-pointer">Tracking Order</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer"> Contact Us</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
          </ul>
        </div>
        <div className=" col=span-4 md:col-span-1 mt-3">
          <h2 className="text-2xl text-white">Contact Us</h2>
          <div className="flex items-center gap-2">
            <BsPhone className="text-3xl text-orange-500" />
            <span className="text-gray-400">
              If you have any questions, please contact us at{" "}
              <span className="text-orange-500">contact@souvnirs.com</span>
            </span>
          </div>
          <div className="my-4">
            <h2 className="text-white text-2xl">Address</h2>
            <div className="flex items-center gap-2">
              <CiLocationOn className="text-6xl text-orange-500" />
              <span className="text-gray-400">
                304 Vikram Urbane, 25-A, Mechanic Nagar Extn.Sch# 54, Indore
                (MP) 452010 contact@souvnirs.com +91 7879154157
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white border-t border-gray-500 py-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-gray-400">
            Our Stores / Shipping / Payments / Checkout / Discount / Terms &
            Conditions / Policy Shipping / Returns / Refunds
          </h2>
          <div>
            <img src={PaymentsImage} />
          </div>
          <span className="text-gray-400">
            All Rights Reserved{" "}
            <span className="text-orange-500">@Souvnirs</span>{" "}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
