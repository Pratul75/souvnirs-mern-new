import { Header } from "../../components";

const CustomerWishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const fetchWishlist = async () => {
    try {
      const response = await API_WRAPPER.get("/products/get-all-products");
      if (response.status === 200) {
        setProductsList(response?.data);
        console.log("RESPONSE: ", response?.data);
      }
    } catch (error) {
      console.error({ error, messge: error.message });
    }

  }
  return <div><Header heading="Wishlist"
    subheading="A wish list  provides all the products added by the customer to wishlist . Customer can edit and delete the wishlist produts  from this UI"
  /></div>;
};

export default CustomerWishlist;
