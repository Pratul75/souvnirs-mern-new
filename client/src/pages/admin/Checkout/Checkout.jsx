import { Header } from "../../../components";
import CheckoutBannerImage from "../../../assets/bannerImages/checkoutImage.png";
const Checkout = () => {
  return (
    <div>
      <Header
        heading="Checkouts"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. est emmeet dolor de futa "
        image={CheckoutBannerImage}
      />

      <div className="mt-4">{/* <ReusableTable /> */} Table</div>
    </div>
  );
};

export default Checkout;
