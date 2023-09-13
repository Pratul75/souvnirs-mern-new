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
