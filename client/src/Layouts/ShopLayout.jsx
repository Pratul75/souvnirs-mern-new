import PropTypes from "prop-types";
import {
  TopHeader,
  SouvnirsHeader,
  ShopFooter,
  ShopNavbar,
} from "../components";

const ShopLayout = ({ children }) => {
  return (
    <div>
      <TopHeader
        heading="World Wide Completely Free Returns and Free Shipping"
        language="English"
        currency="USD"
      />
      <SouvnirsHeader badgeColor="badge-primary" buttonColor="bg-primary" />
      <div className="w-full  flex items-center justify-center">
        <ShopNavbar />
      </div>
      {children}
      <ShopFooter />
    </div>
  );
};

export default ShopLayout;

ShopLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
