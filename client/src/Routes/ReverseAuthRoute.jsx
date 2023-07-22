import { Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
const ReverseAuthRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("role"));
  const loggedRole = useSelector((state) => state.appConfig.login);
  console.log("LOGGED ROLE: ", loggedRole);

  if (location.pathname === "/login" && token) {
    if (loggedRole === "user" || role === "user") {
      return <Navigate to={PATHS.userDashboard} />;
    } else if (loggedRole === "vendor" || role === "vendor") {
      return <Navigate to={PATHS.astrologerDashboard} />;
    } else if (loggedRole === "admin" || role === "admin") {
      return <Navigate to={PATHS.adminDashboard} />;
    }
  }

  return children;
};

ReverseAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ReverseAuthRoute;
