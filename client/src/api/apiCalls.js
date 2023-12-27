import API_WRAPPER, { API_TOKEN } from ".";

export const fetchDashboardsCardData = () => {
  return API_WRAPPER.get("/dashboard/cards");
};

export const fetchBarchartData = () => {
  return API_WRAPPER.get("/dashboard/barchart");
};

export const getProductsData = () => {
  return API_WRAPPER.get("/dashboard/products");
};

export const fetchNavbarData = () => {
  return API_TOKEN.get("/getNavbarMenu");
};

export const fetchCategoryData = () => {
  return API_WRAPPER.get("/category/get-all-categories");
};

export const fetchAllProducts = () => {
  return API_WRAPPER.get("products/get-all-products");
};

export const fetchAllAdminProducts = (pageNumber) => {
  return API_WRAPPER.get(
    `/products/admin/get-all-products?pageNumber=${pageNumber}`
  );
};

export const fetchAllCollections = () => {
  return API_WRAPPER.get("/collection/get-all-collections");
};

export const fetchAddresses = () => {
  return API_WRAPPER.get("/getCustomerAddress");
};

export const fetchCheckouts = () => {
  return API_WRAPPER.get("/checkout/get-all-checkouts");
};
