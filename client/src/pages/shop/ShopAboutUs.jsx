import ProductsBanner from "../../assets/shop/bannerImages/productsBanner.png";
import Banner from "./Banner";
import AboutUsPng from "../../assets/shop/bannerImages/aboutUsImg.png";
import Deliveries from "../../assets/shop/aboutUsPage/Deliveries.svg";
import Categories from "../../assets/shop/aboutUsPage/Categories.svg";
import Vendor from "../../assets/shop/aboutUsPage/Vendor.svg";
import Team from "../../assets/shop/aboutUsPage/Team.svg";
import ListedProducts from "../../assets/shop/aboutUsPage/Listed_Products.svg";
import ClientsEveryYear from "../../assets/shop/aboutUsPage/Clients_Every_Year.svg";
import { Carousel } from "antd";
import {
  BrandsCardImageList,
  caroselMapppingDailyDealsShowDynamic,
} from "../../mappings";
import { BrandsCard, FeaturesCard } from "../../components";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { BsBoxSeam, BsCreditCard2Front } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { useEffect } from "react";
const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#1b2436",
};

const ShopAboutUs = () => {
  return (
    <div>
      <Banner
        bannerImage={ProductsBanner}
        text={"About Us"}
        navigation={"/about-us"}
        key={"about-us-key"}
      />
      <div className="container mx-auto">
        <div className="mx-28 flex gap-4">
          <img className="object-cover" src={AboutUsPng} />
          {/* section one */}
          <div className="flex items-center">
            <div className="w-[600px] h-[431px] pl-[15px] pb-[102.50px] flex-col justify-start items-start gap-[9.11px] inline-flex">
              <div className="self-stretch justify-start items-start inline-flex">
                <div>
                  <span className="text-zinc-800 text-5xl font-semibold leading-[54px]">
                    WHAT IS{" "}
                  </span>
                  <span className="text-violet-900 text-5xl font-semibold leading-[54px]">
                    SOUVNIRS?
                  </span>
                </div>
              </div>
              <div className="text-neutral-900 text-lg font-normal leading-[27px] flex items-center">
                Souvnirs is one of India's biggest organized platform
                exclusively for bulk gifting, transforming its culture in India.
                This model is inclusive of the good part of any e-commerce for
                the ease of bulk shopping minus the
                <br />
                risk & complications involved in the traditional process of bulk
                buying.
                <br />
                <br />
                It offers the best-in-class end-to-end bulk gifting experience
                to people for their needs of any quantity, size & occasion.
                <br />
              </div>
              <button className="btn bg-shopPrimaryColor text-white mt-2 rounded-none">
                Contact Us
              </button>
            </div>
          </div>
        </div>
        {/* section two */}
        <div className="bg-[#F5F5F5] w-full p-8 flex mt-8 justify-between gap-4">
          <div className="flex flex-col justify-center items-center">
            <img className="w-12 h-12" src={Deliveries} alt="" />
            <div className="">
              <p className="text-shopPrimaryColor font-bold text-2xl text-center">
                10,000+
              </p>
              <p className="text-center">Successful Deliveries</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="w-12 h-12" src={Vendor} alt="" />
            <div className="">
              <p className="text-shopPrimaryColor font-bold text-2xl text-center">
                5,000+
              </p>
              <p className="text-center">Vendors</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="w-12 h-12" src={Team} alt="" />
            <div className="">
              <p className="text-shopPrimaryColor font-bold text-2xl text-center">
                60+
              </p>
              <p className="text-center">Team Members</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="w-12 h-12" src={Categories} alt="" />
            <div className="">
              <p className="text-shopPrimaryColor font-bold text-2xl text-center">
                30+
              </p>
              <p className="text-center">Gifting Categories</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="w-12 h-12" src={ListedProducts} alt="" />
            <div className="">
              <p className="text-shopPrimaryColor font-bold text-2xl text-center">
                5,000+
              </p>
              <p className="text-center">Listed Products</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <img className="w-12 h-12" src={ClientsEveryYear} alt="" />
            <div className="">
              <p className="text-shopPrimaryColor font-bold text-2xl text-center">
                100+
              </p>
              <p className="text-center">Clients Every Year</p>
            </div>
          </div>
        </div>
        {/* section three */}
        <div className="mt-8">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-shopPrimaryColor text-4xl font-bold">
              WHY SOUVNIRS?
            </h2>
            <p className="text-center mx-16">
              Souvnirs is backed by its parent company, Recharge Trendd Setter,
              a marketing agency providing 360-degree advertising & corporate
              gifting solutions for more than 2 decades for 10+ industries.
            </p>
          </div>
          <Carousel>
            <div>
              <h3 style={contentStyle}>1</h3>
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
        </div>
        <BrandsCard imagesList={BrandsCardImageList} />
        <FeaturesCard
          iconOne={
            <HiOutlineChatBubbleLeftRight className="text-4xl text-primary" />
          }
          headingOne="SUPPORT 24/7"
          subHeadingOne="Dedicate 24/7 Support"
          iconTwo={<BsBoxSeam className="text-4xl text-primary" />}
          headingTwo="EASY RETURNS"
          subHeadingTwo="Shop With Confidence"
          iconThree={<BsCreditCard2Front className="text-4xl text-primary" />}
          headingThree="CARD PAYMENT"
          subHeadingThree="12 Months Installments"
          iconFour={<LiaShippingFastSolid className="text-4xl text-primary" />}
          headingFour="FREE SHIPPING"
          subHeadingFour="Capped at $50 per order"
        />
      </div>
    </div>
  );
};

export default ShopAboutUs;
