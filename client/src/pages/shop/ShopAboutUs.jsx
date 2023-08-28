import React from "react";
import ProductsBanner from "../../assets/shop/bannerImages/productsBanner.png";
import Banner from "./Banner";
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
        <div className="mx-16 flex gap-4">
          <img
            className="w-[434px] h-[550px]"
            src="https://via.placeholder.com/434x550"
          />

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
      </div>
    </div>
  );
};

export default ShopAboutUs;
