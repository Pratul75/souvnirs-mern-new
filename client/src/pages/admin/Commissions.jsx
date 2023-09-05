import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";

const Commissions = () => {
  return (
    <>
      <Link to={PATHS.adminAddCommission} className="btn btn-primary">
        Add Commissions
      </Link>
    </>
  );
};

export default Commissions;
