import { Header } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
const Checkout = () => {
  return (
    <div>
      <Header
        heading="Checkouts"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. est emmeet dolor de futa "
        image={HeaderImgTwo}
      />

      <div className="mt-4">{/* <ReusableTable /> */} Table</div>
    </div>
  );
};

export default Checkout;
