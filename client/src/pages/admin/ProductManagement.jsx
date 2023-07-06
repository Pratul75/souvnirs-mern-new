import { Header } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";

const ProductManagement = () => {
  return (
    <div>
      <Header
        heading="Add Product"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to  "
        image={HeaderImgTwo}
      />
      <Link
        to={PATHS.adminAddProducts}
        className="btn btn-secondary float-right "
      >
        Add Product
      </Link>
      {/* <ReusableTable
        columns={columns}
        data={data}
        onDelete={handleDelete}
        onEdit={handleEdit}
      /> */}
    </div>
  );
};

export default ProductManagement;
