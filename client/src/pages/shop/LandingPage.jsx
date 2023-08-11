import {
  HeaderCards,
  FeaturesCard,
  ProductsListWithFilters,
  GradiantCardList,
  ProductCarosel,
  ProductTabs,
  FullWidthBannerCard,
  HalfWidthBannerCard,
  BrandsCard,
  ImagesGrid,
  NewsLetterGrid,
} from "../../components";
import BigCardBackground from "../../assets/shop/cardImages/bigCardBackground.jpg";
import SmallCardBackgroundOne from "../../assets/shop/cardImages/smallCardBackground.jpg";
import SmallCardBackgroundTwo from "../../assets/shop/cardImages/smallCardBackgroundTwo.png";
import HalfWidthBannerImgOne from "../../assets/shop/cardImages/halfWidthcardImgOne.png";
import HalfWidthBannerImgTwo from "../../assets/shop/cardImages/halfWidthCardImgTwo.png";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { BsBoxSeam, BsCreditCard2Front } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import GiftOnePngImage from "../../assets/shop/cardImages/giftOne.png";
import {
  BrandsCardImageList,
  ImageGridMapping,
  blogCardData,
  caroselMapppingDailyDeals,
  gradiantCardListCardData,
  productListFiltersAndProducts,
} from "../../mappings";
import TestimonialsCarosel from "../../components/shop/components/TestimonialsCarosel";
import BlogList from "../../components/shop/components/BlogList";
import FilterProducts from "../../components/shop/components/FilterProducts";

// main landing page for the shop application

const LandingPage = () => {
  return (
    <div className="w-screen h-auto">
      {/* <HeaderCards
        mainImage={BigCardBackground}
        secondaryImageOne={SmallCardBackgroundOne}
        secondaryImageTwo={SmallCardBackgroundTwo}
        mainHeading="Band & Olufson"
        mainHeadingTwo="Staycation"
        mainSubHeading="Cozy and comforting stay-at-home set"
        secondaryHeadingOne="Spring Sales Coming"
        secondaryHeadingTwo="Smartphone"
        secondarySubHeadingOne="with touch"
        tertioryHeadingOne="Spring Sales Coming"
        tertioryHeadingTwo="Smart 4K TV"
        tertiorySubHeading="Watch Now"
      /> */}
      {/* <FeaturesCard
        iconOne={
          <HiOutlineChatBubbleLeftRight className="text-2xl text-primary" />
        }
        headingOne="SUPPORT 24/7"
        subHeadingOne="Dedicate 24/7 Support"
        iconTwo={<BsBoxSeam className="text-2xl text-primary" />}
        headingTwo="EASY RETURNS"
        subHeadingTwo="Shop With Confidence"
        iconThree={<BsCreditCard2Front className="text-2xl text-primary" />}
        headingThree="CARD PAYMENT"
        subHeadingThree="12 Months Installments"
        iconFour={<LiaShippingFastSolid className="text-2xl text-primary" />}
        headingFour="FREE SHIPPING"
        subHeadingFour="Capped at $50 per order"
      />
      <ProductsListWithFilters
        heading="Top Seasonal Gifts"
        filters={productListFiltersAndProducts.filters}
        products={productListFiltersAndProducts.products}
      />
      <GradiantCardList cardData={gradiantCardListCardData} />
      <div className="grid grid-cols-3 gap-4 mx-16 mt-4">
        <ProductCarosel items={caroselMapppingDailyDeals} />
        <ProductTabs />
      </div>
      <FullWidthBannerCard
        mainHeading="Score An Extra 30% Off"
        subHeading="On Your Entire Order"
        imageOne={GiftOnePngImage}
        imageTwo={GiftOnePngImage}
      />
      <ProductsListWithFilters
        heading="Top Seasonal Gifts"
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
      /> */}
      {/* <BrandsCard imagesList={BrandsCardImageList} />
      <TestimonialsCarosel />
      <BlogList blogItemsData={blogCardData} />
      <ImagesGrid imagesData={ImageGridMapping} />
      <NewsLetterGrid
        heading="Join our Newsletter"
        subheading="Join our newsletter and get 20$ discount for your first order"
      /> */}
      <FilterProducts />
    </div>
  );
};

export default LandingPage;
