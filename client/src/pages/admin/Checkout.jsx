import { Header } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
const Checkout = () => {
  return (
    <div>
      <Header
        heading="Checkouts"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to"
        image={HeaderImgTwo}
      />

      <div className="mt-4">{/* <ReusableTable /> */} Table</div>
    </div>
  );
};

export default Checkout;
