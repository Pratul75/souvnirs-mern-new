import { Header, ReusableTable } from "../../components";
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
    console.log("ORDER LIST: ", ordersList);
  }, [ordersList]);
  useEffect(() => {
    getOrders();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "vendor_id.firstName",
        Cell: ({ row }) => {
          return (
            <div>
              <p>
                {row?.original?.vendor_id?.firstName}{" "}
                {row?.original?.vendor_id?.lastName}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Order ID",
        accessor: "courier_id",
      },
      {
        Header: "Total Price",
        accessor: "total_price",
      },
      {
        Header: "Total Paid",
        accessor: "total_paid",
      },
      {
        Header: "Payment Method",
        accessor: "payment_method",
      },
      {
        Header: "Payment Status",
        accessor: "payment_status",
      },
    ],
    []
  );

  const data = useMemo(() => ordersList, [ordersList]);

  return (
    <div>
      <Header
        heading="Payments"
        subheading="This is a subheading for the payments section. This subheading contins necessary details that are required by user to know about payments page"
        // image={PaymentBanner}
      />

      <div className="mt-4">
        <ReusableTable
          tableTitle="Payment List"
          columns={columns}
          data={data}
          enablePagination
          pageSize={10}
          showButtons={false}
        />
      </div>
    </div>
  );
};

export default Payment;
