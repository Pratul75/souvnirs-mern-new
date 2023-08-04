import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        <div>
          {/* You can add any layout, header, or footer components here */}
          <Component />
        </div>
      }
    />
  );
};

export default PublicRoutes;
// Add prop validation using PropTypes
PublicRoutes.propTypes = {
  component: PropTypes.elementType.isRequired,
};
