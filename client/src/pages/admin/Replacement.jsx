import { Header } from "../../components";
import ReplacementBannerImage from "../../assets/bannerImages/refundImage.png";

const Replacement = () => {
  return (
    <div>
      <Header
        heading="Replacement"
        subheading="This is a subheading for the replacement section. This subheading contins necessary details that"
        image={ReplacementBannerImage}
      />
    </div>
  );
};

export default Replacement;
