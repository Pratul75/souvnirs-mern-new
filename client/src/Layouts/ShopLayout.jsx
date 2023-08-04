import PropTypes from "prop-types";

const ShopLayout = ({ children }) => {
  return (
    <div>
      <div>Landing Page Navbar</div>
      <div>Landing Page Sidebar</div>
      {children}
      <div>Landing Page Footer</div>
    </div>
  );
};

export default ShopLayout;

ShopLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
