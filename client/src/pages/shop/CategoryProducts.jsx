import { useParams } from "react-router-dom";
import FilterCard from "../../components/shop/components/FilterCard";
import { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import ProductCardMini from "../../components/shop/cards/ProductCardMini";
import { ProductCard } from "../../components";
import GiftOneImage from "../../assets/shop/cardImages/giftOne.png";
import { nanoid } from "nanoid";
import API_WRAPPER from "../../api";

const CategoryProducts = () => {
  const [filterType, setFilterType] = useState(false);
  const [shippingStates, setShippingStates] = useState({
    freeShipping: false,
    readyToShip: false,
  });
  const [filterList, setFilterList] = useState();
  const [products, setProducts] = useState([]);
  const location = useParams();
  console.log("LOCATION OBJECT: ", location);

  const getProducts = async () => {
    const response = await API_WRAPPER.get(`/products/${location.slug}`);
    console.log("CategoryProducts.jsx", response);
    setProducts(response?.data?.products);
    setFilterList(response?.data?.filters);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="mx-16 mt-4">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <div className="flex gap-4 flex-col">
            {filterList &&
              Object.keys(filterList).map((filter) => {
                console.log("CategoryProducts.jsx", filter);
                return (
                  <FilterCard
                    key={filter} // You should add a unique key for each item in the list
                    title="Product Filter"
                    heading={`Filter By ${filter}`}
                    filters={filterList[filter].map((a) => ({ filterName: a }))} // Return an object with filterName property
                  />
                );
              })}
          </div>
        </div>
        <div className="col-span-3 container px-8">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <button
                onClick={() => setFilterType((prevState) => !prevState)}
                className={`btn ${filterType && "btn-primary"} btn-square`}
              >
                <MdOutlineDashboard className="text-2xl" />
              </button>
              <button
                onClick={() => setFilterType((prevState) => !prevState)}
                className={`btn ${!filterType && "btn-primary"} btn-square`}
              >
                <AiOutlineUnorderedList className="text-2xl" />
              </button>
              <select
                className="select select-primary"
                name="defaultSorting"
                id="defaultSorting"
              >
                <option selected disabled>
                  Default Sorting
                </option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="flex gap-4">
              <div className="form-control flex flex-row items-center gap-2">
                <label className="label">
                  <span className="label-text">Ready To Ship</span>
                </label>
                <input
                  onChange={() =>
                    setShippingStates((prevState) => {
                      return {
                        ...prevState,
                        readyToShip: !shippingStates.readyToShip,
                      };
                    })
                  }
                  checked={shippingStates.readyToShip}
                  className="toggle toggle-primary"
                  type="checkbox"
                  name="readyToShip"
                  id="readyToShip"
                />
              </div>
              <div className="form-control flex flex-row items-center gap-2">
                <label className="label">
                  <span className="label-text">Free Shipping</span>
                </label>
                <input
                  onChange={() =>
                    setShippingStates((prevState) => {
                      return {
                        ...prevState,
                        freeShipping: !shippingStates.freeShipping,
                      };
                    })
                  }
                  checked={shippingStates.freeShipping}
                  className="toggle toggle-primary"
                  type="checkbox"
                  name="readyToShip"
                  id="readyToShip"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-4 flex-wrap">
            {filterType ? (
              products &&
              products.map((product) => (
                <ProductCardMini
                  id={nanoid()}
                  price={
                    product.variants.length > 0
                      ? product.variants[0].price
                      : product.price
                  }
                  rating={4.5}
                  title={product.name}
                  image={product.coverImage}
                />
              ))
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                {products &&
                  products.map((product) => {
                    return (
                      <ProductCard
                        badgeColor="badge-accent"
                        badgeText="NEW"
                        price={
                          product.variants.length > 0
                            ? product.variants[0].price
                            : product.price
                        }
                        rating={4.2}
                        title={product.name}
                        // discountPrice="300"
                        image={product.coverImage}
                      />
                    );
                  })}
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
                <ProductCard
                  badgeColor="badge-accent"
                  badgeText="NEW"
                  price={800}
                  rating={4.2}
                  title="New Product"
                  discountPrice="300"
                  image={GiftOneImage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
