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
import { sortProductsByName } from "../../utils";
import { Slider } from "antd";

const CollectionProducts = () => {
  const [filterType, setFilterType] = useState(false);
  const [inputRangeValue, setInputRangeValue] = useState([0, 100000]);
  const [filterList, setFilterList] = useState();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);

  const [selctedFilter, setSelctedFilter] = useState("new");
  const location = useParams();

  const getProducts = async () => {
    setLoading(true);
    const response = await API_WRAPPER.post(
      `/products/collection/${location.slug}`,
      {
        data: filters,
        priceMin: inputRangeValue[0],
        priceMax: inputRangeValue[1],
        page: page,
        sort: selctedFilter,
      }
    );
    console.log("COLLECTION RESPONSE: ", response);
    setProducts(response?.data?.products);
    setFilterList(response?.data?.filters);
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

  useEffect(() => {
    debounce(() => {
      getProducts();
    }, 100)();
  }, [filters, inputRangeValue, selctedFilter, page]);

  return (
    <div className="mx-16 mt-4">
      <div className="grid grid-cols-4">
        <div className="col-span-1">
          <div className="flex gap-4 flex-col">
            <Card>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h6 className="text-primary text-lg font-bold">Price</h6>
                </div>
                <Slider
                  range
                  min={0}
                  max={100000}
                  step={50} // Set the step value to 50
                  onChange={(value) => setInputRangeValue(value)} // Update the state when the slider value changes
                  value={inputRangeValue}
                  className="range"
                />
                <div>
                  <span>
                    {inputRangeValue[0]} - {inputRangeValue[1]}
                  </span>
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
                onChange={(e) => setSelctedFilter(e.target.value)}
                className="select select-primary"
                name="defaultSorting"
                id="defaultSorting"
              >
                <option value="recommended">Recommended</option>
                <option value="new" selected>
                  What's new
                </option>
                <option value="discount">Better Discount</option>
                <option value="htl">price:high to low</option>
                <option value="lth">price:low to high</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-4 flex-wrap">
            {filterType ? (
              products &&
              sortProductsByName(products, selctedFilter).map((product) => (
                <ProductCardMini
                  key={nanoid()}
                  id={nanoid()}
                  price={
                    product.variants.length > 0
                      ? product.variants[0].price
                      : product.products.price
                  }
                  slug={product.products.slug}
                  rating={4.5}
                  title={product.products.name}
                  // discountPrice="300"
                  image={product.products.coverImage}
                />
              ))
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                {products && products.length == 0 && <div>No product</div>}

                {products &&
                  products?.map((product) => {
                    return (
                      <ProductCard
                        key={nanoid()}
                        badgeColor="badge-accent"
                        badgeText="NEW"
                        slug={product.products.slug}
                        id={product.products._id}
                        price={
                          product.variants.length > 0
                            ? product.variants[0].price
                            : product.products.price
                        }
                        rating={4.2}
                        title={product.products.name}
                        // discountPrice="300"
                        image={product.products.coverImage}
                        onClick={() => {}}
                      />
                    );
                  })}
              </div>
            )}
          </div>
          <div className="flex  w-full justify-center my-4">
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
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default CollectionProducts;
