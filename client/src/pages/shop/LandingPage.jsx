import {
  HeaderCards,
  FeaturesCard,
  ProductsListWithFilters,
} from "../../components";
import BigCardBackground from "../../assets/shop/cardImages/bigCardBackground.jpg";
import SmallCardBackgroundOne from "../../assets/shop/cardImages/smallCardBackground.jpg";
import SmallCardBackgroundTwo from "../../assets/shop/cardImages/smallCardBackgroundTwo.png";
import GiftOnePng from "../../assets/shop/cardImages/giftOne.png";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { BsBoxSeam, BsCreditCard2Front } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { nanoid } from "nanoid";

const LandingPage = () => {
  return (
    <div className="w-screen h-auto">
      <HeaderCards
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
      />
      <FeaturesCard
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
        filters={[
          {
            id: nanoid(),
            name: "Audio",
          },
          {
            id: nanoid(),
            name: "Gaming",
          },
          {
            id: nanoid(),
            name: "Headphones",
          },
        ]}
        products={[
          {
            id: nanoid(),
            title: "Game Trigger Finger New",
            price: "260",
            discountPrice: "160",
            rating: 4.5,
            badgeColor: "badge-primary",
            badgeText: "-10% ",
            image: GiftOnePng,
          },
          {
            id: nanoid(),
            title: "Game Trigger Finger New",
            price: "260",
            discountPrice: "344",
            rating: 3,
            badgeColor: "badge-secondary",
            badgeText: "IN STOCK",
            image: GiftOnePng,
          },
          {
            id: nanoid(),
            title: "Game Trigger Finger New",
            price: "260",
            discountPrice: "100",
            rating: 4,
            badgeColor: "badge-warning",
            badgeText: "OUT OF STOCK",
            image: GiftOnePng,
          },
          {
            id: nanoid(),
            title: "Game Trigger Finger New",
            price: "260",
            discountPrice: "99",
            rating: 4.5,
            badgeColor: "badge-info",
            badgeText: "-20%",
            image: GiftOnePng,
          },
          {
            id: nanoid(),
            title: "Game Trigger Finger New",
            price: "260",
            discountPrice: "453",
            rating: 4.5,
            badgeColor: "badge-success",
            badgeText: "New",
            image: GiftOnePng,
          },
        ]}
      />
    </div>
  );
};

export default LandingPage;
