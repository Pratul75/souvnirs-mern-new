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
import API_WRAPPER from "../../api";
import { debouncedShowToast } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

const LandingPage = () => {
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const response = await API_WRAPPER.get("products/get-all-products");
      if (response.status === 200) {
        return response.data; // Return the entire data object
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
      throw error; // Rethrow the error to be captured by React Query
    }
  };

  const {
    data: productsList,
    isLoading,
    error,
  } = useQuery("get-all-products", getAllProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
        secondaryHeadingOne="Diwali Sale Coming"
        secondaryHeadingTwo="Smartphone"
        secondarySubHeadingOne="with touch"
        tertioryHeadingOne="Diwali Sale Coming"
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

      <div className="flex flex-col md:flex-row md:justify-between mt-5">
        <ProductCarosel className="flex-1" items={caroselMapppingDailyDeals} />
        <div className="grid bg-white grid-cols-5 gap-4 mt-5 w-full shadow-xl border-2 ">
          <div className="col-span-5">
            <Tabs
              alignCenter
              tabs={[
                {
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Item 1 */}

                      {productsList?.slice(0, 8).map((product) => (
                        <div
                          key={product._id}
                          className="w-full cursor-pointer col-span-1 bg-white p-4 rounded-lg shadow-md"
                          onClick={() =>
                            navigate(`productInfo/${product.slug}`)
                          }
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              className="w-24 h-24 rounded-md"
                              src={product.coverImage}
                              alt="Product"
                            />
                            <div className="flex-grow">
                              <h2 className="text-lg font-medium text-neutral-700">
                                {product.name}
                              </h2>
                              <div className="text-xl font-medium text-violet-900"></div>
                              <div className="flex items-center space-x-4 mt-2">
                                <Ratings rating={4} />
                                {/* <div className="border rounded-full p-2">
                                  <ShopIcon />
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                  label: "CONTENT 1",
                },
                {
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Item 1 */}
                      {productsList?.slice(8, 16)?.map((product) => (
                        <div
                          key={product._id}
                          className="w-full md:col-span-1 cursor-pointer bg-white p-4 rounded-lg shadow-md"
                          onClick={() =>
                            navigate(`productInfo/${product.slug}`)
                          }
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              className="w-24 h-24 rounded-md"
                              src={product.coverImage}
                              alt="Product"
                            />
                            <div className="flex-grow">
                              <h2 className="text-lg font-medium text-neutral-700">
                                {product.name}
                              </h2>
                              <div className="text-xl font-medium text-violet-900"></div>
                              <div className="flex items-center space-x-4 mt-2">
                                <Ratings rating={4} />
                                {/* <div className="border rounded-full p-2">
                                  <ShopIcon />
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                  label: "CONTENT 2",
                },
                {
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Item 1 */}
                      {productsList?.slice(16, 24)?.map((product) => (
                        <div
                          key={product._id}
                          className="w-full col-span-1 cursor-pointer bg-white p-4 rounded-lg shadow-md"
                          onClick={() =>
                            navigate(`productInfo/${product.slug}`)
                          }
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              className="w-24 h-24 rounded-md"
                              src={product.coverImage}
                              alt="Product"
                            />
                            <div className="flex-grow">
                              <h2 className="text-lg font-medium text-neutral-700">
                                {product.name}
                              </h2>
                              <div className="text-xl font-medium text-violet-900"></div>
                              <div className="flex items-center space-x-4 mt-2">
                                <Ratings rating={4} />
                                {/* <div className="border rounded-full p-2">
                                  <ShopIcon />
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                  label: "CONTENT 3",
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* <ProductsListWithFilters
        heading="Top Seasonal Gifts"
        filters={productListFiltersAndProducts.filters}
        products={productListFiltersAndProducts.products}
      /> */}

      <GradiantCardList cardData={gradiantCardListCardData} />

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

      <div className="flex justify-between  mt-5">
        <div className="flex flex-col md:flex-row ">
          <SingleTab
            productsList={productsList?.slice(10, 20)}
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
