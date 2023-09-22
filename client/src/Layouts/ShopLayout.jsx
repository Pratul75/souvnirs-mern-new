import PropTypes from "prop-types";
import {
  TopHeader,
  SouvnirsHeader,
  ShopFooter,
  ShopNavbar,
} from "../components";
import { FaWhatsapp } from "react-icons/fa";

// shop layout
const ShopLayout = ({ children }) => {
  return (
    <div className="overflow-x-hidden">
      <TopHeader
        heading="We in Souvnirs offer World Wide Completely Free Returns and Free Shipping on bulk orders | India's Best Online bulk gifting platform"
        language="English"
        currency="INR"
      />
      <SouvnirsHeader badgeColor="badge-primary" buttonColor="bg-primary" />
      <div className="px-5">
        <ShopNavbar />
       
      </div>
      <div className="mx-5 flex flex-col">{children}</div>
      <ShopFooter />
      {/* WhatsApp icon */}
    </div>
  );
};

export default ShopLayout;

ShopLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
