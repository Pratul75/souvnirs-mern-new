import { Header } from "../../../components";
import ReviewsBannerImage from "../../../assets/bannerImages/reviewsImage.png";
const Reviews = () => {
  return (
    <div>
      <Header
        heading="Reviews"
        subheading="This is a subheading for the reviews section. This subheading contins necessary details that are required by user to know "
        image={ReviewsBannerImage}
      />
    </div>
  );
};

export default Reviews;
