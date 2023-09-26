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
  AddProductAttributes,
  AddMenus,
  Menus,
  AddMainMenus,
  AddChildMenu,
  Commissions,
  AddCommission,
  Advertisement,
  AdminMedia,
  AddSubMenus,
  AddProductToCollection,

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
  VendorAddProductAttributes,

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

  // shop routes
  LandingPage,
  CategoryProducts,
  CollectionProducts,
  ProductInfo,
  CartPage,
  Checkout,
  CompareProducts,
  OrderSuccess,
  Wishlist,
  Blogs,
  VendorEditProduct,
  VendorEditProductAttributes,

  // Footer routes
  AboutUs,
  BuyerAgreement,
  ContactUs,
  Faq,
  PoliciesAndShippingRates,
  SellerAgreement,
  SellerRegistration,
} from "../pages";

import Replacement from "../pages/admin/Replacement";
import AddCustomer from "../pages/admin/AddCustomer/AddCustomer";
import AddVendor from "../pages/admin/AddVendor/AddVendor";
import AdminWishlist from "../pages/admin/Wishlist";
import EditProduct from "../pages/admin/Dashboard/EditProduct";
import EditCategory from "../pages/EditCategory";
import EditCustomer from "../pages/editCustomer";
import EditCollection from "../pages/admin/EditCollection";
import Products from "../pages/shop/Products";
import EditProductAttributes from "../pages/admin/Dashboard/EditProductAttributes";
import ShopAboutUs from "../pages/shop/ShopAboutUs";
import EditCoupon from "../pages/admin/EditCoupon";
import EdiDiscount from "../pages/admin/EditDiscount";
import EditMenus from "../pages/admin/EditMenus";
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
    path: PATHS.adminAdvertisements,
    defaultRole: "admin",
    Component: Advertisement,
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
    path: `${PATHS.EditCategory}/:id`,
    defaultRole: "admin",
    Component: EditCategory,
  },
  {
    id: nanoid(),
    path: `${PATHS.EditCategory}/:id`,
    defaultRole: "admin",
    Component: EditCategory,
  },
  {
    id: nanoid(),
    path: `${PATHS.EditCollection}/:id`,
    defaultRole: "admin",
    Component: EditCollection,
  },
  {
    id: nanoid(),
    path: `${PATHS.adminEditMenus}/:id`,
    defaultRole: "admin",
    Component: EditMenus,
  },
  {
    id: nanoid(),
    path: `${PATHS.EditCustomer}/:id`,
    defaultRole: "admin",
    Component: EditCustomer,
  },
  {
    id: nanoid(),
    path: `${PATHS.editCoupon}/:id`,
    defaultRole: "admin",
    Component: EditCoupon,
  },
  {
    id: nanoid(),
    path: `${PATHS.editDiscount}/:id`,
    defaultRole: "admin",
    Component: EdiDiscount,
  },

  {
    id: nanoid(),
    path: `${PATHS.EditProduct}/:id`,
    defaultRole: "admin",
    Component: EditProduct,
  },
  {
    id: nanoid(),
    path: `${PATHS.EditVariants}/:id`,
    defaultRole: "admin",
    Component: EditProductAttributes,
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
    path: PATHS.adminMedia,
    defaultRole: "admin",
    Component: AdminMedia,
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
  {
    id: nanoid(),
    path: PATHS.adminWishlist,
    defaultRole: "admin",
    Component: AdminWishlist,
  },
  {
    id: nanoid(),
    path: PATHS.adminAddProductAttributes,
    Component: AddProductAttributes,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminAddMenus,
    Component: AddMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminMenus,
    Component: Menus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminAddMainMenus,
    Component: AddMainMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminAddSubMenus,
    Component: AddSubMenus,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminAddChildMenus,
    Component: AddChildMenu,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminCommissions,
    Component: Commissions,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminAddCommission,
    Component: AddCommission,
    defaultRole: "admin",
  },
  {
    id: nanoid(),
    path: PATHS.adminAddProductToCollection,
    Component: AddProductToCollection,
    defaultRole: "admin",
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
    path: PATHS.vendorMedia,
    defaultRole: "vendor",
    Component: AdminMedia,
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
    path: `${PATHS.vendorAddProduct}`,
    Component: vendorAddProduct,
    defaultRole: "vendor",
  },
  {
    id: nanoid(),
    path: PATHS.vendorAddProductAttributes,
    Component: VendorAddProductAttributes,
    defaultRole: "vendor",
  },
  {
    id: nanoid(),
    path: `${PATHS.vendorEditVariants}/:id`,
    Component: VendorEditProductAttributes,
    defaultRole: "vendor",
  },
  {
    id: nanoid(),
    path: `${PATHS.vendorEditProduct}/:id`,
    Component: VendorEditProduct,
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

// shop routes
export const shopRoutes = [
  {
    id: nanoid(),
    path: PATHS.landingPage,
    Component: LandingPage,
  },
  {
    id: nanoid(),
    path: `${PATHS.shopCategory}/:slug`,
    Component: CategoryProducts,
  },
  {
    id: nanoid(),
    path: `${PATHS.shopCollection}/:slug`,
    Component: CollectionProducts,
  },
  {
    id: nanoid(),
    path: `${PATHS.shopProduct}`,
    Component: Products,
  },

  {
    id: nanoid(),
    path: `${PATHS.productInfo}/:slug`,
    Component: ProductInfo,
  },
  {
    id: nanoid(),
    path: PATHS.cartPage,
    Component: CartPage,
  },
  {
    id: nanoid(),
    path: PATHS.checkout,
    Component: Checkout,
  },
  {
    id: nanoid(),
    path: PATHS.compareProduct,
    Component: CompareProducts,
  },
  {
    id: nanoid(),
    path: PATHS.orderSuccess,
    Component: OrderSuccess,
  },
  {
    id: nanoid(),
    path: PATHS.shopWishlist,
    Component: Wishlist,
  },
  {
    id: nanoid(),
    path: PATHS.blogs,
    Component: Blogs,
  },
  {
    id: nanoid(),
    path: PATHS.shopAboutUs,
    Component: ShopAboutUs,
  },
];

// footer routes

export const footerRoutes = [
  {
    id: nanoid(),
    path: PATHS.footerAboutUs,
    Component: AboutUs,
  },
  {
    id: nanoid(),
    path: PATHS.footerBuyerAgreement,
    Component: BuyerAgreement,
  },
  {
    id: nanoid(),
    path: PATHS.footerContactUs,
    Component: ContactUs,
  },
  {
    id: nanoid(),
    path: PATHS.footerFaq,
    Component: Faq,
  },
  {
    id: nanoid(),
    path: PATHS.footerPoliciesAndShippingRates,
    Component: PoliciesAndShippingRates,
  },
  {
    id: nanoid(),
    path: PATHS.footerSellerAgreement,
    Component: SellerAgreement,
  },
  {
    id: nanoid(),
    path: PATHS.footerSellerRegistration,
    Component: SellerRegistration,
  },
];
