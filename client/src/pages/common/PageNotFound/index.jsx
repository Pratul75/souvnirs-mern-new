import { Link } from "react-router-dom";
import { PATHS } from "../../../routes/paths";

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="p-8 bg-base-100 rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-4">404 - Page not found</h1>
        <p className="text-lg mb-4">
          Oops! It seems like you are tring to access a page that is not
          available.
        </p>
        <Link to={PATHS.login} className="btn btn-accent">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
