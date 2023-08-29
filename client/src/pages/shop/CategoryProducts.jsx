import { useParams } from "react-router-dom";
import FilterCard from "../../components/shop/components/FilterCard";
import { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import ProductCardMini from "../../components/shop/cards/ProductCardMini";
import { Card, ProductCard } from "../../components";
import { nanoid } from "nanoid";
import API_WRAPPER from "../../api";
import debounce from "lodash/debounce";
import Loading from "../common/Loading";

const CategoryProducts = () => {
  const [filterType, setFilterType] = useState(false);
  const [shippingStates, setShippingStates] = useState({
    freeShipping: false,
    readyToShip: false,
  });
  const [filterList, setFilterList] = useState();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [inputRangeValue, setInputRangeValue] = useState(100000); // Add this line
  const [max, setMax] = useState(0); // Add this line
  const [slug, setSlug] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  console.log("LOCATION OBJECT: ", location);

  const getProducts = async () => {
    setLoading(true);
    const response = await API_WRAPPER.post(`/products/category/${slug}`, {
      data: filters,
      priceMax: inputRangeValue,
      page: page,
    });
    console.log("CategoryProducts.jsx", response);
    setProducts(response?.data?.products);
    setFilterList(response?.data?.filters);
    setMax(response?.data?.max);
    setLastPage(response?.data?.lastPage);
    setLoading(false);
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
  console.log("CategoryProducts.jsx", inputRangeValue);

  useEffect(() => {
    // Set the slug parameter from the URL
    setSlug(params.slug);
  }, [params.slug]);

  useEffect(() => {
    debounce(() => {
      getProducts();
    }, 100)();
  }, [filters, page, inputRangeValue, slug]);
  return (
    <div className="mx-16 mt-4">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <div className="flex gap-4 flex-col">
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
                className={`btn ${!filterType && "btn-primary"} btn-square`}
              >
                <MdOutlineDashboard className="text-2xl" />
              </button>
              <button
                onClick={() => setFilterType((prevState) => !prevState)}
                className={`btn ${filterType && "btn-primary"} btn-square`}
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
          <div className="flex flex-wrap mt-4">
            {filterType ? (
              products &&
              products.map((product) => (
                <div className="w-1/2 p-2 cursor-pointer" key={nanoid()}>
                  <ProductCardMini
                    key={nanoid()}
                    id={nanoid()}
                    price={
                      product.variants.length > 0
                        ? product.variants[0].price
                        : product.price
                    }
                    slug={product.slug}
                    rating={4.5}
                    title={product.name}
                    image={product.coverImage && product.coverImage}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                {products && products.length == 0 && <div>No products</div>}
                {products &&
                  products.map((product) => {
                    return (
                      <ProductCard
                        key={nanoid()}
                        badgeColor="badge-accent"
                        badgeText="NEW"
                        price={
                          product.variants.length > 0
                            ? product.variants[0].price
                            : product.price
                        }
                        rating={4.2}
                        title={product.name}
                        id={product._id}
                        // discountPrice="300"
                        slug={product.slug}
                        className="cursor-pointer"
                        image={product.coverImage}
                      />
                    );
                  })}
              </div>
            )}
          </div>
          <div className="flex  w-full justify-center my-4">
            {products.length > 0 && (
              <div className="flex justify-center items-center gap-5 w-1/3">
                <button
                  onClick={() => {
                    if (page === 1) {
                      return;
                    }
                    setPage((prev) => prev - 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="btn btn-circle btn-primary"
                >
                  -
                </button>
                <span className="text-3xl ">{page}</span>
                <button
                  onClick={() => {
                    if (page == lastPage) {
                      return;
                    }
                    setPage((prev) => prev + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="btn btn-circle btn-primary text-white"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default CategoryProducts;
