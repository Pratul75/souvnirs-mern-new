import { useState } from "react";
import API_WRAPPER from "../../../api";
import { PATHS } from "../../../Routes/paths";
import { useNavigate } from "react-router-dom";
// add attribute hooks
const useAddAttributes = () => {
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
  return {
    attributeName,
    setAttributeName,
    handleAddAttribute,
  };
};

export default useAddAttributes;
