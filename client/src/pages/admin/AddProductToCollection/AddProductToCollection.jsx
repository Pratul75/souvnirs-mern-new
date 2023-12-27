import { nanoid } from "nanoid";
import { Header } from "../../../components";
import { useQuery } from "react-query";
import {
  fetchAllAdminProducts,
  fetchAllCollections,
  fetchAllProducts,
} from "../../../api/apiCalls";
import { Select, Spin } from "antd";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { useNavigate } from "react-router-dom";
const AddProductToCollection = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState({});
  const [loadingProducts, setLoadingProducts] = useState(false);
  const navigate = useNavigate();
  // collections query
  const {
    data: collections,
    isLoading: loadingCollections,
    error,
  } = useQuery("get_collection", fetchAllCollections);

  // products query

  useEffect(() => {
    getDataFromAdminProducts();
  }, [page]);

  const getDataFromAdminProducts = async () => {
    const ProductData = await fetchAllAdminProducts(page);
    let finalProductList = [];
    let finalData = ProductData;
    if (products?.data) {
      finalProductList = [
        ...products?.data?.productsList,
        ...ProductData?.data?.productsList,
      ];
      finalData.data.productsList = finalProductList;
    }
    setProducts(finalData);
  };

  // collection options
  const collectionOptions = () => {
    return collections?.data?.map((collection) => {
      return { value: collection?._id, label: collection?.title };
    });
  };

  // product options
  const productOptions = () => {
    return products?.data?.productsList?.map((product) => {
      return { value: product?._id, label: product?.name };
    });
  };

  // collection change handler
  const onCollectionChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedCollection(value);
  };

  // product change handler
  const onProductChange = (value) => {
    console.log(`selected ${value}`);
    setSelectedProduct(value);
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredCollection = collections?.data?.filter((collection) => {
      return collection._id === selectedCollection;
    });
    // pushing new product id to be added to active products
    filteredCollection[0].activeProducts.push(selectedProduct);
    const response = await API_WRAPPER.put(
      `/collection/update-collection-by-id/:${selectedCollection}`,
      { activeProducts: [selectedProduct] }
    );
    if (response.status === 200) {
      debouncedShowToast("Product Added Successfully to Collection", "success");
      navigate("/admin/collection");
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  if (loadingCollections) {
    return (
      <span className="loading loading-ring loading-lg text-primary"></span>
    );
  }

  if (loadingProducts) {
    return (
      <div>
        <span className="loading loading-ring loading-lg text-primary"></span>
        <p>Fetching Products</p>
      </div>
    );
  }
  if (error) {
    return <span>Error: {error}</span>;
  }

  const handleMenuScroll = (e) => {
    if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
      // Call your custom function here
      if (page != products?.data?.totalPages) {
        setPage(page + 1);
      }
      console.log("====>", e, "================================");
      // For example, you can load more options when the user scrolls to the bottom
      // loadMoreOptions();
    }
  };

  // <div className="form-control mt-4">
  //   <label className="label">
  //     <span className="label-text">
  //       Status<span className=" text-red-600">*</span>
  //     </span>
  //   </label>
  //   <select
  //     onChange={(e) => handleInputChange(e)}
  //     className="select select-primary"
  //     name="status"
  //     defaultValue={formData.status}
  //   >
  //     <option disabled selected>
  //       select status
  //     </option>
  //     <option value="ACTIVE">Active</option>
  //     <option value="INACTIVE">Inactive</option>
  //   </select>
  // </div>;

  return (
    <div className="my-4">
      <Header
        heading="Add Single Product To Collection"
        subheading="In this section you can add a single product to any collection of your choice"
        key={nanoid()}
      />
      <div className="grid grid-cols-2 mt-8 gap-4">
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">
              Select a Collection<span className=" text-red-600">*</span>
            </span>
          </label>
          <Select
            className="col-span-1"
            size="large"
            showSearch
            isSearchable
            isClearable
            optionFilterProp="children"
            placeholder="Select a Collection"
            onChange={onCollectionChange}
            filterOption={filterOption}
            options={collectionOptions()}
          />
        </div>
        {/* <Spin spinning={true}/> */}
        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">
              Select a product<span className=" text-red-600">*</span>
            </span>
          </label>
          <Select
            className="col-span-1"
            size="large"
            showSearch
            isSearchable
            isClearable
            optionFilterProp="children"
            placeholder="Select a product"
            onChange={onProductChange}
            filterOption={filterOption}
            options={productOptions()}
            onPopupScroll={handleMenuScroll}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={(e) => handleSubmit(e)} className="btn btn-primary">
          Add Product To Collection
        </button>
      </div>
    </div>
  );
};

export default AddProductToCollection;
