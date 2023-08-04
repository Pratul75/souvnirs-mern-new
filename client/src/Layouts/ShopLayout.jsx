import PropTypes from "prop-types";
import { TopHeader, SouvnirsHeader } from "../components";

const ShopLayout = ({ children }) => {
  return (
    <div>
      <TopHeader
        heading="World Wide Completely Free Returns and Free Shipping"
        language="English"
        currency="USD"
      />
      <SouvnirsHeader />

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
