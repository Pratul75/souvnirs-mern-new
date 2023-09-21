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
    // position: "top-right",
    autoClose: 1500,
    className: "sticky top-10 right-10",
    theme: "dark",
  });
};

// debounced version
export const debouncedShowToast = debounce(showToast, 200);

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

export const sortProductsByName = (products, sortOrder) => {
  const sortedProducts = [...products];
  sortedProducts.sort((a, b) => {
    const nameA = a?.name;
    const nameB = b?.name;
    if (sortOrder === "ascending") {
      return nameA.localeCompare(nameB);
    } else if (sortOrder === "descending") {
      return nameB.localeCompare(nameA);
    } else {
      throw new Error(
        "Invalid sortOrder parameter. Use 'ascending' or 'descending'."
      );
    }
  });

  return sortedProducts;
};

// Modify the findMinMaxPrice function to return an object with min and max properties
export const findMinMaxPrice = (data) => {
  // Parse the JSON object
  const parsedData = data;

  function findMinMax(arr) {
    if (arr.length === 0) {
      // Handle the case of an empty array
      return { min: undefined, max: undefined };
    }

    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
      if (arr[i] > max) {
        max = arr[i];
      }
    }

    return { min, max }; // Return an object with min and max properties
  }

  // Iterate through the "products" array and extract price values
  const priceArr = parsedData.map((product) => {
    const price =
      product.variants.length > 0
        ? product.variants[0].price
        : product.products.price;
    return price;
  });
  const result = findMinMax(priceArr);
  console.log("PRICE MIN MAX VALUE: ", result);
  return result;
};

export function selectRandomValues(arr, numValues = 4) {
  if (numValues >= arr.length) {
    return arr.slice(); // Return a copy of the entire array if numValues is greater or equal to the array length.
  }

  const selectedValues = [];
  const arrCopy = arr.slice(); // Create a copy of the input array to avoid modifying the original.

  for (let i = 0; i < numValues; i++) {
    const randomIndex = Math.floor(Math.random() * arrCopy.length);
    const randomValue = arrCopy.splice(randomIndex, 1)[0]; // Remove the selected value from the copy.
    selectedValues.push(randomValue);
  }

  return selectedValues;
}
