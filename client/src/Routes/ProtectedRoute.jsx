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

const RouteValidate = (defaultRole, localStorageRole) => {
  if (defaultRole === localStorageRole) return true;
  return false;
};

export const ProtectedRoute = ({ roleRequired, children, defaultRole }) => {
  const { auth, role } = useAuth();

  if (!auth) {
    // If not authenticated, redirect to login
    return <Navigate to={PATHS.login} />;
  }
  if (roleRequired) {
    if (role === "user") {
      // User can access user routes only
      if (roleRequired === "user" && RouteValidate(defaultRole, role)) {
        return children;
      }
    } else if (role === "vendor") {
      // Vendor can access vendor routes only
      if (roleRequired === "vendor" && RouteValidate(defaultRole, role)) {
        return children;
      }
    } else if (role === "admin") {
      // Admin can access admin routes only
      if (roleRequired === "admin" && RouteValidate(defaultRole, role)) {
        return children;
      }
    }

    // If the user's role doesn't match the required role or the route validation fails, redirect to permission denied page
    return <Navigate to={PATHS.permissionDenied} />;
  }

  // For routes without specific role requirements, simply render the children components
  return children;
};

ProtectedRoute.propTypes = {
  roleRequired: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultRole: PropTypes.string.isRequired,
};
