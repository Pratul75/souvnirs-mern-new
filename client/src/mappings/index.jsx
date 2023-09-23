import { PATHS } from "../Routes/paths";

import {
  BiPackage,
  BiCategory,
  BiSolidDiscount,
  BiSolidDashboard,
  BiSolidCollection,
  BiSupport,
  BiSolidHeart,
  BiSolidCoupon,
} from "react-icons/bi";
import {
  MdReviews,
  MdFeaturedPlayList,
  MdPayment,
  MdShoppingCart,
  MdShoppingCartCheckout,
  MdInventory2,
  MdOutlineStore,
  MdAttachEmail,
  MdOutlinePermMedia,
} from "react-icons/md";
import { TbPackage, TbTruckDelivery, TbReplace } from "react-icons/tb";
import { SiCraftcms } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { RiRefund2Fill } from "react-icons/ri";
import { nanoid } from "nanoid";
import GiftOnePng from "../assets/shop/cardImages/giftOne.png";
import One from "../assets/shop/cardImages/1.jpg";
import Two from "../assets/shop/cardImages/2.jpg";
import Three from "../assets/shop/cardImages/3.jpg";
import Four from "../assets/shop/cardImages/4.jpg";
import LenovoImage from "../assets/shop/brandImages/lenovo.png";
import PrestigeLogo from "../assets/shop/brandImages/prestigeLogo.png";
import VeromodaLogo from "../assets/shop/brandImages/veromodaLogo.png";
import BorosilLogo from "../assets/shop/brandImages/borosilLogo.png";
import XechLogo from "../assets/shop/brandImages/xechLogo.png";
import BoatLogo from "../assets/shop/brandImages/boatLogo.png";
import ParkAvenueLogo from "../assets/shop/brandImages/parkavenue.png";
import PumaLogo from "../assets/shop/brandImages/pumaLogo.png";
import BajajLogo from "../assets/shop/brandImages/bajajLogo.png";
import HavellsLogo from "../assets/shop/brandImages/havellsLogo.png";
import PoliceLogo from "../assets/shop/brandImages/policeLogo.png";
import BeardLogo from "../assets/shop/brandImages/beardLogo.png";
import WildcraftLogo from "../assets/shop/brandImages/wildcraftLogo.png";
import PigeonLogo from "../assets/shop/brandImages/pigeonLogo.png";
import WonderChefLogo from "../assets/shop/brandImages/wonderchefLogo.png";
import TitanLogo from "../assets/shop/brandImages/titanLogo.png";
import ImageGridImageOne from "../assets/shop/cardImages/imageGridImageOne.png";
import ImageGridImageTwo from "../assets/shop/cardImages/imageGridImageTwo.png";
import ImageGridImageThree from "../assets/shop/cardImages/imageGridImageThree.png";
import ImageGridImageFour from "../assets/shop/cardImages/imagGridImageFour.png";
import GradiantCardImgOne from "../assets/shop/productImages/gradiantCardImgOne.png";
import GradiantCardImgTwo from "../assets/shop/productImages/gradiantCardImgTwo.png";
import { BsMenuApp } from "react-icons/bs";
import TexturePink from "../assets/shop/bannerImages/texturePink.jpg";
import TexturePurple from "../assets/shop/bannerImages/texturePurple.jpg.png";
import TexturePaleYellow from "../assets/shop/bannerImages/texturePaleYellow.png";
import { Ratings, TimerComponent } from "../components";
import { ShopIcon } from "../icons";
import GiftFour from "../assets/shop/productImages/giftFour.png";
import GiftFive from "../assets/shop/productImages/giftFive.png";
import GiftSix from "../assets/shop/productImages/giftSix.png";
// admin sidebar mapping
export const adminSidebarMapping = [
  {
    title: "Dashboard",
    navLink: PATHS.adminDashboard,
    Icon: BiSolidDashboard,
  },
  {
    title: "Product Management",
    navLink: PATHS.adminProductManagement,
    Icon: BiPackage,
  },
  {
    title: "Media",
    navLink: PATHS.adminMedia,
    Icon: MdOutlinePermMedia,
  },
  {
    title: "Menus",
    navLink: PATHS.adminMenus,
    Icon: BsMenuApp,
  },
  {
    title: "Order Management",
    navLink: PATHS.adminOrderManagement,
    Icon: TbTruckDelivery,
  },
  {
    title: "Categories",
    navLink: PATHS.adminCategories,
    Icon: BiCategory,
  },
  {
    title: "Commissions",
    navLink: PATHS.adminCommissions,
    Icon: BiSupport,
  },
  {
    title: "Attributes",
    navLink: PATHS.adminAttribute,
    Icon: MdFeaturedPlayList,
  },
  {
    title: "Reviews",
    navLink: PATHS.adminReviews,
    Icon: MdReviews,
  },
  {
    title: "Advertisements",
    navLink: PATHS.adminAdvertisements,
    Icon: MdReviews,
  },
  {
    title: "Collection",
    navLink: PATHS.adminCollection,
    Icon: BiSolidCollection,
  },
  {
    title: "Collection Conditions",
    navLink: PATHS.adminCollectionConditions,
    Icon: BiSolidCollection,
  },
  {
    title: "Cart",
    navLink: PATHS.adminCart,
    Icon: MdShoppingCart,
  },
  {
    title: "Checkout",
    navLink: PATHS.adminCheckout,
    Icon: MdShoppingCartCheckout,
  },
  {
    title: "Shipments",
    navLink: PATHS.adminShipments,
    Icon: TbTruckDelivery,
  },
  {
    title: "Refund",
    navLink: PATHS.adminRefund,
    Icon: RiRefund2Fill,
  },
  {
    title: "Replacement",
    navLink: PATHS.adminReplacement,
    Icon: TbReplace,
  },
  {
    title: "Payments",
    navLink: PATHS.adminPayments,
    Icon: MdPayment,
  },
  {
    title: "Customer",
    navLink: PATHS.adminCustomer,
    Icon: FiUsers,
  },
  {
    title: "CMS & SEO",
    navLink: PATHS.adminCmsAndSeo,
    Icon: SiCraftcms,
  },
  {
    title: "Discounts",
    navLink: PATHS.adminDiscounts,
    Icon: BiSolidDiscount,
  },
  {
    title: "Coupons",
    navLink: PATHS.adminCoupons,
    Icon: BiSolidCoupon,
  },
  {
    title: "Wishlist",
    navLink: PATHS.adminWishlist,
    Icon: BiSolidHeart,
  },

  {
    title: "Email Marketing",
    navLink: PATHS.adminEmailMarketing,
    Icon: MdAttachEmail,
  },
  {
    title: "Couriers",
    navLink: PATHS.adminCouriers,
    Icon: TbPackage,
  },
  {
    title: "Vendor",
    navLink: PATHS.adminVendor,
    Icon: MdOutlineStore,
  },
  {
    title: "Product Inventory",
    navLink: PATHS.adminProductInventory,
    Icon: MdInventory2,
  },
  {
    title: "Support",
    navLink: PATHS.adminSupport,
    Icon: BiSupport,
  },
];

// vendor sidebar mapping
export const vendorSidebarMapping = [
  {
    title: "Vendor Dashboard",
    navLink: PATHS.vendorDashboard,
    Icon: BiSolidDashboard,
  },
  {
    title: "Product Management",
    navLink: PATHS.vendorProductManagement,
    Icon: MdInventory2,
  },
  {
    title: "Media",
    navLink: PATHS.vendorMedia,
    Icon: MdOutlinePermMedia,
  },
  {
    title: "Order Management",
    navLink: PATHS.vendorOrderManagement,
    Icon: TbTruckDelivery,
  },
  {
    title: "Cart",
    navLink: PATHS.vendorCart,
    Icon: MdShoppingCart,
  },
  {
    title: "Checkouts",
    navLink: PATHS.vendorCheckout,
    Icon: MdShoppingCartCheckout,
  },
  {
    title: "Shipments",
    navLink: PATHS.vendorShipments,
    Icon: TbTruckDelivery,
  },
  {
    title: "Product Inventory",
    navLink: PATHS.vendorProductInventory,
    Icon: MdInventory2,
  },
  {
    title: "Discounts",
    navLink: PATHS.vendorDiscounts,
    Icon: BiSolidDiscount,
  },
  {
    title: "Coupons",
    navLink: PATHS.vendorCoupons,
    Icon: BiSolidCoupon,
  },
  {
    title: "Refund",
    navLink: PATHS.vendorRefund,
    Icon: RiRefund2Fill,
  },
];

// customer sidebar mapping
export const customerSidebarMapping = [
  {
    title: "Dashboard",
    navLink: PATHS.customerDashboard,
    Icon: BiSolidDashboard,
  },
  {
    title: "Cart",
    navLink: PATHS.customerCart,
    Icon: MdShoppingCart,
  },
  {
    title: "Checkouts",
    navLink: PATHS.customerCheckouts,
    Icon: MdShoppingCartCheckout,
  },
  {
    title: "Orders",
    navLink: PATHS.customerOrders,
    Icon: FiUsers,
  },
  {
    title: "Payments",
    navLink: PATHS.customerPayments,
    Icon: MdPayment,
  },
  {
    title: "Profile",
    navLink: PATHS.customerProfile,
    Icon: BiSupport,
  },
  {
    title: "Refunds",
    navLink: PATHS.customerRefunds,
    Icon: RiRefund2Fill,
  },
  {
    title: "Replacement",
    navLink: PATHS.customerReplacements,
    Icon: TbReplace,
  },
  {
    title: "Wishlist",
    navLink: PATHS.customerWishlist,
    Icon: MdOutlineStore,
  },
];

// SHOP MAPPINGS ____________________________________

// product list filters in tabs for ProductListWithFilters component
export const productListFiltersAndProducts = {
  filters: [
    {
      id: nanoid(),
      name: "Seasonal",
    },
    {
      id: nanoid(),
      name: "Electronics",
    },
    {
      id: nanoid(),
      name: "Budget",
    },
  ],
  products: [
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
      discountPrice: "99",
      rating: 4.5,
      badgeColor: "badge-info",
      badgeText: "-20%",
      image: GiftOnePng,
    },
  ],
};

// gradiant catrd list data for GradiantCardList component
export const gradiantCardListCardData = [
  {
    id: nanoid(),
    title: "",
    heading: "Diary and Pen combo",
    subheading: "",
    background: TexturePurple,
    image: GiftFour,
    // Link will be changed in future to desired page
    link: "/productInfo/98d635a6",
    btnColorCode: "653A4F",
  },
  {
    id: nanoid(),
    title: "",
    heading: "Gift Hampers",
    subheading: "",
    background: TexturePink,
    // add spartwatch image
    image: GiftFive,
    // Link will be changed in future to desired page
    link: "/collection/Gift%20Hamper",
    btnColorCode: "8d473f",
  },
  {
    id: nanoid(),
    title: "",
    heading: "Electronics",
    subheading: "",
    background: TexturePaleYellow,
    image: GiftSix,
    // Link will be changed in future to desired page
    link: "/collection/smartwatch",
    btnColorCode: "83541e",
  },
];

// TODO: need to convert all items into components
export const caroselMapppingDailyDeals = [
  <div
    className="flex flex-col md:flex-row gap-1 p-6 bg-base-100 "
    key={nanoid()}
  >
    <div className="flex item-center justify-center w-full">
      <div className="p-4">
        <TimerComponent date={"2023-10-01"} />
        <h3>Headphones Supersonic New Adi</h3>
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-2xl text-shopPrimaryColor">₹249</h4>
          <div className="cursor-pointer border p-2 rounded-full w-16 flex justify-center items-center ">
            <ShopIcon />
          </div>
        </div>
        <Ratings rating={3.5} />
      </div>
    </div>
    <img className=" aspect-square" src={GiftOnePng} alt="" />
  </div>,
  <div
    className="flex flex-col md:flex-row  gap-1 p-6 bg-base-100 "
    key={nanoid()}
  >
    <div className="flex item-center justify-center w-full">
      <div className="p-4">
        <TimerComponent date={"2023-10-01"} />
        <h3>Headphones Supersonic New Adi</h3>
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-2xl text-shopPrimaryColor">₹249</h4>
          <div className="cursor-pointer border p-2 rounded-full w-16 flex justify-center items-center ">
            <ShopIcon />
          </div>
        </div>
        <Ratings rating={3.5} />
      </div>
      <div></div>
    </div>
    <img className=" aspect-square" src={GiftOnePng} alt="" />
  </div>,
  <div
    className="flex flex-col md:flex-row gap-1 p-6 bg-base-100 "
    key={nanoid()}
  >
    <div className="flex item-center justify-center w-full">
      <div className="p-4">
        <TimerComponent date={"2023-10-01"} />
        <h3>Headphones Supersonic New Adi</h3>
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-2xl text-shopPrimaryColor">₹249</h4>
          <div className="cursor-pointer border p-2 rounded-full w-16 flex justify-center items-center ">
            <ShopIcon />
          </div>
        </div>
        <Ratings rating={3.5} />
      </div>
      <div></div>
    </div>
    <img className=" aspect-square" src={GiftOnePng} alt="" />
  </div>,
];

export const BrandsCardImageList = [
  {
    image: PrestigeLogo,
    alt: "prestige",
  },
  {
    image: VeromodaLogo,
    alt: "veromoda",
  },
  {
    image: BorosilLogo,
    alt: "borosil",
  },
  {
    image: LenovoImage,
    alt: "lenovo",
  },
  {
    image: XechLogo,
    alt: "xech",
  },
  {
    image: BoatLogo,
    alt: "boat",
  },
  {
    image: ParkAvenueLogo,
    alt: "parkavenue",
  },
  {
    image: TitanLogo,
    alt: "titan",
  },
  {
    image: PumaLogo,
    alt: "puma",
  },
  {
    image: BajajLogo,
    alt: "bajaj",
  },
  {
    image: HavellsLogo,
    alt: "havells",
  },
  {
    image: PoliceLogo,
    alt: "police",
  },
  {
    image: BeardLogo,
    alt: "beard",
  },
  {
    image: WildcraftLogo,
    alt: "wildcraft",
  },
  {
    image: PigeonLogo,
    alt: "pigeon",
  },
  {
    image: WonderChefLogo,
    alt: "wonderchef",
  },
];

export const blogCardData = [
  {
    id: nanoid(),
    blogImage: One,
    date: "22  October  2023",
    views: 100,
    heading: "What should I know about...",
    paragraph:
      "lorem ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa",
    buttonHandler: () => {
      console.log("CLICKED ON BLOG CARD");
    },
  },
  {
    id: nanoid(),
    blogImage: Two,
    date: "22  October  2023",
    views: 100,
    heading: "What should I know about...",
    paragraph:
      "lorem ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa",
    buttonHandler: () => {
      console.log("CLICKED ON BLOG CARD");
    },
  },
  {
    id: nanoid(),
    blogImage: Three,
    date: "22  October  2023",
    views: 100,
    heading: "What should I know about...",
    paragraph:
      "lorem ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa",
    buttonHandler: () => {
      console.log("CLICKED ON BLOG CARD");
    },
  },
  {
    id: nanoid(),
    blogImage: Four,
    date: "22  October  2023",
    views: 100,
    heading: "What should I know about...",
    paragraph:
      "lorem ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa",
    buttonHandler: () => {
      console.log("CLICKED ON BLOG CARD");
    },
  },
];

export const ImageGridMapping = [
  {
    image: ImageGridImageFour,
    alt: "giftOne",
  },
  {
    image: ImageGridImageOne,
    alt: "giftOne",
  },
  {
    image: ImageGridImageTwo,
    alt: "giftOne",
  },
  {
    image: ImageGridImageThree,
    alt: "giftOne",
  },
  {
    image: ImageGridImageFour,
    alt: "giftOne",
  },
  {
    image: ImageGridImageOne,
    alt: "giftOne",
  },
  {
    image: ImageGridImageThree,
    alt: "giftOne",
  },
];
