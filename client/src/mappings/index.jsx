import { PATHS } from "../Routes/paths";
import {
  OrderManagementIcon,
  ProductManagement,
  CategoriesIcon,
  AttributeIcon,
  ReviewsIcon,
  CollectionIcon,
  CartIcon,
  CheckoutIcon,
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
    Icon: ProductManagement,
  },
  {
    title: "Order Management",
    navLink: PATHS.adminOrderManagement,
    Icon: OrderManagementIcon,
  },
  {
    title: "Categories",
    navLink: PATHS.adminCategories,
    Icon: CategoriesIcon,
  },
  {
    title: "Attributes",
    navLink: PATHS.adminAttribute,
    Icon: AttributeIcon,
  },
  {
    title: "Reviews",
    navLink: PATHS.adminReviews,
    Icon: ReviewsIcon,
  },
  {
    title: "Collection",
    navLink: PATHS.adminCollection,
    Icon: CollectionIcon,
  },
  {
    title: "Collection Conditions",
    navLink: PATHS.adminCollectionConditions,
    Icon: CollectionIcon,
  },
  {
    title: "Cart",
    navLink: PATHS.adminCart,
    Icon: CartIcon,
  },
  {
    title: "Checkout",
    navLink: PATHS.adminCheckout,
    Icon: CheckoutIcon,
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
    navLink: PATHS.adminbCustomer,
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
export const vendorSidebarMapping = [];
