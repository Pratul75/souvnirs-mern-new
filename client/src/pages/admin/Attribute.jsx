import { Header } from "../../components";
import { GoPlus } from "react-icons/go";
import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
import ReusableTable from "../../components/Table";
import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import API_WRAPPER from "../../api";
import { useEffect, useState } from "react";

const Attributes = () => {
  const [attributesList, setAttributesList] = useState([]);
  const [getApiTrigger, setGetApiTrigger] = useState(false);

  const fetchAllAttributes = async () => {
    try {
      const response = await API_WRAPPER.get("/attribute/get-all-attributes");
      if (response.status === 200) {
        console.log("ALL ATTRIBUTES LIST: ", response?.data);
        setAttributesList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while fetching all attributes list", error);
    }
  };

  useEffect(() => {
    fetchAllAttributes();
  }, [getApiTrigger]);
  const columns = [
    {
      Header: "Attribute Id",
      accessor: "_id",
    },
    {
      Header: "Attribute Name",
      accessor: "name",
    },
  ];
  const handleDeleteAttribute = async (id) => {
    try {
      const response = API_WRAPPER.delete(`/attribute/delete-attribute/:${id}`);

      setGetApiTrigger((prevState) => !prevState);
      console.log("DELETED ATTRIBUTE RESPONSE: ", response.data);
    } catch (error) {
      console.error("Error occured while deleting the attribute ");
    }
  };

  return (
    <>
      <Header
        heading="Attribute Management"
        image={CategoryBnnerImng}
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, "
      />

      <div className="w-full flex justify-end gap-4 mt-2">
        <select className="select select-info">
          <option value="Sort by (Category)">Sort by Attributes</option>
        </select>

        <Link
          to={PATHS.adminAddAttributes}
          className="btn bg-[#4680FF] text-white font-thin"
        >
          <GoPlus stroke="1px" size={20} />
          Add Attribute
        </Link>
      </div>
      <div className="mt-5">
        <ReusableTable
          data={attributesList}
          columns={columns}
          onDelete={handleDeleteAttribute}
          showButtons={true}
        />
      </div>
    </>
  );
};

export default Attributes;
