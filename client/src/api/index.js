import axios from "axios";

// Create an instance of Axios
const API_WRAPPER = axios.create({
  baseURL: "http://localhost:8080/",
});

// Request interceptor
API_WRAPPER.interceptors.request.use(
  (config) => {
    // You can add custom logic here, such as adding headers or modifying the request
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
API_WRAPPER.interceptors.response.use(
  (response) => {
    // You can modify the response before returning it to the calling function
    return response;
  },
  (error) => {
    // Handle response error
    return Promise.reject(error);
  }
);

export default API_WRAPPER;