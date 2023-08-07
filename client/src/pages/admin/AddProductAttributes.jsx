import { useEffect, useState } from "react";
import { Card, Header } from "../../components";
import AttributeBannerImage from "../../assets/bannerImages/attributesImage.png";
import useCategories from "../../hooks/useCategories";
import SearchableDropdown from "../../components/SearchableDropdown";
import { ToastContainer } from "react-toastify";
import API_WRAPPER from "../../api";
import { debouncedShowToast } from "../../utils";
import { useSelector } from "react-redux";
const AddProductAttributes = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [attributesList, setAttributesList] = useState([]);

  const p = useSelector((state) => state.product);
  console.log("AddProductAttributes.jsx", p);

  const categories = useCategories();

  const handleSelectedValue = (category) => {
    console.log("SELECTED CATEGORY: ", category);
    setCategoryId(category?.id);
    setCategoryName(category?.name);
  };

  const fetchAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/attribute/get-all-attributes/${categoryId}`
      );
      console.log("ATTRIBUTES RESPONSE: ", response.data);
      setAttributesList(response?.data);
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };
  useEffect(() => {
    console.log("CATEGORY ID: ", categoryId);
    fetchAllAttributes();
  }, [categoryId]);

  return (
    <div>
      <Header
        heading="Add Product Attributes"
        subheading="Add attributes, categories and their configuration on this page"
        image={AttributeBannerImage}
      />
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4 p-4">
          <Card>
            <div className=" col-span-2 md:col-span-1 p-4">
              <SearchableDropdown
                handleSelect={handleSelectedValue}
                items={categories}
              />
              <p>Selected Category: {categoryName}</p>
            </div>
          </Card>
          <Card>
            <div className=" col-span-2 md:col-span-1 p-4">
              {attributesList?.map((item) => item.name)}
            </div>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProductAttributes;
