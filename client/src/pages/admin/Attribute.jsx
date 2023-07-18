import { Header } from "../../components";
import { GoPlus } from "react-icons/go";
// import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
import ReusableTable from "../../components/Table";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";
import API_WRAPPER from "../../api";
import { useEffect, useState } from "react";
import { getStatusStyles } from "../../utils";

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
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => {
        return getStatusStyles(row?.original?.status);
      },
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
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. asdasd wda sw3e awe "
        // image={CategoryBnnerImng}
      />

      <div className="w-full flex justify-end gap-4 mt-8"></div>
      <div className="mt-5">
        <Link
          to={PATHS.adminAddAttributes}
          className="btn bg-[#4680FF] text-white font-thin w-full mb-4 mt2"
        >
          <GoPlus stroke="1px" size={20} />
          Add Attribute
        </Link>
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
