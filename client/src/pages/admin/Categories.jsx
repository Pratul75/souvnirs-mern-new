import { Header } from "../../components";
import { GoPlus } from "react-icons/go";
import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
import ReusableTable from "../../components/Table";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";

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
    ],
    []
  );
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
