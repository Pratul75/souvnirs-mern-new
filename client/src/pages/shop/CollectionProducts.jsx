import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { Slider } from "antd";
import API_WRAPPER from "../../api";
import debounce from "lodash/debounce";
import FilterCard from "../../components/shop/components/FilterCard";
import { Card, ProductCard } from "../../components";
import Loading from "../common/Loading";
import ProductCardMini from "../../components/shop/cards/ProductCardMini";
import { findMinMaxPrice } from "../../utils";

// page to show the collections of products and their filters
const CollectionProducts = () => {
  const { slug } = useParams();
  const [filterType, setFilterType] = useState(false);
  const [filterList, setFilterList] = useState();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [selectedFilter, setSelectedFilter] = useState("new");
  const [inputRangeValue, setInputRangeValue] = useState([0, 1000]);

  const changeFilter = (filter) => {
    console.log("=>=>",filter);
    let data = {
      data: [],
      priceMin: 0,
      priceMax: 1000,
      page: 1,
      sort: "new",
    };
    if (filter.lenth == 0) {
      setFilters(data)
    } else if (filter.length > 0) {
      setFilters(data)
    }else{
      setFilters(filter);
    }
  };

  const getProducts = async () => {
    setLoading(true);
      try {
        changeFilter(filters);
        const response = await API_WRAPPER.post(
          `/products/collection/${slug}`,
          {
            data: filters,
            priceMin: inputRangeValue[0],
            priceMax: inputRangeValue[1],
            page,
            sort: selectedFilter,
          }
        );
        setProducts(response?.data?.products);
        setFilterList(response?.data?.filters);
        setLastPage(response?.data?.lastPage);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
  };

  // check if any filters exist and renders out the specific filters
  const handleFilterSelection = (filterData) => {
    const filterKey = filterData.key;
    const filterValues = filterData.values;

    const existingFilterIndex = filters.findIndex(
      (filter) => filter.key === filterKey
    );

    if (existingFilterIndex !== -1) {
      const updatedFilters = [...filters];
      updatedFilters[existingFilterIndex].values = filterValues;
      setFilters(updatedFilters);
    } else {
      const newFilter = {
        key: filterKey,
        values: filterValues,
      };
      setFilters((prevFilters) => [...prevFilters, newFilter]);
    }
  };
  // fetch product data on change
  useEffect(() => {
    debounce(getProducts, 300)();
  }, [filters, inputRangeValue, selectedFilter, page, slug]);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Sidebar */}
        <div className="md:col-span-1 hidden md:block">
          <div className="hidden md:flex flex-col gap-4">
            {/* Price Filter */}
            <Card>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h6 className="text-primary text-lg font-bold">Price</h6>
                  <span
                    onClick={() => setInputRangeValue([0, 1000])}
                    className="underline cursor-pointer"
                  >
                    Reset
                  </span>
                </div>
                <Slider
                  range
                  min={findMinMaxPrice(products).min}
                  max={findMinMaxPrice(products).max}
                  onChange={(value) => {
                    setInputRangeValue(value);
                    console.log("RANGE VALUE: ", value);
                  }}
                  value={inputRangeValue}
                  className="range"
                />
                <div className="text-sm">
                  <span>
                    {findMinMaxPrice(products).min} -{" "}
                    {findMinMaxPrice(products).max}
                  </span>
                </div>
              </div>
            </Card>

            {/* Filter Cards */}
            <div className="hidden md:flex flex-col">
              {filterList &&
                Object.keys(filterList).map((filter) => (
                  <FilterCard
                    key={filter}
                    title="Product Filter"
                    onSelect={handleFilterSelection}
                    heading={filter}
                    filters={filterList[filter].map((a) => ({
                      filterName: a,
                    }))}
                  />
                ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setFilterType((prevState) => !prevState)}
                className={`btn ${filterType ? "btn-primary" : ""} btn-square`}
              >
                <MdOutlineDashboard className="text-2xl" />
              </button>
              <button
                onClick={() => setFilterType((prevState) => !prevState)}
                className={`btn ${!filterType ? "btn-primary" : ""} btn-square`}
              >
                <AiOutlineUnorderedList className="text-2xl" />
              </button>
              <select
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="select select-primary"
                name="defaultSorting"
                id="defaultSorting"
              >
                <option value="recommended">Recommended</option>
                <option value="new">What's new</option>
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
              products.map((product) => (
                <ProductCardMini
                  key={product.products._id}
                  id={product.products._id}
                  price={
                    product.variants.length > 0
                      ? product.variants[0].price
                      : product.products.price
                  }
                  slug={product.products.slug}
                  rating={4.5}
                  title={product.products.name}
                  image={product.products.coverImage}
                />
              ))
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                {products && products.length === 0 && <div>No product</div>}

                {products &&
                  products.map((product) => (
                    <ProductCard
                      key={product.products._id}
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
                      image={product.products.coverImage}
                      onClick={() => {}}
                    />
                  ))}
              </div>
            )}
          </div>
          <div className="flex w-full justify-center my-4">
            <div className="flex justify-center items-center gap-5 bg-base-200 p-4 rounded-xl">
              <button
                onClick={() => {
                  if (page === 1) {
                    return;
                  }
                  setPage((prev) => prev - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-square btn-primary"
              >
                <AiOutlineMinus />
              </button>
              <span className="text-3xl">{page}</span>
              <button
                onClick={() => {
                  if (page === lastPage) {
                    return;
                  }
                  setPage((prev) => prev + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-square btn-primary text-white"
              >
                <AiOutlinePlus />
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
