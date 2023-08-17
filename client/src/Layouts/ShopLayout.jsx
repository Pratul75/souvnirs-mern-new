import PropTypes from "prop-types";
import {
  TopHeader,
  SouvnirsHeader,
  ShopFooter,
  ShopNavbar,
} from "../components";

const ShopLayout = ({ children }) => {
  return (
    <>
      <TopHeader
        heading="World Wide Completely Free Returns and Free Shipping"
        language="English"
        currency="USD"
      />
      <SouvnirsHeader badgeColor="badge-primary" buttonColor="bg-primary" />
      <div className="w-full  flex items-center justify-center">
        <ShopNavbar />
      </div>
      <div className="mx-5 md:mx-16 flex flex-col">{children}</div>
      <ShopFooter />
    </>
  );
};

export default ShopLayout;

ShopLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
