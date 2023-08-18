import { useParams } from "react-router-dom";
import FilterCard from "../../components/shop/components/FilterCard";
import { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import ProductCardMini from "../../components/shop/cards/ProductCardMini";
import { Card, ProductCard } from "../../components";
import GiftOneImage from "../../assets/shop/cardImages/giftOne.png";
import { nanoid } from "nanoid";
import API_WRAPPER from "../../api";
import debounce from "lodash/debounce";
import { useFilters } from "react-table";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../features/appConfig/appSlice";

const Products = () => {
  const [filterType, setFilterType] = useState(false);
  const [inputRangeValue, setInputRangeValue] = useState(100000); // Add this line

  const [shippingStates, setShippingStates] = useState({
    freeShipping: false,
    readyToShip: false,
  });
  const [filterList, setFilterList] = useState();
  const [products, setProducts] = useState();
  const [filters, setFilters] = useState([]);
  const location = useParams();
  const dispatch = useDispatch();
  console.log("LOCATION OBJECT: ", location);
  const [value, setValue] = useState({ min: 10, max: 200 });

  const handlePriceChange = (newRange) => {
    setValue(newRange);
  };

  const getProducts = async () => {
    try {
      dispatch(startLoading());
      const response = await API_WRAPPER.post(`/products`, {
        data: filters,
        priceMax: inputRangeValue,
      });
      // if (response.status === 200) {
      //   // dispatch(stopLoading());
      // }
      console.log("CategoryProducts.jsx", response);
      setProducts(response?.data?.products);
      setFilterList(response?.data?.filters);
    } catch (error) {
      // Handle the error here
      console.error("An error occurred while fetching products:", error);
    }
  };

  const handleFilterSelection = (filterData) => {
    const filterKey = filterData.key;
    const filterValues = filterData.values;
    // Check if the filter with the same key already exists in the filters array
    const existingFilterIndex = filters.findIndex(
      (filter) => filter.key === filterKey
    );

    if (existingFilterIndex !== -1) {
      // Update the values of the existing filter
      const updatedFilters = [...filters];
      updatedFilters[existingFilterIndex].values = filterValues;
      setFilters(updatedFilters);
    } else {
      // Add a new filter object to the filters array
      const newFilter = {
        key: filterKey,
        values: filterValues,
      };
      setFilters((prevFilters) => [...prevFilters, newFilter]);
    }
  };
  console.log("CategoryProducts.jsx", filters);

  useEffect(() => {
    debounce(() => {
      getProducts();
    }, 0)();
  }, [filters, inputRangeValue]);
  useEffect(() => {
    if (products) {
      dispatch(stopLoading());
    }
  }, [products]);
  return (
    <div className="mx-16 mt-4">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <div className="flex gap-4 flex-col">
            <div
              key={nanoid()}
              className="form-control flex flex-row items-center gap-4"
            >
              <div className="my-4">
                <div className="flex justify-between"></div>
              </div>
            </div>
            <Card>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h6 className="text-primary text-lg font-bold ">Price</h6>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100000}
                  onChange={(e) => setInputRangeValue(e.target.value)}
                  value={inputRangeValue}
                  className="range"
                />
                <div>
                  <span>0 - {inputRangeValue}</span>
                </div>
              </div>
            </Card>
            {filterList &&
              Object.keys(filterList).map((filter) => {
                console.log("CategoryProducts.jsx", filter);
                return (
                  <FilterCard
                    key={filter} // You should add a unique key for each item in the list
                    title="Product Filter"
                    onSelect={handleFilterSelection}
                    heading={filter}
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
                  price={product.price}
                  slug={product.slug}
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
                        price={product.price}
                        rating={4.2}
                        slug={product.slug}
                        title={product.name}
                        // discountPrice="300"
                        id={product._id}
                        image={product.coverImage}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
