import { Header, ReusableTable } from "../../components";
import CollectionBannerImg from "../../assets/images/collectionBannerImg.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const CollectionConditions = () => {
  const [collectionConditions, setCollectionConditions] = useState(null);
  const [collectionConditionList, setCollectionConditionList] = useState([]);
  const [conditionValueList, setConditionValueList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);

  // table columns
  const columns = useMemo(
    () => [
      {
        Header: "Collection Condition Title",
        accessor: "title",
      },
      {
        Header: "Condition Values",
        accessor: "conditionValues",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const convertArr = (arr) => {
    const convertedArr = arr.map((item) => {
      return { label: item.conditionValue, value: item._id };
    });

    return convertedArr;
  };

  // table data
  const data = useMemo(
    () => collectionConditionList,
    [collectionConditionList]
  );

  const addCollectionCondition = async () => {
    try {
      const response = await API_WRAPPER.post(
        `/collection-condition/create-collection-condition`,
        {
          title: collectionConditions,
          conditionValues: selected.map((item) => item?.value),
        }
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
        console.log("COLLECTION CONDITIONS LIST: ", response?.data);
      }
    } catch (error) {
      console.error(
        "Error occured while getting all collection conditions",
        error
      );
    }
  };

  const getAllConditionValues = async () => {
    const response = await API_WRAPPER.get(
      "/condition-value/get-all-condition-values"
    );
    if (response.status === 200) {
      setConditionValueList(response?.data);
      console.log("CONDITION VALUE LIST: ", response?.data);
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
    getAllConditionValues();
  }, [apiTrigger]);

  useEffect(() => {
    console.log("MULTI SELECT STATE: ", selected);
  }, [selected]);

  return (
    <div>
      <Header
        heading="Collection Conditions"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        image={CollectionBannerImg}
      />
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-control bg-white p-4 rounded-xl">
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
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Sub Condition</span>
            </label>

            <MultiSelect
              options={convertArr(conditionValueList)}
              value={selected}
              onChange={setSelected}
              className="w-1/2   "
            />
          </div>
        </div>

        <button className="btn btn-accent w-1/2 mt-4 text-white">
          Add Title
        </button>
        <div className="mt-4">
          <ReusableTable
            columns={columns}
            data={data}
            onDelete={handleDelete}
            showButtons={true}
          />
        </div>
      </form>
    </div>
  );
};

export default CollectionConditions;
