import { Link } from "react-router-dom";
import { PATHS } from "../../../routes/paths";

const PermissionDenied = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="p-8 bg-base-100 rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-4">404 - Permission Denied</h1>
        <p className="text-lg mb-4">
          Oops! You don't have permission to access this page.
        </p>
        <Link to={PATHS.login} className="btn btn-accent">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PermissionDenied;
