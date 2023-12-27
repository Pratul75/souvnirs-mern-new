import { Header, ReusableTable } from "../../components";
import PaymentBanner from "../../assets/images/collectionBannerImg.png";
import { useEffect, useMemo, useState } from "react";
import API_WRAPPER from "../../api";
import ReuseTable from "../../components/ui/Table/ReuseTable";
const VendorShipment = () => {
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
        `/order/shipped/get-orders/list?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
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
      // {
      //   Header: "Vendor Name",
      //   accessor: "vendor_id.firstName",
      //   Cell: ({ row }) => {
      //     return (
      //       <p>
      //         {row?.original?.vendor_id?.firstName}&nbsp;
      //         {row?.original?.vendor_id?.lastName}
      //       </p>
      //     );
      //     console.log("+++>//", row?.original?.vendor_id);
      //   },
      // },
      {
        Header: "Customer Name",
        accessor: "customer.firstName",
        Cell: ({ row }) => {
          return (
            <p>
              {row?.original?.customer?.firstName}&nbsp;
              {row?.original?.customer?.lastName}
            </p>
          );
        },
      },
      {
        Header: "Courier ID",
        accessor: "courier_id",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
      },
      {
        Header: "Date and time",
        accessor: "updatedAt",
        Cell: ({ row }) => {
          const inputDate = new Date(row?.original?.updatedAt);
          const day = String(inputDate.getDate()).padStart(2, "0");
          const month = String(inputDate.getMonth() + 1).padStart(2, "0");
          const year = String(inputDate.getFullYear()).slice(-2); // Extract the last two digits of the year
          const hours = String(inputDate.getUTCHours()).padStart(2, "0");
          const minutes = String(inputDate.getUTCMinutes()).padStart(2, "0");
          const seconds = String(inputDate.getUTCSeconds()).padStart(2, "0");

          return (
            <p>{`${day}-${month}-${year} ${hours}:${minutes}:${seconds}`}</p>
          );
        },
      },
    ],
    []
  );

  const handleEditModal = (row) => {
    // setOrderToBeEdited(row);
    // setOrderEditedObject((pre) => ({
    //   ...pre,
    //   order_status: row?.order_status,
    // }));
    // window.shipped_management_edit_modal.showModal();
  };

  const data = useMemo(() => ordersList, [ordersList]);

  return (
    <div>
      <Header
        heading="Shipments"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. sdfsdfse drf qwdefd fjhr f4 wedr w"
        // image={PaymentBanner}
      />

      <div className="mt-20">
        {/* <ReusableTable
          tableTitle="Shipment List"
          columns={columns}
          data={data}
        /> */}
        <ReuseTable
          tableTitle="Shipment List"
          columns={columns}
          data={data}
          showButtons
          enableEdit
          enablePagination
          pageSize={10}
          setPageSizeshow={setPageSize}
          onEdit={handleEditModal}
          setPageNumber={setPage}
          pageSizeShow={pageSize}
          pageNumber={page}
          totalPagesShow={totalPagesShow}
          productLoading={productLoading}
          SetSearchTex={SetSearchTex}
          seacrhText={seacrhText}
        />
      </div>
    </div>
  );
};

export default VendorShipment;
