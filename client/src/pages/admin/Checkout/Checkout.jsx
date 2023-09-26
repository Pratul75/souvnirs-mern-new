import { Header } from "../../../components";
import CheckoutBannerImage from "../../../assets/bannerImages/checkoutImage.png";
import { useQuery } from "react-query";
import { fetchCheckouts } from "../../../api/apiCalls";
import { useEffect } from "react";
const Checkout = () => {
  const {
    data: checkouts,
    isLoading,
    error,
  } = useQuery("get_all_checkouts", fetchCheckouts);
  useEffect(() => {
    console.log("CHECKOUTS DATA: ", checkouts);
  }, []);

  if (isLoading) {
    return <p>Loading Checkouts</p>;
  }

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
