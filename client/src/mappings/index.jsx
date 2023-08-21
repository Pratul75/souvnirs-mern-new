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
import GradiantCardOneBackground from "../assets/gradiantImages/gradiantCardOne.png";
import GradiantCardTwoBackground from "../assets/gradiantImages/gradiantCardTwo.png";
import GradiantCardThreeBackground from "../assets/gradiantImages/gradiantCardThree.png";
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
import GradiantCardImgThree from "../assets/shop/productImages/GradiantCardImgThree.png";
import { BsMenuApp } from "react-icons/bs";
import ProductCardMini from "../components/shop/cards/ProductCardMini";

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
    title: "Spring Sale Coming",
    heading: "Smart Phone",
    subheading: "With Pen",
    background: "bg-blue-200",
    image: GradiantCardImgOne,
    // Link will be changed in future to desired page
    link: PATHS.landingPage,
  },
  {
    id: nanoid(),
    title: "Spring Sale Coming",
    heading: "New Smart Phone",
    subheading: "With Touch",
    background: "bg-green-200",
    image: GradiantCardImgTwo,
    // Link will be changed in future to desired page
    link: PATHS.landingPage,
  },
  {
    id: nanoid(),
    title: "Spring Sale Coming",
    heading: "Smart Watch",
    subheading: "Android",
    background: "bg-rose-200",
    image: GradiantCardImgThree,
    // Link will be changed in future to desired page
    link: PATHS.landingPage,
  },
];

// TODO: need to convert all items into components
export const caroselMapppingDailyDeals = [
  <div className="flex" key={nanoid()}>
    <div className="flex flex-col  gap-4 mt-4 py-2">
      <div className="flex justify-center md:justify-start gap-4 my-2">
        <div
          className="radial-progress flex w-20 h-20 md:w-32 md:h-32 flex-col items-center"
          style={{ "--value": 70 }}
        >
          <span className="font-extrabold text-2xl md:text-5xl text-gray-300">
            01
          </span>
          <p className=" text-lg md:text-xl">days</p>
        </div>

        <div
          className="radial-progress flex w-20 h-20 md:w-32 md:h-32 flex-col items-center"
          style={{ "--value": 70 }}
        >
          <span className="font-extrabold text-2xl md:text-5xl text-gray-300">
            01
          </span>
          <p className=" text-lg md:text-xl">days</p>
        </div>
        <div
          className="radial-progress flex w-20 h-20 md:w-32 md:h-32 flex-col items-center"
          style={{ "--value": 70 }}
        >
          <span className="font-extrabold text-2xl md:text-5xl text-gray-300">
            01
          </span>
          <p className=" text-lg md:text-xl">days</p>
        </div>
      </div>

      <ProductCardMini
        showBorder
        title="One plus smart Watch"
        image={GiftOnePng}
      />
    </div>
  </div>,
  <div className="flex" key={nanoid()}>
    <div className="flex flex-col  gap-4 mt-4 py-2">
      <div className="flex justify-center md:justify-start gap-4 my-2">
        <div
          className="radial-progress flex w-20 h-20 md:w-32 md:h-32 flex-col items-center"
          style={{ "--value": 70 }}
        >
          <span className="font-extrabold text-2xl md:text-5xl text-gray-300">
            01
          </span>
          <p className=" text-lg md:text-xl">days</p>
        </div>

        <div
          className="radial-progress flex w-20 h-20 md:w-32 md:h-32 flex-col items-center"
          style={{ "--value": 70 }}
        >
          <span className="font-extrabold text-2xl md:text-5xl text-gray-300">
            01
          </span>
          <p className=" text-lg md:text-xl">days</p>
        </div>
        <div
          className="radial-progress flex w-20 h-20 md:w-32 md:h-32 flex-col items-center"
          style={{ "--value": 70 }}
        >
          <span className="font-extrabold text-2xl md:text-5xl text-gray-300">
            01
          </span>
          <p className=" text-lg md:text-xl">days</p>
        </div>
      </div>

      <div className="mx-14 ml-10">
        <ProductCardMini
          showBorder
          title="One plus smart Watch"
          image={GiftOnePng}
        />
      </div>
    </div>
  </div>,
  <div className="flex" key={nanoid()}>
    <div className="flex flex-col  gap-4 mt-4 py-2">
      <div className="flex justify-center md:justify-start gap-4 my-2">
        <div
          className="radial-progress flex w-20 h-20 md:w-32 md:h-32 flex-col items-center"
          style={{ "--value": 70 }}
        >
          <span className="font-extrabold text-2xl md:text-5xl text-gray-300">
            01
          </span>
          <p className=" text-lg md:text-xl">days</p>
        </div>

        <div
          className="radial-progress flex w-20 h-20 md:w-32 md:h-32 flex-col items-center"
          style={{ "--value": 70 }}
        >
          <span className="font-extrabold text-2xl md:text-5xl text-gray-300">
            01
          </span>
          <p className=" text-lg md:text-xl">days</p>
        </div>
        <div
          className="radial-progress flex w-20 h-20 md:w-32 md:h-32 flex-col items-center"
          style={{ "--value": 70 }}
        >
          <span className="font-extrabold text-2xl md:text-5xl text-gray-300">
            01
          </span>
          <p className=" text-lg md:text-xl">days</p>
        </div>
      </div>

      <div>
        <ProductCardMini
          showBorder
          title="One plus smart Watch"
          image={GiftOnePng}
        />
      </div>
    </div>
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
    blogImage: GiftOnePng,
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
    blogImage: GiftOnePng,
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
    blogImage: GiftOnePng,
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
