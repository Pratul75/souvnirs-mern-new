import { useEffect, useMemo, useState } from "react";
import OrderManagementBannerImg from "../../assets/images/orderManagementBanner.png";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
const OrderManagement = () => {
  const [orderTableList, setOrderTableList] = useState([]);

  const getOrderTableData = async () => {
    try {
      const response = await API_WRAPPER.get("/order/get-order-table-data");
      if (response.status === 200) {
        setOrderTableList(response?.data);
        console.log("ORDER TABLE DATA: ", orderTableList);
      }
    } catch (error) {
      console.error("Error occured while getting all order table list", error);
    }
  };
  const columns = useMemo(
    () => [
      {
        Header: "Invoice ID",
        accessor: "invoiceId",
      },
      {
        Header: "Product Name",
        accessor: "productName",
      },
      {
        Header: "Vendor Name",
        accessor: "vendorName",
      },
      {
        Header: "Customer Name",
        accessor: "customerName",
      },
      {
        Header: "Price",
        accessor: "price",
      },
    ],
    []
  );
  const data = useMemo(() => orderTableList, [orderTableList]);
  useEffect(() => {
    getOrderTableData();
  }, []);
  return (
    <div>
      <Header
        heading="Order Management"
        subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et "
        image={OrderManagementBannerImg}
      />
      <div className="mt-10">
        <ReusableTable columns={columns} data={data} showButtons={true} />
      </div>
    </div>
  );
};

export default OrderManagement;
