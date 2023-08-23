import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductCard, ScrollAnimationWrapper } from "../../../components";
import API_WRAPPER from "../../../api";

const SkeletonProductCard = () => {
  return (
    <div className="animate-pulse p-4 border border-gray-300 rounded-md w-full md:w-64">
      <div className="bg-gray-300 h-44 w-full mb-2 rounded-md"></div>
      <div className="h-4 w-1/2 bg-gray-300 mb-2 rounded-md"></div>
      <div className="h-4 w-1/4 bg-gray-300 mb-2 rounded-md"></div>
    </div>
  );
};

const ProductsListWithFilters = ({ heading, filters, products }) => {
  const [activeFilter, setActiveFilter] = useState(filters[0].id);
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(true);

  function getRandomValues(array) {
    if (array.length <= 5) {
      return array.slice();
    }

    const values = [];
    const usedIndices = new Set();

    while (values.length < 5) {
      const randomIndex = Math.floor(Math.random() * array.length);

      if (!usedIndices.has(randomIndex)) {
        values.push(array[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    return values;
  }

  const getAllProducts = async () => {
    try {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        console.log("PRODUCT DATA: ", response?.data);
        setProductsList(getRandomValues(response?.data));
        setLoading(false); // Set loading to false after data is fetched
      }
    } catch (error) {
      console.error(error.message);
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ScrollAnimationWrapper>
      <div className="mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="font-semibold text-2xl">{heading}</h1>
          <div className="flex flex-col md:flex-row  gap-2">
            {filters.map((filter) => (
              <button
                className={`text-lg mr-12 p-4 border-b-[1px] ${
                  activeFilter === filter.id
                    ? "border-primary"
                    : "border-transparent"
                } w-24 text-center font-semibold focus:outline-none`}
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setLoading(true); // Reset loading when filter changes
                  getAllProducts();
                }}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
        <hr />
        <div className="flex justify-center md:justify-between gap-4 py-4 flex-wrap md:flex-nowrap">
          {loading
            ? // Render skeleton cards while loading
              Array.from({ length: 5 }).map((_, index) => (
                <SkeletonProductCard key={index} />
              ))
            : // Render actual product cards when data is available
              productsList.map(({ _id, name, price, rating, coverImage }) => (
                <ProductCard
                  key={_id}
                  title={name}
                  price={price}
                  rating={4.3}
                  image={coverImage}
                />
              ))}
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
};

// PropTypes and export remain unchanged
ProductsListWithFilters.propTypes = {
  heading: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPrice: PropTypes.number,
      rating: PropTypes.number,
      badgeColor: PropTypes.string,
      badgeText: PropTypes.string,
      image: PropTypes.string,
      filterId: PropTypes.number.isRequired, // Add filterId to products
    })
  ).isRequired,
};

export default ProductsListWithFilters;
