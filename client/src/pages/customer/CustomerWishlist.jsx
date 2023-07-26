import { useEffect, useState } from "react";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";

const CustomerWishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const fetchWishlist = async () => {
    console.log('CustomerWishlist.jsx', "triggerd api");
    try {
      const response = await API_WRAPPER.get("/wishlist/getmywishlist");
      if (response.status === 200) {
        setWishlist(response?.data);
        console.log("RESPONSE: ", response?.data);
      }
    } catch (error) {
      console.error({ error, messge: error.message });
    }
    console.log('CustomerWishlist.jsx', wishlist);
  }
  useEffect(() => { fetchWishlist() }, [])
  return <div><Header heading="Wishlist"
    subheading="A wish list  provides all the products added by the customer to wishlist . Customer can edit and delete the wishlist produts  from this UI"
  />
    <div className="w-full gap-4 mt-14">

      <div className="mt-4">
        {/* <ReusableTable
          tableTitle="Products List"
          columns={columns}
          data={data}
          showButtons
          enableDelete
          onDelete={handleDelete}
        /> */}
      </div>
    </div></div>;
};

export default CustomerWishlist;
