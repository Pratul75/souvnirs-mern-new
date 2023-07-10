import { Header, ReusableTable } from "../../components";
import CollectionBannerImg from "../../assets/images/collectionBannerImg.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";

const CollectionConditions = () => {
  const [collectionConditions, setCollectionConditions] = useState(null);
  const [collectionConditionList, setCollectionConditionList] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);

  // table columns
  const columns = useMemo(
    () => [
      {
        Header: "Collection Condition Title",
        accessor: "title",
      },
      {
        Header: "Parent Id",
        accessor: "parentId",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  // table data
  const data = useMemo(
    () => collectionConditionList,
    [collectionConditionList]
  );

  const addCollectionCondition = async () => {
    try {
      const response = await API_WRAPPER.post(
        `/collection-condition/create-collection-condition`,
        { title: collectionConditions, parentId: 0 }
      );
      console.log("RESPONSE: ", response?.data);
      setApiTrigger((prevState) => !prevState);
    } catch (error) {
      console.error(
        "Error occured while adding new collection condition",
        error
      );
    }
  };

  const getAllCollectionCondition = async () => {
    try {
      const response = await API_WRAPPER.get(
        "/collection-condition/get-all-collection-conditions"
      );
      if (response.status === 200) {
        setCollectionConditionList(response?.data);
      }
    } catch (error) {
      console.error(
        "Error occured while getting all collection conditions",
        error
      );
    }
  };

  const deleteCollectionCondition = async (id) => {
    try {
      const response = API_WRAPPER.delete(
        `/collection-condition/delete-collection-condition/:${id}`
      );
      setApiTrigger((prevState) => !prevState);
      console.log("DELETE RESPONSE: ", response);
    } catch (error) {
      console.error("Error occured while deleting collection condition", error);
    }
  };

  const handleChange = (e) => {
    setCollectionConditions(e.target.value);
  };

  const handleDelete = (data) => {
    deleteCollectionCondition(data._id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCollectionCondition();
  };

  useEffect(() => {
    getAllCollectionCondition();
  }, [apiTrigger]);

  return (
    <div>
      <Header
        heading="Collection Conditions"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
        image={CollectionBannerImg}
      />
      <div className="mt-4">
        <form
          onSubmit={handleSubmit}
          className="form-control bg-white p-4 rounded-xl"
        >
          <label htmlFor="collection-condition-input" className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            onChange={(e) => handleChange(e)}
            className="input input-accent w-1/2"
            placeholder="Enter Title"
            type="text"
            name="colle ction-condition-input"
          />
          <button className="btn btn-accent w-1/2 mt-4 text-white">
            Add Title
          </button>
        </form>
        <div className="mt-4">
          <ReusableTable
            columns={columns}
            data={data}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionConditions;
