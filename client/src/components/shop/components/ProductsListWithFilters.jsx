import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ProductCard } from "../../../components";
import API_WRAPPER from "../../../api";

const ProductsListWithFilters = ({ heading, filters, products }) => {
  const [activeFilter, setActiveFilter] = useState(filters[0].id); // Set the initial active filter
  const [productsList, setProductsList] = useState([]);

  // Todo: to be used once api call is triggered
  // const filteredProducts = products.filter(
  //   (product) => product.filterId === activeFilter
  // );
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
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="mt-16">
      <div className="flex flex-col md:flex-row items-center justify-between ">
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
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
      <hr />
      <div className="flex justify-center md:justify-between gap-4 py-4 flex-wrap md:flex-nowrap">
        {productsList.map(({ _id, name, price, rating, coverImage }) => (
          <ProductCard
            key={_id}
            title={name}
            price={price}
            rating={rating}
            image={coverImage}
          />
        ))}
      </div>
    </div>
  );
};

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
