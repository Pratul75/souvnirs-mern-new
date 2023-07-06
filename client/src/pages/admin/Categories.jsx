import { Header } from "../../components";
import { GoPlus } from "react-icons/go";
import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
import ReusableTable from "../../components/Table";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
const Categories = () => {
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Sub Category",
      accessor: "subCategory",
    },
  ];

  const data = [
    {
      name: "Product 1",
      subCategory: "Category A",
    },
    {
      name: "Product 2",
      subCategory: "Category B",
    },
    {
      name: "Product 2",
      subCategory: "Category B",
    },
    {
      name: "Product 2",
      subCategory: "Category B",
    },
    {
      name: "Product 2",
      subCategory: "Category B",
    },
    {
      name: "Product 2",
      subCategory: "Category B",
    },
    {
      name: "Product 2",
      subCategory: "Category B",
    },
    {
      name: "Product 2",
      subCategory: "Category B",
    },
    {
      name: "Product 2",
      subCategory: "Category B",
    },
    {
      name: "Product 2",
      subCategory: "Category B",
    },
  ];

  return (
    <>
      <Header
        heading="Category Management"
        image={CategoryBnnerImng}
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "
      />

      <div className="w-full flex justify-end gap-4 mt-2">
        <select className="select select-info">
          <option value="Sort by (Category)">Sort by Category</option>
        </select>

        <Link
          to={PATHS.adminAddCategory}
          className="btn bg-[#4680FF] text-white font-thin"
        >
          <GoPlus stroke="1px" size={20} />
          Add Category
        </Link>
      </div>
      <div className="mt-5">
        <ReusableTable data={data} columns={columns} />
      </div>
    </>
  );
};

export default Categories;
