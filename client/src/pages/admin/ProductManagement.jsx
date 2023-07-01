import { Header } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
const ProductManagement = () => {
  return (
    <div>
      <Header
        heading="Product Management"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to  "
        image={HeaderImgTwo}
      />
    </div>
  );
};

export default ProductManagement;
