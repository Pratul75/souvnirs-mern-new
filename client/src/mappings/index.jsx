import { PATHS } from "../Routes/paths";
import {


} from "../icons/sidebarIcons";


import { BiPackage, BiCategory, BiSolidDiscount, BiSolidDashboard, BiSolidCollection, BiSupport, BiSolidHeart, BiSolidCoupon } from "react-icons/bi"
import { MdReviews, MdFeaturedPlayList, MdPayment, MdShoppingCart, MdShoppingCartCheckout, MdInventory2, MdOutlineStore, MdAttachEmail } from "react-icons/md"
import { TbPackage, TbTruckDelivery, TbReplace } from "react-icons/tb"
import { SiCraftcms } from "react-icons/si"
import { FiUsers } from "react-icons/fi"
import { RiRefund2Fill } from "react-icons/ri"
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
    Icon: BiSolidDiscount
    ,
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
