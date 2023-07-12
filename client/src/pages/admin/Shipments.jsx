import { Header, ReusableTable } from "../../components";
import PaymentBanner from "../../assets/images/collectionBannerImg.png";
import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
const Payment = () => {
  const [ordersList, setOrdersList] = useState([]);

  const getOrders = async () => {
    try {
      const response = await API_WRAPPER.get("/order/get-orders");
      setOrdersList(response?.data);
    } catch (error) {
      console.error("Error occured while fetching orders");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "_id",
      },
      {
        Header: "Shipped Status",
        accessor: "shipped",
        // temperorly true is static
        Cell: (row) => <p>true</p>,
      },
      {
        Header: "Order Status",
        accessor: "order_status",
      },
    ],
    []
  );

  const data = useMemo(() => ordersList, [ordersList]);

  return (
    <div>
      <Header
        heading="Shipments"
        subheading="This is a Payment page"
        image={PaymentBanner}
      />

      <div className="mt-4">
        <ReusableTable columns={columns} data={data} showButtons={false} />
      </div>
    </div>
  );
};

export default Payment;
