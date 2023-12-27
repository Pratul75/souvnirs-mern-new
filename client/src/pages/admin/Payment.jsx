import { Header, ReusableTable } from "../../components";
import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
import ReuseTable from "../../components/ui/Table/ReuseTable";
const Payment = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const getOrders = async () => {
    try {
      setProductLoading(true);
      const response = await API_WRAPPER.get(
        `/order/payment/success/get-orders?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      setProductLoading(false);
      setOrdersList(response?.data?.orders);
      setTotalPagesShow(response?.data?.totalPages);
    } catch (error) {
      console.error("Error occured while fetching orders");
    }
  };

  useEffect(() => {
    getOrders();
  }, [page, pageSize, seacrhText]);

  const columns = useMemo(
    () => [
      {
        Header: "Vendor Name",
        accessor: "vendor_id.firstName",
        Cell: ({ row }) => {
          return (
            <div>
              <p>
                {row?.original?.vendors?.firstName}{" "}
                {row?.original?.vendors?.lastName}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Customer Name",
        accessor: "customer.firstName",
        Cell: ({ row }) => {
          return (
            <div>
              <p>
                {row?.original?.customer?.firstName}{" "}
                {row?.original?.customer?.lastName}
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
        Header: "Coupon Code",
        accessor: "coupon_code",
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
        <ReuseTable
          tableTitle="Payment List"
          columns={columns}
          data={data}
          enablePagination
          pageSize={10}
          setPageSizeshow={setPageSize}
          setPageNumber={setPage}
          pageSizeShow={pageSize}
          pageNumber={page}
          totalPagesShow={totalPagesShow}
          productLoading={productLoading}
          SetSearchTex={SetSearchTex}
          seacrhText={seacrhText}
        />
        {/* <ReusableTable
          tableTitle="Payment List"
          columns={columns}
          data={data}
          enablePagination
          pageSize={10}
          showButtons={false}
        /> */}
      </div>
    </div>
  );
};

export default Payment;
