import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../api";
import { debouncedShowToast } from "../../utils";
const Commissions = () => {
  const [commissionList, setCommissionList] = useState([]);

  const getCommissionList = async () => {
    try {
      const response = await API_WRAPPER.get("/commission/get-all-commissions");
      if (response.status === 200) {
        console.log("COMMISSION LIST: ", response.data);
        setCommissionList(response.data);
        debouncedShowToast("Commission List loaded", "success");
      }
    } catch (error) {
      debouncedShowToast(error.messasge, "error");
    }
  };

  useEffect(() => {
    getCommissionList();
  }, []);

  return (
    <>
      <Link to={PATHS.adminAddCommission} className="btn btn-primary">
        Add Commissions
      </Link>
    </>
  );
};

export default Commissions;
