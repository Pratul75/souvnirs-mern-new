import { Header } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import ReusableTable from "../../components/Table";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";

const ProductManagement = () => {
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Job",
        accessor: "job",
      },
      {
        Header: "Favorite Color",
        accessor: "color",
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        id: 1,
        name: "John Doe",
        job: "Developer",
        color: "Blue",
      },
      {
        id: 2,
        name: "Jane Smith",
        job: "Designer",
        color: "Red",
      },
      // Add more data as needed
    ],
    []
  );

  const handleEdit = (row) => {
    // Handle edit action
    console.log("Edit:", row);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log("Delete:", id);
  };

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
      <ReusableTable
        columns={columns}
        data={data}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default ProductManagement;
