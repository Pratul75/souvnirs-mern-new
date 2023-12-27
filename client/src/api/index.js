import axios from "axios";

let API_WRAPPER;
let baseUrl;
export let API_TOKEN;
// Create an instance of Axios
if (process.env.NODE_ENV === "development") {
  API_WRAPPER = axios.create({
    baseURL: "http://localhost:8080/",
  });
  API_TOKEN = axios.create({
    baseURL: "http://localhost:8080/",
  });
  baseUrl = "http://localhost:8080/uploads";
} else {
  API_WRAPPER = axios.create({
    baseURL: "https://souvnirs-be.el.r.appspot.com/",
  });
  API_TOKEN = axios.create({
    baseURL: "https://souvnirs-be.el.r.appspot.com/",
  });
  baseUrl = "https://storage.cloud.google.com/staging.souvnirs-be.appspot.com";
}
export { baseUrl };
5;

const handleLogout = () => {
  // Clear the token from localStorage
  localStorage.removeItem("token");

  // Redirect the user to the login page or perform any other appropriate actions
  // For example, you can use a React Router to redirect the user to the login page:
  window.location.href = "/login"; // Replace '/login' with your desired logout destination
};

// Request interceptor
API_WRAPPER.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
Media route to upload media files
    // If the token exists, add it to the request headers
    if (token) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
    }

    // You can add other custom logic here, such as adding additional headers or modifying the request
    return config;
  },
  (error) => {
    // Handle request error
    console.log(error);
    return Promise.reject(error);
  }
);

API_TOKEN.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    // You can add other custom logic here, such as adding additional headers or modifying the request

    return config;
  },
  (error) => {
    // Handle request error
    console.log(error);
    return Promise.reject(error);
  }
);

API_TOKEN.interceptors.response.use(
  (response) => {
    // You can modify the response before returning it to the calling function
    return response;
  },
  (error) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      handleLogout(); // Call the handleLogout function to log out the user
    }
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
    if (error.response && error.response.status === 401) {
      handleLogout(); // Call the handleLogout function to log out the user
    }
    return Promise.reject(error);
  }
);
export default API_WRAPPER;
