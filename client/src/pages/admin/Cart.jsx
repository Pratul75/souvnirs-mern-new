import { Header, ReusableTable } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";

const Cart = () => {
  const [cartList, setCartList] = useState([]);

  const columns = useMemo(
    () => [
      {
        Header: "Cart ID",
        accessor: "_id",
      },
      {
        Header: "Customer ID",
        accessor: "customer_id",
      },

      {
        Header: "Product Name",
        accessor: "product_name",
      },
      {
        Header: "Product Price",
        accessor: "product_price",
      },
      {
        Header: "Product Quantity",
        accessor: "product_quantity",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const data = useMemo(() => cartList, [cartList]);
  const getCartList = async () => {
    try {
      const response = await API_WRAPPER.get("/cart/get-all-carts");
      if (response.status === 200) {
        setCartList(response.data);
        console.log("Cart List: ", response?.data);
      }
    } catch (error) {
      console.error("Error occured while fetching all cart list", error);
    }
  };

  useEffect(() => {
    getCartList();
  }, []);

  return (
    <>
      <Header
        heading="Cart"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfsdfse drf qwdefd fjhr f4 wedr w wdefd fjhr f4 wedr w  "
        // image={HeaderImgTwo}
      />
      <div className="mt-4">
        <ReusableTable columns={columns} data={data} showButtons={true} />
      </div>
    </>
  );
};

export default Cart;
