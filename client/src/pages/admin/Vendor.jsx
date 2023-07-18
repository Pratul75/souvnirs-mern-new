import { useEffect, useMemo, useState } from "react";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { EyeBtnSvg } from "../../icons/tableIcons";
import { getStatusStyles } from "../../utils";
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
            <button className="btn btn-circle ">
              <EyeBtnSvg />
            </button>
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
        Cell: ({ row }) => {
          return getStatusStyles(row?.original?.status);
        },
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

  const handleModalFormSubmit = (e) => {
    e.preventDefault();
    console.log("SELECTED STORE: ", selectedStore);
    window.storeFilterModal.openModal();
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
        <dialog id="storeFilterModal" className="modal ">
          <form
            onSubmit={handleModalFormSubmit}
            method="dialog"
            className="modal-box"
          >
            <h3 className="font-bold text-2xl">Edit Store</h3>
            <div className="grid gap-4 grid-cols-2 py-4">
              <div className="form-control col-span-1">
                <label htmlFor="storeName" className="label">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="storeName"
                  name="organization_name"
                  value={selectedStore.organization_name}
                  onChange={(e) =>
                    setSelectedStore((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="organization_type" className="label">
                  Organization Type
                </label>
                <input
                  type="text"
                  id="organization_type"
                  name="organization_type"
                  value={selectedStore.organization_type}
                  onChange={(e) =>
                    setSelectedStore((prevState) => ({
                      ...prevState,
                      [e.target.name]: e.target.value,
                    }))
                  }
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="country" className="label">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={selectedStore.country}
                  onChange={(e) =>
                    setSelectedStore((prevState) => {
                      return { ...prevState, [e.target.name]: e.target.value };
                    })
                  }
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="pinCode" className="label">
                  Pin Code
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pin_code"
                  value={selectedStore.pin_code}
                  onChange={(e) =>
                    setSelectedStore((prevState) => {
                      return { ...prevState, [e.target.name]: e.target.value };
                    })
                  }
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="order_type_interested" className="label">
                  Order Type Interested
                </label>
                <input
                  type="text"
                  id="order_type_interested"
                  name="order_type_interested"
                  value={selectedStore.order_type_interested}
                  onChange={(e) =>
                    setSelectedStore((prevState) => {
                      return { ...prevState, [e.target.name]: e.target.value };
                    })
                  }
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-1">
                <label htmlFor="organization_role" className="label">
                  Organization Role
                </label>
                <input
                  type="text"
                  id="organization_role"
                  name="organization_role"
                  value={selectedStore.organization_role}
                  onChange={(e) =>
                    setSelectedStore((prevState) => {
                      return { ...prevState, [e.target.name]: e.target.value };
                    })
                  }
                  className="input input-accent w-full"
                />
              </div>
              <div className="form-control col-span-2">
                <label htmlFor="category_type_interest" className="label">
                  Cetegory Type Interest
                </label>
                <input
                  type="text"
                  id="category_type_interest"
                  name="category_type_interest"
                  value={selectedStore.category_type_interest}
                  onChange={(e) =>
                    setSelectedStore((prevState) => {
                      return { ...prevState, [e.target.name]: e.target.value };
                    })
                  }
                  className="input input-accent w-full"
                />
              </div>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-accent">
                Save
              </button>
              <button onClick={() => setSelectedStore(null)} className="btn">
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Vendor;
