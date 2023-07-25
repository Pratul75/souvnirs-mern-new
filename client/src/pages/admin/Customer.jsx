import { useState } from "react";
import { Header } from "../../components";
import { debouncedShowToast } from "../../utils";
import API_WRAPPER from "../../api";

const Customer = () => {
  const [customerList, setCustomerList] = useState([]);
  const [apiTrigger, setApiTrigger] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({});

  const getAllCustomers = async () => {
    try {
      const response = await API_WRAPPER.get("customers/get-customers");
      if (response.status === 200) {

        
        debouncedShowToast("Successfully loaded customer list", "success");
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  return (
    <div>
      <Header
        heading="Customer"
        subheading="This is a customers page which provides information regarding all the customers that are present in the application"
      />
    </div>
  );
};

export default Customer;
