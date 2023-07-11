import { Header, ReusableTable } from "../../components";
import HeaderImgTwo from "../../assets/images/headerImgTwo.png";
import API_WRAPPER from "../../api";
import { useEffect, useMemo, useState } from "react";

const Refund = () => {
  const [refundList, setRefundList] = useState([]);
  const getRefundsList = async () => {
    try {
      const response = await API_WRAPPER.get("/refund/get-all-refunds");
      if (response.status === 200) {
        setRefundList(response?.data);
      }
    } catch (error) {
      console.error("Error occured while fetching all refunds");
    }
  };
  useEffect(() => {
    getRefundsList();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "orderId",
      },
      {
        Header: "Product IDs",
        accessor: "productId",
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
        Header: "Total Price",
        accessor: "totalPrice",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const data = useMemo(() => refundList, [refundList]);

  return (
    <div>
      <Header
        heading="Refunds"
        subheading="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to"
        image={HeaderImgTwo}
      />

      <div className="mt-4">
        <ReusableTable columns={columns} data={data} showButtons={false} />
      </div>
    </div>
  );
};

export default Refund;
