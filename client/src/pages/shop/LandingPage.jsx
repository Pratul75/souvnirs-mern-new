import {
  HeaderCards,
  FeaturesCard,
  ProductsListWithFilters,
  GradiantCardList,
  ProductCarosel,
  FullWidthBannerCard,
  HalfWidthBannerCard,
  BrandsCard,
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
import BlogList from "../../components/shop/components/BlogList";
import MainBannerPng from "../../assets/shop/bannerImages/mainBannerImg.png";
import TvImagePng from "../../assets/shop/productImages/tvImage.png";
import SingleTab from "./SingleTab";
import { ShopIcon } from "../../icons";
import { useEffect, useState } from "react";
import API_WRAPPER, { baseUrl } from "../../api";
import { debouncedShowToast } from "../../utils";

const LandingPage = () => {
  const [productsList, setProductList] = useState([]);
  const getAllProducts = async () => {
    try {
      const response = await API_WRAPPER.get("products/get-all-products");
      if (response.status === 200) {
        setProductList(response.data);
        console.log("PRODUCTS DATA: ", response.data);
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

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
      <ProductCarosel items={caroselMapppingDailyDeals} />

      <ProductsListWithFilters
        heading="Top Seasonal Gifts"
        filters={productListFiltersAndProducts.filters}
        products={productListFiltersAndProducts.products}
      />

      <GradiantCardList cardData={gradiantCardListCardData} />

      <div className="grid grid-cols-5 gap-4 mt-16 w-full ">
        <div className="col-span-5">
          <Tabs
            alignCenter
            tabs={[
              {
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Item 1 */}
                    {productsList.slice(0, 4).map((product) => (
                      <div
                        key={product._id}
                        className="w-full md:col-span-1 bg-white p-4 rounded-lg shadow-md"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            className="w-24 h-24"
                            src={`${baseUrl}/${product.coverImage}`}
                            alt="Product"
                          />
                          <div className="flex-grow">
                            <h2 className="text-lg font-medium text-neutral-700">
                              {product.name}
                            </h2>
                            <div className="text-xl font-medium text-violet-900"></div>
                            <div className="flex items-center space-x-4 mt-2">
                              <Ratings rating={4} />
                              <div className="border rounded-full p-2">
                                <ShopIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
                label: "CONTENT 1",
              },
              { content: "I AM CONTENT 2", label: "CONTENT 2" },
              { content: "I AM CONTENT 3", label: "CONTENT 3" },
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

      {/* For Phase 2 */}
      {/* <TestimonialsCarosel /> */}

      <div className="flex justify-between  mt-32">
        <div className="flex flex-col md:flex-row ">
          <SingleTab
            productsList={productsList.filter((product) => {
              if (product.result) {
                product.result.price < 150;
              } else {
                return product.price < 150;
              }
            })}
            heading="Budget Buy"
          />
          <SingleTab productsList={productsList} heading="Recently Added" />
          <SingleTab productsList={productsList} heading="Trending Products" />
        </div>
      </div>
      <BlogList blogItemsData={blogCardData} />
    </div>
  );
};

export default LandingPage;
