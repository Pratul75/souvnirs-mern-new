import { nanoid } from "nanoid";
import { PATHS } from "./paths";

import {
  // admin routes
  AdminDashboard,
  Cart,
  Categories,
  Checkouts,
  CmsAndSeo,
  Collection,
  CollectionConditions,
  Coupons,
  Couriers,
  Customers,
  Discounts,
  EmailMarketing,
  OrderManagement,
  Payments,
  ProductInventory,
  ProductManagement,
  Refund,
  Reviews,
  Shipments,
  Vendor,
  Support,
  AddProduct,
  AddCategory,
  AddAttributes,
  Attribute,
  AddDiscount,
  AddCoupon,
  AddCollection,

  // vendor routes
  VendorDashboard,
  VendorProductManagement,
  VendorOrderManagement,
  VendorCoupons,
  VendorDiscounts,
  VendorCart,
  VendorRefund,
  VendorCheckout,
  VendorShipments,
  VendorProductInventory,
  vendorAddProduct,

  // customer routes
  CustomerCartList,
  CustomerCheckouts,
  CustomerDashboard,
  CustomerOrders,
  CustomerPayments,
  CustomerProfile,
  CustomerRefunds,
  CustomerReplacements,
  CustomerWishlist,
} from "../pages";
import Replacement from "../pages/admin/Replacement";
import AddCustomer from "../pages/admin/AddCustomer";
import AddVendor from "../pages/admin/AddVendor";
// admin routes
export const adminRoutes = [
  {
    id: nanoid(),
    path: PATHS.adminCart,
    defaultRole: "admin",
    Component: Cart,
  },
  {
    id: nanoid(),
    path: PATHS.adminCategories,
    defaultRole: "admin",
    Component: Categories,
  },
  {
    id: nanoid(),
    path: PATHS.adminCheckout,
    defaultRole: "admin",
    Component: Checkouts,
  },
  {
    id: nanoid(),
    path: PATHS.adminCmsAndSeo,
    defaultRole: "admin",
    Component: CmsAndSeo,
  },
  {
    id: nanoid(),
    path: PATHS.adminCollection,
    defaultRole: "admin",
    Component: Collection,
  },
  {
    id: nanoid(),
    path: PATHS.adminCollectionConditions,
    defaultRole: "admin",
    Component: CollectionConditions,
  },
  {
    id: nanoid(),
    path: PATHS.adminCoupons,
    defaultRole: "admin",
    Component: Coupons,
  },
  {
    id: nanoid(),
    path: PATHS.adminDiscounts,
    defaultRole: "admin",
    Component: Discounts,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddDiscount,
    defaultRole: "admin",
    Component: AddDiscount,
  },
  {
    id: nanoid(),
    path: PATHS.adminCouriers,
    defaultRole: "admin",
    Component: Couriers,
  },
  {
    id: nanoid(),
    path: PATHS.adminDashboard,
    defaultRole: "admin",
    Component: AdminDashboard,
  },
  {
    id: nanoid(),
    path: PATHS.adminEmailMarketing,
    defaultRole: "admin",
    Component: EmailMarketing,
  },
  {
    id: nanoid(),
    path: PATHS.adminOrderManagement,
    defaultRole: "admin",
    Component: OrderManagement,
  },
  {
    id: nanoid(),
    path: PATHS.adminPayments,
    defaultRole: "admin",
    Component: Payments,
  },
  {
    id: nanoid(),
    path: PATHS.adminProductInventory,
    defaultRole: "admin",
    Component: ProductInventory,
  },
  {
    id: nanoid(),
    path: PATHS.adminProductManagement,
    defaultRole: "admin",
    Component: ProductManagement,
  },
  {
    id: nanoid(),
    path: PATHS.adminRefund,
    defaultRole: "admin",
    Component: Refund,
  },
  {
    id: nanoid(),
    path: PATHS.adminCreateCustomer,
    defaultRole: "admin",
    Component: AddCustomer,
  },
  {
    id: nanoid(),
    path: PATHS.adminCreateVendor,
    defaultRole: "admin",
    Component: AddVendor,
  },
  {
    id: nanoid(),
    path: PATHS.adminReplacement,
    defaultRole: "admin",
    Component: Replacement,
  },
  {
    id: nanoid(),
    path: PATHS.adminReviews,
    defaultRole: "admin",
    Component: Reviews,
  },
  {
    id: nanoid(),
    path: PATHS.adminShipments,
    defaultRole: "admin",
    Component: Shipments,
  },
  {
    id: nanoid(),
    path: PATHS.adminVendor,
    defaultRole: "admin",
    Component: Vendor,
  },
  {
    id: nanoid(),
    path: PATHS.adminSupport,
    defaultRole: "admin",
    Component: Support,
  },
  {
    id: nanoid(),
    path: PATHS.adminCustomer,
    defaultRole: "admin",
    Component: Customers,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddProducts,
    defaultRole: "admin",
    Component: AddProduct,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddCategory,
    defaultRole: "admin",
    Component: AddCategory,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddAttributes,
    defaultRole: "admin",
    Component: AddAttributes,
  },
  {
    id: nanoid(),
    path: PATHS.adminAttribute,
    defaultRole: "admin",
    Component: Attribute,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddCoupon,
    defaultRole: "admin",
    Component: AddCoupon,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddCollection,
    defaultRole: "admin",
    Component: AddCollection,
  },
];

// vendor routes
export const vendorRoutes = [
  {
    id: nanoid(),
    path: PATHS.vendorDashboard,
    defaultRole: "vendor",
    Component: VendorDashboard,
  },
  {
    id: nanoid(),
    path: PATHS.vendorProductManagement,
    defaultRole: "vendor",
    Component: VendorProductManagement,
  },
  {
    id: nanoid(),
    path: PATHS.vendorOrderManagement,
    defaultRole: "vendor",
    Component: VendorOrderManagement,
  },
  {
    id: nanoid(),
    path: PATHS.vendorDiscounts,
    defaultRole: "vendor",
    Component: VendorDiscounts,
  },
  {
    id: nanoid(),
    path: PATHS.vendorCoupons,
    defaultRole: "vendor",
    Component: VendorCoupons,
  },
  {
    id: nanoid(),
    path: PATHS.vendorCart,
    Component: VendorCart,
    defaultRole: "vendor",
  },
  {
    id: nanoid(),
    path: PATHS.vendorRefund,
    Component: VendorRefund,
    defaultRole: "vendor",
  },
  {
    id: nanoid(),
    path: PATHS.vendorCheckout,
    Component: VendorCheckout,
    defaultRole: "vendor",
  },
  {
    id: nanoid(),
    path: PATHS.vendorShipments,
    Component: VendorShipments,
    defaultRole: "vendor",
  },
  {
    id: nanoid(),
    path: PATHS.vendorProductInventory,
    Component: VendorProductInventory,
    defaultRole: "vendor",
  },
  {
    id: nanoid(),
    path: PATHS.vendorAddProducts,
    Component: vendorAddProduct,
    defaultRole: "vendor",
  },
];

// customer routes
export const customerRoutes = [
  {
    id: nanoid(),
    path: PATHS.customerCart,
    Component: CustomerCartList,
    defaultRole: "customer",
  },
  {
    id: nanoid(),
    path: PATHS.customerCheckouts,
    Component: CustomerCheckouts,
    defaultRole: "customer",
  },
  {
    id: nanoid(),
    path: PATHS.customerDashboard,
    Component: CustomerDashboard,
    defaultRole: "customer",
  },
  {
    id: nanoid(),
    path: PATHS.customerOrders,
    Component: CustomerOrders,
    defaultRole: "customer",
  },
  {
    id: nanoid(),
    path: PATHS.customerPayments,
    Component: CustomerPayments,
    defaultRole: "customer",
  },
  {
    id: nanoid(),
    path: PATHS.customerProfile,
    Component: CustomerProfile,
    defaultRole: "customer",
  },
  {
    id: nanoid(),
    path: PATHS.customerRefunds,
    Component: CustomerRefunds,
    defaultRole: "customer",
  },
  {
    id: nanoid(),
    path: PATHS.customerReplacements,
    Component: CustomerReplacements,
    defaultRole: "customer",
  },
  {
    id: nanoid(),
    path: PATHS.customerWishlist,
    Component: CustomerWishlist,
    defaultRole: "customer",
  },
];
