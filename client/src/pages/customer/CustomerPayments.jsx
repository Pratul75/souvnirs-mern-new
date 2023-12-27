import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
import { Header, ReusableTable } from "../../components";

const CustomerPayments = () => {
  const [state, setState] = useState({
    listData: [],
  });
  const getUsersPaymentstatus = async () => {
    try {
      const getdata = await API_WRAPPER.get("/cutomer/payment/success/order");
      console.log("<<<<99999*", getdata?.data);
      setState((pre) => ({ ...pre, listData: getdata?.data }));
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Order Id",
        accessor: "_id",
      },
      {
        Header: "Product name",
        accessor: "product.name",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Total Amount",
        accessor: "totalAmount",
        Cell: ({ row }) => {
          return <div>{row?.original?.price * row?.original?.quantity} ₹</div>;
        },
      },
      {
        Header: "Paid Amount",
        accessor: "total_paid",
        Cell: ({ row }) => {
          return <div>{row?.original?.total_paid} ₹</div>;
        },
      },
      {
        Header: "Remain Amount",
        accessor: "remain",
        Cell: ({ row }) => {
          return (
            <div>
              {row?.original?.price * row?.original?.quantity -
                row?.original?.total_paid}{" "}
              ₹
            </div>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    getUsersPaymentstatus();
  }, []);

  return (
    <div>
      <Header
        heading="Payments"
        subheading="This page provides information regarding all the payments done by the customer"
      />
      <ReusableTable
        data={state?.listData}
        columns={columns}
        pageSize={10}
        enablePagination
      />
    </div>
  );
};

export default CustomerPayments;
