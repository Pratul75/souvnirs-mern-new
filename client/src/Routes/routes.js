import { nanoid } from "@reduxjs/toolkit";
import { PATHS } from "./paths";
import {
  AdminDashboard,
  Analytics,
  Attributes,
  Authentication,
  Cart,
  Categories,
  Checkouts,
  CmsAndSeo,
  Collection,
  CouponsAndDiscounts,
  Couriers,
  Customers,
  EmailMarketing,
  FinancialManagement,
  InventoryManagement,
  KnowledgeCenter,
  LoginPage,
  OrderManagement,
  Payments,
  ProductInventory,
  ProductManagement,
  Refund,
  RegisterPage,
  Replcement,
  Reviews,
  Shipments,
  Supply,
  Support,
} from "../pages";
import Replacement from "../pages/admin/Replacement";

export const adminRoutes = [
  {
    id: nanoid(),
    path: PATHS.adminAnalytics,
    Component: Analytics,
  },
  {
    id: nanoid(),
    path: PATHS.adminAuthentication,
    Component: Authentication,
  },
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
    path: PATHS.adminCouponsAndDiscounts,
    Components: CouponsAndDiscounts,
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
    path: PATHS.adminFinancialManagement,
    Component: FinancialManagement,
  },
  {
    id: nanoid(),
    path: PATHS.adminInventoryManagement,
    Component: InventoryManagement,
  },
  {
    id: nanoid(),
    path: PATHS.adminKnowledgeCenter,
    Component: KnowledgeCenter,
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
    path: PATHS.adminSupply,
    Component: Supply,
  },
  {
    id: nanoid(),
    path: PATHS.adminSupport,
    Component: Support,
  },
  {
    id: nanoid(),
    path: PATHS.adminbCustomer,
    Component: Customers,
  },
];
