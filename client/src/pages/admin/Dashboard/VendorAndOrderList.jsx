import { ReusableTable } from "../../../components";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { useEffect, useMemo, useState } from "react";

const VendorAndOrderList = () => {
  const [ordersList, setOrdersList] = useState([]);

  const getOrdersList = async () => {
    try {
      const response = await API_WRAPPER.get("/order/get-orders");
      if (response.status === 200) {
        setOrdersList(response?.data);
        console.log("ORDERS LIST: ", response?.data);
        debouncedShowToast("Orders list loaded successfully", "success");
      }
    } catch (error) {
      debouncedShowToast(error?.message, "error");
    }
  };

  const orderTableColumns = useMemo(
    () => [
      {
        Header: "Payment Status",
        accessor: "payment_status",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
      },
      {
        Header: "Address ID",
        accessor: "address_id",
      },
    ],
    []
  );

  const orderTableData = useMemo(() => ordersList, [ordersList]);

  useEffect(() => {
    getOrdersList();
  }, []);

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
