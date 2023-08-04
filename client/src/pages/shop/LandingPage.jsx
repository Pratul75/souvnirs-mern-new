import { Link } from "react-router-dom";
import { PATHS } from "../../Routes/paths";

const LandingPage = () => {
  return (
    <div className="w-screen h-screen bg-base-300">
      <div className="w-full flex items-center justify-center">
        <Link className="btn btn-primary" to={PATHS.login}>
          Login
        </Link>
        <Link className="btn btn-primary" to={PATHS.register}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
