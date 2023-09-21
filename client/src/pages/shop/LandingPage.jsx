import {
  HeaderCards,
  FeaturesCard,
  GradiantCardList,
  ProductCarosel,
  FullWidthBannerCard,
  HalfWidthBannerCard,
  BrandsCard,
  Tabs,
  Carosal,
} from "../../components";
import {
  BrandsCardImageList,
  blogCardData,
  caroselMapppingDailyDeals,
  gradiantCardListCardData,
} from "../../mappings";
import SmallCardBackgroundOne from "../../assets/shop/cardImages/smallCardBackground.jpg";
import SmallCardBackgroundTwo from "../../assets/shop/cardImages/smallCardBackgroundTwo.png";
import HalfWidthBannerImgOne from "../../assets/shop/cardImages/halfWidthcardImgOne.png";
import HalfWidthBannerImgTwo from "../../assets/shop/cardImages/halfWidthCardImgTwo.png";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { BsBoxSeam, BsCreditCard2Front } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import GiftOnePngImage from "../../assets/shop/cardImages/giftOne.png";
import BudsImage from "../../assets/shop/productImages/buds.png";
import WatchImage from "../../assets/shop/productImages/watch.png";
import BlogList from "../../components/shop/components/BlogList";
import MainBannerPng from "../../assets/shop/bannerImages/mainBannerImg.png";
import SingleTab from "./SingleTab";
import { useQuery } from "react-query";
import { fetchAllProducts } from "../../api/apiCalls";
import GiftOne from "../../assets/shop/productImages/giftOne.png";
import GiftTwo from "../../assets/shop/productImages/giftTwo.png";
import GiftThree from "../../assets/shop/productImages/giftThree.png";
import TabContent from "../../components/shop/components/TabContent";
import { selectRandomValues } from "../../utils";

// landing page
const LandingPage = () => {
  const {
    data: productsList,
    isLoading,
    error,
  } = useQuery("get-all-products", fetchAllProducts);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-error">Error: {error.message}</div>;
  }

  return (
    <div>
      <HeaderCards
        mainImage={MainBannerPng}
        secondaryImageOne={SmallCardBackgroundOne}
        secondaryImageTwo={SmallCardBackgroundTwo}
        productImgOne={GiftThree}
        productImageTwo={GiftTwo}
        productImageThree={GiftOne}
        mainHeading="Diwali Gifting"
        mainHeadingTwo=""
        mainSubHeading="May this Diwali bring Joy & Light into your life just like this gift does for you."
        secondaryHeadingOne="Multi Purpose Electronics"
        secondaryHeadingTwo=""
        secondarySubHeadingOne="Your go to gadgets for all occassions."
        tertioryHeadingOne="Eco Friendly Products"
        tertioryHeadingTwo=""
        tertiorySubHeading="Choose a brighter future with ecofrieldly products that care for our planet."
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

      <div className="grid grid-cols-5 mt-5 gap-4">
        <div className="col-span-5 md:col-span-2">
          <ProductCarosel className="" items={caroselMapppingDailyDeals} />
        </div>
        <div className="col-span-5 md:col-span-3 bg-white">
          <Tabs
            tabBackground
            alignCenter
            tabs={[
              {
                content: (
                  <TabContent
                    productsList={selectRandomValues(productsList?.data)}
                  />
                ),
                label: "Trending",
              },
              {
                content: (
                  <TabContent
                    productsList={selectRandomValues(productsList?.data)}
                  />
                ),
                label: "Recently Added",
              },
              {
                content: (
                  <TabContent
                    productsList={selectRandomValues(productsList?.data)}
                  />
                ),
                label: "Best in Price",
              },
            ]}
          />
        </div>
      </div>

      <GradiantCardList cardData={gradiantCardListCardData} />
      <FullWidthBannerCard
        mainHeading="Winter Collection"
        subHeading="Peruse Our Refined Winter Selection"
        imageOne={BudsImage}
        imageTwo={WatchImage}
      />

      <div className="hidden md:block">
        <Carosal productList={productsList} />
      </div>
      <HalfWidthBannerCard
        backgroundImageOne={HalfWidthBannerImgOne}
        backgroundImageTwo={HalfWidthBannerImgTwo}
        headingOne="Get 5% off on your first purchase"
        headingTwo="Get a free gift of Rs 2000 on a purchase of 10 Lakhs"
        cardTitleOne=""
        cardTitleTwo=""
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
      <div className="flex justify-between  mt-5">
        <div className="flex flex-col md:flex-row ">
          <SingleTab
            productsList={productsList?.data?.slice(10, 20)}
            heading="Budget Buy"
          />
          <SingleTab
            productsList={productsList?.data}
            heading="Recently Added"
          />
          <SingleTab
            productsList={productsList?.data}
            heading="Trending Products"
          />
        </div>
      </div>
      <BlogList blogItemsData={blogCardData} />
    </div>
  );
};

export default LandingPage;
