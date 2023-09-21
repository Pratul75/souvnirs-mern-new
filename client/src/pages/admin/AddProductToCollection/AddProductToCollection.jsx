import { nanoid } from "nanoid";
import { Header } from "../../../components";
import { useQuery } from "react-query";
import { fetchAllCollections, fetchAllProducts } from "../../../api/apiCalls";
import { Select } from "antd";
import { useState } from "react";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
const AddProductToCollection = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  // collections query
  const {
    data: collections,
    isLoading: loadingCollections,
    error,
  } = useQuery("get_collection", fetchAllCollections);

  // products query
  const { data: products, isLoading: loadingProducts } = useQuery(
    "get_products",
    fetchAllProducts
  );

  // collection options
  const collectionOptions = () => {
    return collections?.data?.map((collection) => {
      return { value: collection?._id, label: collection?.title };
    });
  };

  // product options
  const productOptions = () => {
    return products?.data?.map((product) => {
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
      filteredCollection[0]
    );
    if (response.status === 200) {
      debouncedShowToast("Product Added Successfully to Collection", "success");
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

  return (
    <div className="my-4">
      <Header
        heading="Add Single Product To Collection"
        subheading="In this section you can add a single product to any collection of your choice"
        key={nanoid()}
      />
      <div className="grid grid-cols-2 mt-8 gap-4">
        <Select
          className="col-span-1"
          size="large"
          showSearch
          optionFilterProp="children"
          placeholder="Select a Collection"
          onChange={onCollectionChange}
          filterOption={filterOption}
          options={collectionOptions()}
        />
        <Select
          className="col-span-1"
          size="large"
          showSearch
          optionFilterProp="children"
          placeholder="Select a product"
          onChange={onProductChange}
          filterOption={filterOption}
          options={productOptions()}
        />
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
