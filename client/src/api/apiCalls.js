import API_WRAPPER from ".";

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
  return API_WRAPPER.get("/getNavbarMenu");
};

export const fetchCategoryData = () => {
  return API_WRAPPER.get("/category/get-all-categories");
};

export const fetchAllProducts = () => {
  return API_WRAPPER.get("products/get-all-products");
};
