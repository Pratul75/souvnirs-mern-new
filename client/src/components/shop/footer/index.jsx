import PaymentsImage from "../../../assets/shop/cardImages/payment.png";
import SouvnirsLogo from "../../../assets/images/souvnirsLogoDarkMode.png";
import { CiLocationOn } from "react-icons/ci";
import { BsPhone } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import { useEffect, useState } from "react";
import API_Wrapper from "../../../api/index";
const Footer = () => {
  const [footerData, setFooterData] = useState([]);
  useEffect(() => {
    getFooterData();
  }, []);

  const getFooterData = async () => {
    try {
      let result = await API_Wrapper.get("/getFooterMenu");
      let sortData = result?.data?.sort((a, b) => {
        return Number(a.position) - Number(b.position);
      });
      setFooterData(sortData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <footer className="bg-[#252525] mt-4 ">
      <div className="mx-4 grid grid-cols-4 py-8">
        <div className="col-span-4 md:col-span-1 p-4 flex justify-center md:block ">
          <img className="w-52" src={SouvnirsLogo} alt="" />
        </div>
        {footerData?.map((item, index) => {
          if (index == footerData.length - 1) {
            return;
          }
          if (index == 0) {
            return (
              <div
                key={index}
                className=" col-span-4 md:col-span-1 text-gray-400"
              >
                <h2 className="text-2xl my-4 text-white">{item?.title}</h2>
                <ul className="flex flex-col gap-4">
                  {item?.submenus?.map((itm, ind) => (
                    <li className="hover:text-white cursor-pointer">
                      <Link to={PATHS.footerPoliciesAndShippingRates}>
                        {itm?.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          } else if (index == 1) {
            return (
              <div
                key={index}
                className=" col-span-4 md:col-span-1 text-gray-400"
              >
                <h2 className="text-2xl my-4 text-white">{item?.title}</h2>
                <ul className="flex flex-col gap-4">
                  {/* <li className="hover:text-white cursor-pointer">
                    Tracking Order
                  </li> */}
                  {item?.submenus?.map((itm, ind) => (
                    <li className="hover:text-white cursor-pointer">
                      <Link to={PATHS.footerPoliciesAndShippingRates}>
                        {itm?.title}
                      </Link>
                    </li>
                  ))}
                  {/* <li className="hover:text-white cursor-pointer">
                    <Link to={PATHS.footerAboutUs}>About Us</Link>
                  </li> */}
                  {/* <li className="hover:text-white cursor-pointer">
                    <Link to={PATHS.footerContactUs}>Contact Us</Link>
                  </li>
                  <li className="hover:text-white cursor-pointer">
                    <Link to={PATHS.footerFaq}>FAQ</Link>
                  </li> */}
                </ul>
              </div>
            );
          } else if (index == 2) {
            return (
              <div
                key={index}
                className=" col-span-4 md:col-span-1 mt-8 md:mt-3"
              >
                <h2 className="text-2xl text-white">{item?.title}</h2>
                <div className="flex items-center gap-2">
                  <BsPhone className="text-3xl text-orange-500" />
                  <span className="text-gray-400">
                    If you have any questions, please contact us at{" "}
                    <span className="text-orange-500">sales@contact.com</span>
                  </span>
                </div>
                <div className="mt-8">
                  <h2 className="text-white text-2xl">Address</h2>
                  <div className="flex items-center gap-2">
                    <CiLocationOn className="text-6xl text-orange-500" />
                    <span className="text-gray-400">
                      304 Vikram Urbane, 25-A, Mechanic Nagar Extn.Sch# 54,
                      Indore (MP) 452010 sales@contact.com +91 7879154157
                    </span>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="text-white border-t border-gray-500 py-8">
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-gray-400 text-center">
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

const FormattingData = (data) => {};

/**
 * <div className=" col-span-4 md:col-span-1 text-gray-400">
          <h2 className="text-2xl my-4 text-white">Our Policies</h2>
          <ul className="flex flex-col gap-4">
            <li className="hover:text-white cursor-pointer">
              <Link to={PATHS.footerPoliciesAndShippingRates}>
                Policies and shipping rates
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to={PATHS.footerSellerAgreement}>Seller Agreement</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to={PATHS.footerSellerRegistration}>
                Seller registration
              </Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to={PATHS.footerBuyerAgreement}>Buyer Agreement</Link>
            </li>
          </ul>
        </div>
        <div className=" col-span-4 md:col-span-1 text-gray-400">
          <h2 className="text-2xl my-4 text-white">Quick Links</h2>
          <ul className="flex flex-col gap-4">
            <li className="hover:text-white cursor-pointer">Tracking Order</li>
            <li className="hover:text-white cursor-pointer">
              <Link to={PATHS.footerAboutUs}>About Us</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to={PATHS.footerContactUs}>Contact Us</Link>
            </li>
            <li className="hover:text-white cursor-pointer">
              <Link to={PATHS.footerFaq}>FAQ</Link>
            </li>
          </ul>
        </div>
        <div className=" col-span-4 md:col-span-1 mt-8 md:mt-3">
          <h2 className="text-2xl text-white">Contact Us</h2>
          <div className="flex items-center gap-2">
            <BsPhone className="text-3xl text-orange-500" />
            <span className="text-gray-400">
              If you have any questions, please contact us at{" "}
              <span className="text-orange-500">sales@contact.com</span>
            </span>
          </div>
          <div className="mt-8">
            <h2 className="text-white text-2xl">Address</h2>
            <div className="flex items-center gap-2">
              <CiLocationOn className="text-6xl text-orange-500" />
              <span className="text-gray-400">
                304 Vikram Urbane, 25-A, Mechanic Nagar Extn.Sch# 54, Indore
                (MP) 452010 sales@contact.com +91 7879154157
              </span>
            </div>
          </div>
        </div>
 */

//////////////////////
/**
         *  <li className="hover:text-white cursor-pointer">
                    <Link to={PATHS.footerPoliciesAndShippingRates}>
                      Policies and shipping rates
                    </Link>
                  </li>
                  <li className="hover:text-white cursor-pointer">
                    <Link to={PATHS.footerSellerAgreement}>
                      Seller Agreement
                    </Link>
                  </li>
                  <li className="hover:text-white cursor-pointer">
                    <Link to={PATHS.footerSellerRegistration}>
                      Seller registration
                    </Link>
                  </li>
                  <li className="hover:text-white cursor-pointer">
                    <Link to={PATHS.footerBuyerAgreement}>Buyer Agreement</Link>
                  </li>
         */
