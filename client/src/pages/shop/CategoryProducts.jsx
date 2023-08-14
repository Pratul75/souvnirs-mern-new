import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const location = useParams();
  console.log("LOCATION OBJECT: ", location);
  return <div>SLUG: {location.slug}</div>;
};

export default CategoryProducts;
