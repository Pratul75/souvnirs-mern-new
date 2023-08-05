import { toast } from "react-toastify";
import debounce from "lodash.debounce";
import {
  adminSidebarMapping,
  customerSidebarMapping,
  vendorSidebarMapping,
} from "../mappings";

export const getRandomColor = () => {
  const colorArr = [
    "bg-primary",
    "bg-secondary",
    "bg-info",
    "bg-warning",
    "bg-error",
    "bg-accent",
  ];
  // Get a random index from the colorArr
  const randomIndex = Math.floor(Math.random() * colorArr.length);
  // Get the random color using the random index
  const randomColor = colorArr[randomIndex];

  return randomColor;
};

export const getStatusStyles = (status) => {
  switch (status) {
    case "ACTIVE":
      return (
        <div className="badge badge-accent font-bold">
          <span className="text-green-300">ACTIVE</span>
        </div>
      );

    case "PENDING":
      return (
        <div className="badge badge-secondary font-bold">
          <span className="text-pink-300">PENDING</span>
        </div>
      );

    default:
      return (
        <div className="badge badge-error font-bold">
          <span className="text-rose-300">DEACTIVE</span>
        </div>
      );
  }
};

export const getStockStatusStyles = (stockStatus) => {
  switch (stockStatus) {
    case "IN_STOCK":
      return <div className="text-primary">IN STOCK</div>;

    case "OUT_OF_STOCK":
      return <div className="text-error">OUT OF STOCK</div>;

    default:
      return <div className="text-secondary">BACK ORDER</div>;
  }
};

// utility to show toasts
export const showToast = (message, type) => {
  toast(message, {
    type, // 'success', 'error', 'warning', or 'info'
    position: "top-right",
    autoClose: 2000,
    theme: "dark",
  });
};

// debounced version
export const debouncedShowToast = debounce(showToast, 1000);

// conditional sidebar mapping based on the role
export const conditionalSidebarMapping = () => {
  const userRole = JSON.parse(localStorage.getItem("role"));
  if (userRole === "customer") {
    console.log("USER IS LOGGED");
    return customerSidebarMapping;
  } else if (userRole === "vendor") {
    console.log("VENDOR IS LOGGED");
    return vendorSidebarMapping;
  } else if (userRole === "admin") {
    return adminSidebarMapping;
  } else {
    return [];
  }
};
