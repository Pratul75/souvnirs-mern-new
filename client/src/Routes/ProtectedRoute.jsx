import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { PATHS } from "./paths";

const useAuth = () => {
  // get item from localstorage
  let user;
  let vendor;
  let admin;
  let role;
  const _user = localStorage.getItem("role");

  // console.log("USER IN USE AUTH", _user);
  if (_user) {
    role = JSON.parse(_user);
    if (role === "user") {
      user = role;
    } else if (role === "vendor") {
      vendor = role;
    } else if (role === "admin") {
      admin = role;
    }
  }
  if (user || vendor || admin) {
    return {
      auth: true,
      role: role,
    };
  } else {
    return {
      auth: false,
      role: null,
    };
  }
};

const RouteValidate = (path, role) => {
  for (let key in PATHS) {
    if (PATHS[key] === path) {
      if (PATHS[key].includes(role)) {
        return true;
      }
    }
  }
  return false;
};

export const ProtectedRoute = ({ roleRequired, path, children }) => {
  const { auth, role } = useAuth();
  console.log(roleRequired, path, children, auth);

  if (roleRequired) {
    return auth ? (
      roleRequired === role && RouteValidate(path, role) ? (
        children
      ) : (
        <Navigate to={PATHS.permissionDenied} />
      )
    ) : (
      <Navigate to={PATHS.login} />
    );
  } else {
    return auth ? children : <Navigate to={PATHS.login} />;
  }
};

ProtectedRoute.propTypes = {
  roleRequired: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
