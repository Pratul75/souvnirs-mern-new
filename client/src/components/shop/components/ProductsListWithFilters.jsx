import { useState } from "react";
import PropTypes from "prop-types";
import { ProductCard } from "../../../components";

const ProductsListWithFilters = ({ heading, filters, products }) => {
  const [activeFilter, setActiveFilter] = useState(filters[0].id); // Set the initial active filter
  // Todo: to be used once api call is triggered
  // const filteredProducts = products.filter(
  //   (product) => product.filterId === activeFilter
  // );

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
        {products.map(
          ({
            id,
            title,
            price,
            discountPrice,
            rating,
            badgeColor,
            badgeText,
            image,
          }) => (
            <ProductCard
              key={id}
              title={title}
              price={price}
              discountPrice={discountPrice}
              rating={rating}
              badgeText={badgeText}
              badgeColor={badgeColor}
              image={image}
            />
          )
        )}
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
