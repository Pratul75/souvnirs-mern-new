import PropTypes from "prop-types";
import {
  TopHeader,
  SouvnirsHeader,
  ShopFooter,
  ShopNavbar,
} from "../components";

const ShopLayout = ({ children }) => {
  return (
    <div className="overflow-x-hidden">
      <TopHeader
        heading="World Wide Completely Free Returns and Free Shipping"
        language="English"
        currency="USD"
      />
      <SouvnirsHeader badgeColor="badge-primary" buttonColor="bg-primary" />
      <div className="px-5">
        <ShopNavbar />
      </div>
      <div className="mx-5 flex flex-col">{children}</div>
      <ShopFooter />
    </div>
  );
};

export default ShopLayout;

ShopLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
