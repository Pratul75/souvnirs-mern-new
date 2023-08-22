import {
  HeaderCards,
  FeaturesCard,
  ProductsListWithFilters,
  GradiantCardList,
  ProductCarosel,
  FullWidthBannerCard,
  HalfWidthBannerCard,
  BrandsCard,
  NewsLetterGrid,
  Tabs,
  Ratings,
} from "../../components";
import {
  BrandsCardImageList,
  blogCardData,
  caroselMapppingDailyDeals,
  gradiantCardListCardData,
  productListFiltersAndProducts,
} from "../../mappings";
import SmallCardBackgroundOne from "../../assets/shop/cardImages/smallCardBackground.jpg";
import SmallCardBackgroundTwo from "../../assets/shop/cardImages/smallCardBackgroundTwo.png";
import HalfWidthBannerImgOne from "../../assets/shop/cardImages/halfWidthcardImgOne.png";
import HalfWidthBannerImgTwo from "../../assets/shop/cardImages/halfWidthCardImgTwo.png";
import BannerProductImgOne from "../../assets/shop/productImages/bannerProduct.png";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { BsBoxSeam, BsCreditCard2Front } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import GiftOnePngImage from "../../assets/shop/cardImages/giftOne.png";
import BudsImage from "../../assets/shop/productImages/buds.png";
import WatchImage from "../../assets/shop/productImages/watch.png";
import BannerImageTwo from "../../assets/shop/bannerImages/bannerImageTwo.png";
import NewsLetterBanner from "../../assets/shop/bannerImages/newsLetterBanner.png";
import TestimonialsCarosel from "../../components/shop/components/TestimonialsCarosel";
import BlogList from "../../components/shop/components/BlogList";
import MainBannerPng from "../../assets/shop/bannerImages/mainBannerImg.png";
import TvImagePng from "../../assets/shop/productImages/tvImage.png";
import SingleTab from "./SingleTab";
import { ShopIcon } from "../../icons";

const LandingPage = () => {
  return (
    <div>
      <HeaderCards
        mainImage={MainBannerPng}
        secondaryImageOne={SmallCardBackgroundOne}
        secondaryImageTwo={SmallCardBackgroundTwo}
        productImgOne={BannerProductImgOne}
        productImageTwo={BannerImageTwo}
        productImageThree={TvImagePng}
        mainHeading="Band & Olufson"
        mainHeadingTwo="Staycation"
        mainSubHeading="Cozy and comforting stay-at-home set"
        secondaryHeadingOne="Spring Sales Coming"
        secondaryHeadingTwo="Smartphone"
        secondarySubHeadingOne="with touch"
        tertioryHeadingOne="Spring Sales Coming"
        tertioryHeadingTwo="Smart 4K TV"
        tertiorySubHeading="Watch Now"
      />

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
      <ProductsListWithFilters
        heading="Top Seasonal Gifts"
        filters={productListFiltersAndProducts.filters}
        products={productListFiltersAndProducts.products}
      />

      <GradiantCardList cardData={gradiantCardListCardData} />

      <div className="grid grid-cols-5 gap-4 mt-16 w-full ">
        <ProductCarosel items={caroselMapppingDailyDeals} />
        <div className="col-span-3">
          <Tabs
            alignCenter
            tabs={[
              {
                content: (
                  <div className="grid grid-cols-2">
                    <div className="col-span-1">
                      <div className="w-[400.94px] h-[125.92px] justify-start items-end inline-flex mt-8">
                        <div className="justify-start items-start flex">
                          <img
                            className="w-[122.01px] h-[122.01px]"
                            src="https://via.placeholder.com/200x200"
                          />
                        </div>
                        <div className="grow shrink basis-0 pl-[23.95px] pr-[31.93px] flex-col justify-start items-start  inline-flex">
                          <div className="justify-center items-center inline-flex mt-5 ">
                            <div className="text-neutral-700 text-lg font-medium leading-7 ">
                              D-Phone Android Latest UI New
                              <br />
                              XP
                            </div>
                          </div>

                          <div className="h-[57.66px] pt-[4.56px] flex-col justify-start items-start flex w-full">
                            <div className="text-violet-900 text-xl font-medium leading-tight">
                              $256.00
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-4 cursor-pointer w-full">
                              <Ratings rating={4} />
                              <div className="px-4 py-2 border rounded-full ml-8">
                                <ShopIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ,
                      <div className="w-[400.94px] h-[125.92px] justify-start items-end inline-flex mt-8">
                        <div className="justify-start items-start flex">
                          <img
                            className="w-[122.01px] h-[122.01px]"
                            src="https://via.placeholder.com/200x200"
                          />
                        </div>
                        <div className="grow shrink basis-0 pl-[23.95px] pr-[31.93px] flex-col justify-start items-start  inline-flex">
                          <div className="justify-center items-center inline-flex mt-5 ">
                            <div className="text-neutral-700 text-lg font-medium leading-7 ">
                              D-Phone Android Latest UI New
                              <br />
                              XP
                            </div>
                          </div>

                          <div className="h-[57.66px] pt-[4.56px] flex-col justify-start items-start flex w-full">
                            <div className="text-violet-900 text-xl font-medium leading-tight">
                              $256.00
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-4 cursor-pointer w-full">
                              <Ratings rating={4} />
                              <div className="px-4 py-2 border rounded-full ml-8">
                                <ShopIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="w-[400.94px] h-[125.92px] justify-start items-end inline-flex mt-8">
                        <div className="justify-start items-start flex">
                          <img
                            className="w-[122.01px] h-[122.01px]"
                            src="https://via.placeholder.com/200x200"
                          />
                        </div>
                        <div className="grow shrink basis-0 pl-[23.95px] pr-[31.93px] flex-col justify-start items-start  inline-flex">
                          <div className="justify-center items-center inline-flex mt-5 ">
                            <div className="text-neutral-700 text-lg font-medium leading-7 ">
                              D-Phone Android Latest UI New
                              <br />
                              XP
                            </div>
                          </div>

                          <div className="h-[57.66px] pt-[4.56px] flex-col justify-start items-start flex w-full">
                            <div className="text-violet-900 text-xl font-medium leading-tight">
                              $256.00
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-4 cursor-pointer w-full">
                              <Ratings rating={4} />
                              <div className="px-4 py-2 border rounded-full ml-8">
                                <ShopIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      ,
                      <div className="w-[400.94px] h-[125.92px] justify-start items-end inline-flex mt-8">
                        <div className="justify-start items-start flex">
                          <img
                            className="w-[122.01px] h-[122.01px]"
                            src="https://via.placeholder.com/200x200"
                          />
                        </div>
                        <div className="grow shrink basis-0 pl-[23.95px] pr-[31.93px] flex-col justify-start items-start  inline-flex">
                          <div className="justify-center items-center inline-flex mt-5 ">
                            <div className="text-neutral-700 text-lg font-medium leading-7 ">
                              D-Phone Android Latest UI New
                              <br />
                              XP
                            </div>
                          </div>

                          <div className="h-[57.66px] pt-[4.56px] flex-col justify-start items-start flex w-full">
                            <div className="text-violet-900 text-xl font-medium leading-tight">
                              $256.00
                            </div>
                            <div className="mt-2 flex items-center justify-between gap-4 cursor-pointer w-full">
                              <Ratings rating={4} />
                              <div className="px-4 py-2 border rounded-full ml-8">
                                <ShopIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    ,
                  </div>
                ),
                label: "CONTENT 1",
              },
              { content: "I AM CONTENT 2", label: "CONTENT 1" },
              { content: "I AM CONTENT 3", label: "CONTENT 1" },
            ]}
          />
        </div>
      </div>
      <FullWidthBannerCard
        mainHeading="Score An Extra 30% Off"
        subHeading="On Your Entire Order"
        imageOne={BudsImage}
        imageTwo={WatchImage}
      />

      <ProductsListWithFilters
        heading="Best Products at price"
        filters={productListFiltersAndProducts.filters}
        products={productListFiltersAndProducts.products}
      />
      <HalfWidthBannerCard
        backgroundImageOne={HalfWidthBannerImgOne}
        backgroundImageTwo={HalfWidthBannerImgTwo}
        headingOne="Get 50% Off"
        headingTwo="Get 50% Off"
        cardTitleOne="Smart TV with Pen"
        cardTitleTwo="Smart Phone with Pen"
        productImageOne={GiftOnePngImage}
        productImageTwo={GiftOnePngImage}
        buttonHandlerOne={() =>
          console.log("CLICKED ON HALF WIDTH BANNER CARD")
        }
        buttonHandlerTwo={() =>
          console.log("CLICKED ON HALF WIDTH BANNER CARD")
        }
      />
      <BrandsCard imagesList={BrandsCardImageList} />

      <TestimonialsCarosel />

      <div className="flex container mx-auto">
        <div className="flex justify-between gap-10 w-full px-[50px]">
          <SingleTab heading="Budget Buy" />
          <SingleTab heading="Recently Added" />
          <SingleTab heading="Trending Products" />
        </div>
      </div>
      <BlogList blogItemsData={blogCardData} />
      <NewsLetterGrid
        backgroundImage={NewsLetterBanner}
        heading="Join our Newsletter"
        subheading="Join our newsletter and get 20$ discount for your first order"
      />
    </div>
  );
};

export default LandingPage;
