import { nanoid } from "nanoid";
import { PATHS } from "./paths";
import {
  AdminDashboard,
  Cart,
  Categories,
  Checkouts,
  CmsAndSeo,
  Collection,
  CollectionConditions,
  CouponsAndDiscounts,
  Couriers,
  Customers,
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
} from "../pages";
import Replacement from "../pages/admin/Replacement";

// admin routes
export const adminRoutes = [
  {
    id: nanoid(),
    path: PATHS.adminCart,
    Component: Cart,
  },
  {
    id: nanoid(),
    path: PATHS.adminCategories,
    Component: Categories,
  },
  {
    id: nanoid(),
    path: PATHS.adminCheckout,
    Component: Checkouts,
  },
  {
    id: nanoid(),
    path: PATHS.adminCmsAndSeo,
    Component: CmsAndSeo,
  },
  {
    id: nanoid(),
    path: PATHS.adminCollection,
    Component: Collection,
  },
  {
    id: nanoid(),
    path: PATHS.adminCollectionConditions,
    Component: CollectionConditions,
  },
  {
    id: nanoid(),
    path: PATHS.adminCouponsAndDiscounts,
    Component: CouponsAndDiscounts,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddDiscount,
    Component: AddDiscount,
  },
  {
    id: nanoid(),
    path: PATHS.adminCouriers,
    Component: Couriers,
  },
  {
    id: nanoid(),
    path: PATHS.adminDashboard,
    Component: AdminDashboard,
  },
  {
    id: nanoid(),
    path: PATHS.adminEmailMarketing,
    Component: EmailMarketing,
  },
  {
    id: nanoid(),
    path: PATHS.adminOrderManagement,
    Component: OrderManagement,
  },
  {
    id: nanoid(),
    path: PATHS.adminPayments,
    Component: Payments,
  },
  {
    id: nanoid(),
    path: PATHS.adminProductInventory,
    Component: ProductInventory,
  },
  {
    id: nanoid(),
    path: PATHS.adminProductManagement,
    Component: ProductManagement,
  },
  {
    id: nanoid(),
    path: PATHS.adminRefund,
    Component: Refund,
  },
  {
    id: nanoid(),
    path: PATHS.adminReplacement,
    Component: Replacement,
  },
  {
    id: nanoid(),
    path: PATHS.adminReviews,
    Component: Reviews,
  },
  {
    id: nanoid(),
    path: PATHS.adminShipments,
    Component: Shipments,
  },
  {
    id: nanoid(),
    path: PATHS.adminVendor,
    Component: Vendor,
  },
  {
    id: nanoid(),
    path: PATHS.adminSupport,
    Component: Support,
  },
  {
    id: nanoid(),
    path: PATHS.adminCustomer,
    Component: Customers,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddProducts,
    Component: AddProduct,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddCategory,
    Component: AddCategory,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddAttributes,
    Component: AddAttributes,
  },
  {
    id: nanoid(),
    path: PATHS.adminAttribute,
    Component: Attribute,
  },
];
