import { Header, ReusableTable } from "../../components";
import PaymentBanner from "../../assets/images/collectionBannerImg.png";
import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
const Shipment = () => {
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
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfsdfse drf qwdefd fjhr f4 wedr w"
      // image={PaymentBanner}
      />

      <div className="mt-20">
        <ReusableTable
          tableTitle="Shipment List"
          columns={columns}
          data={data}
        />
      </div>
    </div>
  );
};

export default Shipment;
