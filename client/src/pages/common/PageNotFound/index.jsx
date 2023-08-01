import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import ErrorPngImage from "../../../assets/images/404png.png";
const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="p-8 flex justify-center flex-col">
        <img src={ErrorPngImage} alt="" />

        <h1 className="text-4xl text-center my-4 font-bold">
          404 - Page not found
        </h1>

        <Link to={PATHS.login} className="btn bg-themeColor text-white">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
