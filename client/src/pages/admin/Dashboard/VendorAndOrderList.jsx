import { ReusableTable } from "../../../components";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const VendorAndOrderList = () => {
  const [ordersList, setOrdersList] = useState([]);

  const getOrdersList = async () => {
    try {
      const response = await API_WRAPPER.get("/order/recent/list");
      console.log("----------??????...", response);
      setOrdersList(response?.data);
      // debouncedShowToast("Orders list loaded successfully", "success");
    } catch (error) {
      // debouncedShowToast(error?.message, "error");
    }
  };

  // const orderTableColumns = useMemo(
  //   () => [
  //     {
  //       Header: "Order Id",
  //       accessor: "_id",
  //     },
  //     {
  //       Header: "Courier ID",
  //       accessor: "courier_id",
  //     },
  //     {
  //       Header: "Vendor Name",
  //       accessor: "vendor_id",
  //       Cell: ({ row }) => {
  //         return (
  //           <>
  //             <div>{row?.original?.vendor_id?.firstName}</div>
  //             <div>{row?.original?.vendor_id?.lastName}</div>
  //           </>
  //         );
  //       },
  //     },
  //     {
  //       Header: "Payment Status",
  //       accessor: "payment_status",
  //     },
  //     {
  //       Header: "Payment Method",
  //       accessor: "payment_method",
  //     },
  //     {
  //       Header: "Order Status",
  //       accessor: "order_status",
  //     },
  //     {
  //       Header: "Address ID",
  //       accessor: "address_id.address",
  //       Cell: ({ row }) => {
  //         return (
  //           <>
  //             <div>{row?.original?.address_id.city}</div>
  //             <div>{row?.original?.address_id.address}</div>
  //           </>
  //         );
  //       },
  //     },
  //   ],
  //   []
  // );
  const orderTableColumns = useMemo(
    () => [
      {
        Header: "Product name",
        accessor: "product.name",
        Cell: ({ row }) => {
          return (
            <Link
              style={{ color: "blue" }}
              to={`/invoice/page/${row?.original?.invoice_id}/${row?.original?._id}`}
            >
              {row?.original?.product.name}
            </Link>
          );
        },
      },
      {
        Header: "Order Id",
        accessor: "_id",
      },
      // {
      //   Header: "Invoice ID",
      //   accessor: "invoice_id",
      //   Cell: ({ row }) => {
      //     return (
      //       <Link
      //         style={{ color: "blue" }}
      //         to={`/invoice/page/${row?.original?.invoice_id}/${row?.original?._id}`}
      //       >
      //         {row?.original?.invoice_id}
      //       </Link>
      //     );
      //   },
      // },
      {
        Header: "Vendor Name",
        accessor: "vendors.firstName",
        Cell: ({ row }) => {
          return (
            <div>
              <p>{row?.original?.vendors?.firstName}</p>
              <p>{row?.original?.vendors?.lastName}</p>
            </div>
          );
        },
      },
      {
        Header: "User Name",
        accessor: "customer.firstName",
        Cell: ({ row }) => {
          return (
            <div>
              <p>{row?.original?.customer?.firstName}</p>
              <p>{row?.original?.customer?.lastName}</p>
            </div>
          );
        },
      },
      {
        Header: "Order qantity",
        accessor: "quantity",
      },
      {
        Header: "Product Price",
        accessor: "product.price",
      },
      // payment_method
      {
        Header: "Total Order",
        accessor: "total_price",
        Cell: ({ row }) => {
          return <div>{row?.original?.total_price}₹</div>;
        },
      },
      {
        Header: "Payment Method",
        accessor: "payment_method",
      },
      {
        Header: "Payment status",
        accessor: "payment_status",
      },
      // {
      //   Header: "Billing ID",
      //   accessor: "billing_id",
      // },
      // {
      //   Header: "Coupon Code",
      //   accessor: "coupon_code",
      // },
      // {
      //   Header: "Payment status",
      //   accessor: "payment_status",
      // },

      // {
      //   Header: "Price",
      //   accessor: "price",
      // },
      {
        Header: "Order Status",
        accessor: "order_status",
      },
      // {
      //   Header: "Tracking ID",
      //   accessor: "courier_id",
      // },
      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: ({ row }) => {
      //     return getStatusStyles(row?.original?.status);
      //   },
      // },
    ],
    []
  );

  const orderTableData = useMemo(() => ordersList, [ordersList]);

  useEffect(() => {
    getOrdersList();
  }, []);
  console.log("ORDERS LIST: ", ordersList);

  return (
    <div className="grid grid-cols-5 gap-4 mt-4">
      {/* <div className="col-span-5 md:col-span-2">
        <div className=" p-4 bg-base-100 border-[1px] border-base-300 rounded-xl ">
          <h2 className="font-semibold text-lg"> Vendors List</h2>
          <div className="overflow-y-scroll max-h-[300px] mt-4">
            {vendorList?.map((vendorItem) => {
              return (
                <VendorListComponent
                  key={nanoid()}
                  firstName={vendorItem?.firstName}
                  lastName={vendorItem?.lastName}
                />
              );
            })}
          </div>
        </div>
      </div> */}
      <div className="col-span-5 md:col-span-5">
        <div className=" p-4 bg-base-100 border-[1px] border-base-300 rounded-xl">
          <h2 className="font-semibold text-lg">Recent Orders</h2>
          <ReusableTable
            data={orderTableData}
            columns={orderTableColumns}
            pageSize={10}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorAndOrderList;
