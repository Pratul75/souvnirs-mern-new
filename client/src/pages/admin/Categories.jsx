import { Header } from "../../components";
import { GoPlus } from "react-icons/go";
// import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
import ReusableTable from "../../components/Table";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { getStatusStyles } from "../../utils";

const Categories = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);

  const getAllCategories = async () => {
    try {
      const response = await API_WRAPPER.get("/category/get-all-categories");
      if (response.status === 200) {
        console.log("ALL CATEGORIES LIST: ", response.data);
        setCategoriesList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while fetching all categories", {
        error,
      });
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [apiTrigger]);

  const handleDelete = async (id) => {
    console.log("ID: ", id);
    const response = await API_WRAPPER.delete(
      `/category/delete-category/:${id}`
    );
    setApiTrigger((prevState) => !prevState);
    console.log("DELETED CATEGORY: ", response.data);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "HSN Id",
        accessor: "hsn_code",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(row?.original?.status);
        },
      },
    ],
    []
  );
  return (
    <>
      <Header
        heading="Category Management"
        subheading="This is a subheading for the category management section. This subheading contins necessary details that are required by user to know about category page "
        // image={CategoryBnnerImng}
      />

      <div className="w-full  gap-4 mt-14">
        <div className="flex justify-end">
          <Link
            to={PATHS.adminAddCategory}
            className="btn bg-themeColor text-white font-thin w-48"
          >
            <GoPlus size={20} />
            Add Category
          </Link>
        </div>
      </div>
      <div className="mt-5">
        <ReusableTable
          data={categoriesList}
          columns={columns}
          onDelete={handleDelete}
          showButtons={true}
        />
      </div>
    </>
  );
};

export default Categories;
