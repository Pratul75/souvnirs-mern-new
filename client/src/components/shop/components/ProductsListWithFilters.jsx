import PropTypes from "prop-types";
import { ProductCard } from "../cards/../../";
const ProductsListWithFilters = ({ heading, filters, products }) => {
  return (
    <div className="mx-16 mt-8 ">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">{heading}</h1>
        <div className="flex gap-2">
          {filters.map((filter) => {
            return (
              <span
                className="text-xs p-4 border-b-[1px] border-primary w-24 text-center font-semibold"
                key={filter.id}
              >
                {filter.name}
              </span>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="flex justify-between gap-4 py-4">
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
          }) => {
            return (
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
            );
          }
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
  products: PropTypes.array.isRequired, // Adjust the PropTypes for products as needed
};

export default ProductsListWithFilters;
