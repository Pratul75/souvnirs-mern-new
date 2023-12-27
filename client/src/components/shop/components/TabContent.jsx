import { useNavigate } from "react-router-dom";
import Ratings from "./Ratings";

const TabContent = ({ productsList }) => {
  console.log("==>", productsList);
  // debugger;
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Item 1 */}

        {productsList?.map((product) => {
          console.log("product=>", product);
          return (
            <div
              key={product._id}
              className="w-full cursor-pointer col-span-1 bg-white p-4 rounded-lg shadow-md"
              onClick={() => navigate(`productInfo/${product.slug}`)}
            >
              <div className="flex items-center space-x-4">
                <img
                  className="w-24 h-24 rounded-md"
                  src={product.coverImage}
                  alt="Product"
                />

                <div className="flex-grow">
                  <h2 className="text-lg font-medium text-neutral-700">
                    {product.name}
                  </h2>
                  <div className="text-xl font-medium text-violet-900"></div>
                  <div className="flex items-center space-x-4 mt-2">
                    <Ratings rating={4} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabContent;
