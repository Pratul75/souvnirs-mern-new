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
  SupplierIcon,
  ProductInventoryIcon,
  InventoryManagementIcon,
  FinancialManagementIcon,
  AnalyticsIcon,
  SupportIcon,
  AuthenticationIcon,
  KnowledgeCenterIcon,
} from "../icons/sidebarIcons";

export const sidebarMapping = [
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
    title: "Coupons & Discount",
    navLink: PATHS.adminCouponsAndDiscounts,
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
    title: "Supplier",
    navLink: PATHS.adminSupply,
    Icon: SupplierIcon,
  },
  {
    title: "Product Inventory",
    navLink: PATHS.adminProductInventory,
    Icon: ProductInventoryIcon,
  },
  {
    title: "Inventory Management",
    navLink: PATHS.adminInventoryManagement,
    Icon: InventoryManagementIcon,
  },
  {
    title: "Financial Management",
    navLink: PATHS.adminFinancialManagement,
    Icon: FinancialManagementIcon,
  },
  {
    title: "Analytics",
    navLink: PATHS.adminAnalytics,
    Icon: AnalyticsIcon,
  },
  {
    title: "Support",
    navLink: PATHS.adminSupport,
    Icon: SupportIcon,
  },
  {
    title: "Authentication",
    navLink: PATHS.adminAuthentication,
    Icon: AuthenticationIcon,
  },
  {
    title: "Knowledge Center",
    navLink: PATHS.adminKnowledgeCenter,
    Icon: KnowledgeCenterIcon,
  },
];
