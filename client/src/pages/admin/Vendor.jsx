import { useEffect, useMemo, useState } from "react";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";

const Vendor = () => {
  const [vendorList, setVendorList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [convertedArr, setConvertedArr] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);

  const convertToDesiredOutcome = (vendors, stores) => {
    const result = [];

    for (const store of stores) {
      const vendor = vendors.find((v) => v._id === store.vendor_id);

      if (vendor) {
        const outcome = {
          vendorName: vendor.firstName + " " + vendor.lastName,
          contact: vendor.mobile,
          store: store._id,
          country: store.country,
          status: store.status,
        };

        result.push(outcome);
      }
    }
    setConvertedArr(result);
    return result;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Vendor Name",
        accessor: "vendorName",
      },
      {
        Header: "Contact",
        accessor: "contact",
      },
      {
        Header: "Store",
        accessor: "store",
        Cell: (props) => (
          <p
            onClick={() => {
              setSelectedStore(
                storeList.find(
                  (store) => store._id === props?.row?.original?.store
                )
              );
              window.storeFilterModal.showModal();
            }}
            className="text-blue-500 cursor-pointer"
          >
            {props?.row?.original?.store}
          </p>
        ),
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    [storeList]
  );

  const data = useMemo(() => convertedArr, [convertedArr]);

  const fetchVendorList = async () => {
    try {
      const response = await API_WRAPPER.get("/vendors/get-vendors");
      if (response.status === 200) {
        setVendorList(response?.data?.data);
      }
    } catch (error) {
      console.error("Error occurred while fetching all vendorList", error);
    }
  };

  const fetchStoreList = async () => {
    try {
      const response = await API_WRAPPER.get("/store/get-all-stores");
      if (response.status === 200) {
        setStoreList(response?.data?.stores);
      }
    } catch (error) {
      console.error("Error occurred while fetching all storeList", error);
    }
  };

  useEffect(() => {
    fetchVendorList();
    fetchStoreList();
  }, []);

  useEffect(() => {
    convertToDesiredOutcome(vendorList, storeList);
  }, [storeList, vendorList]);

  return (
    <div>
      <Header
        heading="Vendor"
        subheading="This subheading exists because it is required to add a very brief detail about every page on the banner."
      />
      <div className="mt-4">
        <ReusableTable columns={columns} data={data} />
      </div>

      {selectedStore && (
        <dialog id="storeFilterModal" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-2xl">Edit Store</h3>
            <div className="grid gap-4 grid-cols-2 py-4">
              <div className="form-control col-span-1">
                <label htmlFor="storeName" className="label">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={selectedStore.organization_name}
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="storeName" className="label">
                  Organization Type
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={selectedStore.organization_type}
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="storeName" className="label">
                  Country
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={selectedStore.country}
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="storeName" className="label">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={selectedStore.pin_code}
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="storeName" className="label">
                  Order Type Interested
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={selectedStore.order_type_interested}
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="storeName" className="label">
                  Organization Role
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={selectedStore.organization_role}
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-2">
                <label htmlFor="storeName" className="label">
                  Cetegory Type Interest
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  value={selectedStore.category_type_interest}
                  className="input input-accent w-full"
                />
              </div>
            </div>
            <div className="modal-action">
              <button className="btn btn-accent">Save</button>
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Vendor;
