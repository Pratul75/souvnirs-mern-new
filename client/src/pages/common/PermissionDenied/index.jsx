import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import PermissionDeniedImage from "../../../assets/images/permissionDenied.png";

const PermissionDenied = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="p-8 flex justify-center flex-col">
        <img src={PermissionDeniedImage} alt="" />

        <h1 className="text-4xl text-center my-4 font-bold">
          Permission Denied
        </h1>

        <Link to={PATHS.login} className="btn bg-themeColor text-white">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PermissionDenied;
