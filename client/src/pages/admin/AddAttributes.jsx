import { Header } from "../../components";
// import CategoryBnnerImng from "../../assets/images/categoryManagement.png";
import API_WRAPPER from "../../api";
import { useState } from "react";
import { PATHS } from "../../Routes/paths";
import { useNavigate } from "react-router-dom";

const AddAttribute = () => {
  const navigate = useNavigate();
  const [attributeName, setAttributeName] = useState("");
  const handleAddAttribute = async (e) => {
    e.preventDefault();
    try {
      const response = API_WRAPPER.post("/attribute/add-attribute", {
        name: attributeName,
      });
      navigate(PATHS.adminAttribute);
      console.log("RESPONSE DATA AFTER DELETING ATTRIBUTE: ", response.data);
    } catch (error) {
      console.error("Error occured while adding attribute", error);
    }
  };

  return (
    <div className="w-full">
      <Header
        heading="Add Attribute"
        // image={CategoryBnnerImng}
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the , "
      />
      <div>
        <h1 className="text-2xl mt-4">Add Attributes</h1>
        <form
          onSubmit={(e) => handleAddAttribute(e)}
          className="flex flex-col items-center justify-center mt-4"
        >
          <div className="form-control w-1/2">
            <label htmlFor="attribute" className="label">
              <span className="label-text">Add Attribute</span>
            </label>
            <input
              onChange={(e) => setAttributeName(e.target.value)}
              className="input input-primary"
              placeholder="add attributes"
              type="text"
              name="attribute"
              id="attribute"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4  w-1/2 ">
            Add Attribute
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAttribute;
