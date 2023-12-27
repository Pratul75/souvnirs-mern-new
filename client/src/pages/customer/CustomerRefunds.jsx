import { useEffect, useMemo, useState } from "react";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { getStatusStyles } from "../../utils";

const CustomerRefunds = () => {
  const [data, setData] = useState([]);
  const columns = useMemo(
    () => [
      // {
      //   Header: "Invoice ID",
      //   accessor: "invoiceId",
      // },
      {
        Header: "Order id",
        accessor: "_id",
      },
      {
        Header: "Product Name",
        accessor: "product.name",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Total Amount",
        accessor: "quantityTotal",
        Cell: ({ row }) => {
          return (
            <div>
              <p>{row?.original?.quantity * row?.original?.price}</p>
            </div>
          );
        },
      },
      {
        Header: "Order Date and Time",
        accessor: "createdAt",
        Cell: ({ row }) => {
          return <div>{Date(row?.original?.createdAt)}</div>;
        },
      },
      {
        Header: "Order Status",
        accessor: "order_status",
      },
      {
        Header: "refund status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(row?.original?.status);
        },
      },
    ],
    []
  );

  const getDatas = async () => {
    try {
      const responce = await API_WRAPPER.get("/cutomer/refund/list/order");
      console.log("------>", responce);
      setData(responce?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div>
      <Header heading="Refund" />
      <ReusableTable
        tableTitle="Refund List"
        columns={columns}
        data={data}
        enablePagination
        pageSize={10}
      />
    </div>
  );
};

export default CustomerRefunds;
