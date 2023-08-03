import { PATHS } from "../Routes/paths";
import {
  OrderManagementIcon,
  AttributeIcon,
  ShipmentsIcon,
  RefundIcon,
  ReplacementIcon,
  PaymentsIcon,
  CustomerIcon,
  CmsSeoIcon,
  CouponDiscountIcon,
  EmailMarketingIcon,
  CouriersIcon,
  VendorIcon,
  ProductInventoryIcon,
  SupportIcon,
} from "../icons/sidebarIcons";

import { BiPackage, BiCategory, BiSolidCollection } from "react-icons/bi"
import { MdReviews, MdShoppingCart, MdShoppingCartCheckout } from "react-icons/md"
// admin sidebar mapping
export const adminSidebarMapping = [
  {
    title: "Dashboard",
    navLink: PATHS.adminDashboard,
    Icon: OrderManagementIcon,
  },
  {
    title: "Product Management",
    navLink: PATHS.adminProductManagement,
    Icon: BiPackage,
  },
  {
    title: "Order Management",
    navLink: PATHS.adminOrderManagement,
    Icon: OrderManagementIcon,
  },
  {
    title: "Categories",
    navLink: PATHS.adminCategories,
    Icon: BiCategory,
  },
  {
    title: "Attributes",
    navLink: PATHS.adminAttribute,
    Icon: AttributeIcon,
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
    Icon: ShipmentsIcon,
  },
  {
    title: "Refund",
    navLink: PATHS.adminRefund,
    Icon: RefundIcon,
  },
  {
    title: "Replacement",
    navLink: PATHS.adminReplacement,
    Icon: ReplacementIcon,
  },
  {
    title: "Payments",
    navLink: PATHS.adminPayments,
    Icon: PaymentsIcon,
  },
  {
    title: "Customer",
    navLink: PATHS.adminCustomer,
    Icon: CustomerIcon,
  },
  {
    title: "CMS & SEO",
    navLink: PATHS.adminCmsAndSeo,
    Icon: CmsSeoIcon,
  },
  {
    title: "Discounts",
    navLink: PATHS.adminDiscounts,
    Icon: CouponDiscountIcon,
  },
  {
    title: "Coupons",
    navLink: PATHS.adminCoupons,
    Icon: CouponDiscountIcon,
  },
  {
    title: "Wishlist",
    navLink: PATHS.adminWishlist,
    Icon: CouponDiscountIcon,
  },

  {
    title: "Email Marketing",
    navLink: PATHS.adminEmailMarketing,
    Icon: EmailMarketingIcon,
  },
  {
    title: "Couriers",
    navLink: PATHS.adminCouriers,
    Icon: CouriersIcon,
  },
  {
    title: "Vendor",
    navLink: PATHS.adminVendor,
    Icon: VendorIcon,
  },
  {
    title: "Product Inventory",
    navLink: PATHS.adminProductInventory,
    Icon: ProductInventoryIcon,
  },
  {
    title: "Support",
    navLink: PATHS.adminSupport,
    Icon: SupportIcon,
  },
];

// vendor sidebar mapping
export const vendorSidebarMapping = [
  {
    title: "Vendor Dashboard",
    navLink: PATHS.vendorDashboard,
    Icon: OrderManagementIcon,
  },
  {
    title: "Product Management",
    navLink: PATHS.vendorProductManagement,
    Icon: ProductInventoryIcon,
  },
  {
    title: "Order Management",
    navLink: PATHS.vendorOrderManagement,
    Icon: OrderManagementIcon,
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
    Icon: ShipmentsIcon,
  },
  {
    title: "Product Inventory",
    navLink: PATHS.vendorProductInventory,
    Icon: ProductInventoryIcon,
  },
  {
    title: "Discounts",
    navLink: PATHS.vendorDiscounts,
    Icon: CouponDiscountIcon,
  },
  {
    title: "Coupons",
    navLink: PATHS.vendorCoupons,
    Icon: CouponDiscountIcon,
  },
  {
    title: "Refund",
    navLink: PATHS.vendorRefund,
    Icon: RefundIcon,
  },
];

// customer sidebar mapping
export const customerSidebarMapping = [
  {
    title: "Dashboard",
    navLink: PATHS.customerDashboard,
    Icon: BiPackage,
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
    Icon: CustomerIcon,
  },
  {
    title: "Payments",
    navLink: PATHS.customerPayments,
    Icon: PaymentsIcon,
  },
  {
    title: "Profile",
    navLink: PATHS.customerProfile,
    Icon: SupportIcon,
  },
  {
    title: "Refunds",
    navLink: PATHS.customerRefunds,
    Icon: RefundIcon,
  },
  {
    title: "Replacement",
    navLink: PATHS.customerReplacements,
    Icon: ReplacementIcon,
  },
  {
    title: "Wishlist",
    navLink: PATHS.customerWishlist,
    Icon: VendorIcon,
  },
];
