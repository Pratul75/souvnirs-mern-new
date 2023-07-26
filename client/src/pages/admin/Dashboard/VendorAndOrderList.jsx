import { VendorListComponent } from "../../../components";
import API_WRAPPER from "../../../api";
import { debouncedShowToast } from "../../../utils";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
const VendorAndOrderList = () => {
  const [vendorList, setVendorList] = useState([]);
  const getVendorList = async () => {
    try {
      const response = await API_WRAPPER.get("/vendors/get-vendors");
      if (response?.status === 200) {
        setVendorList(response?.data?.data);
        console.log("VENDOR LIST: ", response?.data);
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };
  useEffect(() => {
    getVendorList();
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4 mt-4">
      <div className="col-span-2 p-4 bg-base-200 rounded-xl shadow-xl">
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
      <div className="col-span-3 p-4 bg-base-200 rounded-xl shadow-xl">
        <h2 className="font-semibold text-lg">Recent Orders</h2>
      </div>
      <div></div>
    </div>
  );
};

export default VendorAndOrderList;
