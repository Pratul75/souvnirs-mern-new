import { Card, Header } from "../../components";
import AttributeBannerImage from "../../assets/bannerImages/attributesImage.png";
import useCategories from "../../hooks/useCategories";
import useAttributes from "../../hooks/useAttributes";
import { useState } from "react";
import SearchableDropdown from "../../components/SearchableDropdown";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
const AddProductAttributes = () => {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");

  const p = useSelector(state => state.product)
  console.log('AddProductAttributes.jsx', p);

  const categories = useCategories();
  const attributes = useAttributes(categoryId !== "" && categoryId);

  const handleSelectedValue = (category) => {
    console.log("CATEGORY: ", category);
    setCategoryId(category.id);

    setCategoryName(category.name);
  };
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
            <div className="flex flex-col p-4">
              <SearchableDropdown
                handleSelect={handleSelectedValue}
                items={categories}
              />
              <p>Selected Category: {categoryName}</p>
            </div>
          </Card>
          {categoryName &&
            attributes.map((attribute) => (
              <p key={nanoid()}>{attribute.name}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductAttributes;
