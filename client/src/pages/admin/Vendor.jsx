import { useEffect, useMemo, useState } from "react";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { EyeBtnSvg } from "../../icons/tableIcons";
import { debouncedShowToast, getStatusStyles } from "../../utils";
const Vendor = () => {
  const [vendorList, setVendorList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [convertedArr, setConvertedArr] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [editedRow, setEditedRow] = useState({});

  console.log('Vendor.jsx', selectedStore);
  const convertToDesiredOutcome = (vendors, stores) => {
    const result = [];


    for (const store of stores) {
      const vendor = vendors.find((v) => v._id === store.vendor_id);

      if (vendor) {
        const outcome = {
          id: vendor._id,
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
  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
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
  console.log('Vendor.jsx', selectedRow);

  const submitEditedRow = async (e) => {
    e
    try {
      e.preventDefault()
      const response = await API_WRAPPER.put(`/vendors/update-vendor/:${selectedRow.id}`, editedRow);
    } catch (e) {
      console.log('Vendor.jsx', error);
    }
  }

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

  const submitHandleDelete = async () => {
    try {
      const response = await API_WRAPPER.delete(
        `/vendors/delete-vendor/:${selectedRow.id}`
      );
      if (response.status === 200) {
        debouncedShowToast("Vendor deleted successfully!", "success");
        setApiTrigger((prevState) => !prevState);
      }
    } catch (error) {
      debouncedShowToast(error.message, "error");
    }
  };

  const handleDelete = (row) => {
    console.log("ROW TO BE DELETED: ", row);
    window.vendor_delete_modal.showModal();
    setSelectedRow(row);
  };

  const handleEdit = (row) => {
    window.vendor_edit_modal.showModal();
    console.log("ROW TO BE EDITED: ", row);
    setSelectedRow(row);
  };
  // const handleEditForm = async() = {

  // }

  const handleModalFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API_WRAPPER.put(
        `/store/update-store/:${selectedStore._id}`,
        selectedStore
      );
      console.log("EDITED RESPONSE", response.data);

      window.storeFilterModal.close();

      setEditedProduct(null);
    } catch (error) {
      console.error("Error occurred while editing product", error);
    }
  };

  useEffect(() => {
    fetchVendorList();
    fetchStoreList();
  }, [apiTrigger]);

  useEffect(() => {
    convertToDesiredOutcome(vendorList, storeList);
  }, [storeList, vendorList]);
  console.log('Vendor.jsx', selectedRow);
  return (
    <div>
      <Header
        heading="Vendor"
        subheading="This subheading exists because it is required to add a very brief detail about every page on the banner."
      />
      <div className="mt-4">
        <ReusableTable
          columns={columns}
          data={data}
          showButtons
          enableEdit
          enableDelete
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
      <dialog id="vendor_edit_modal" className="modal">
        <form

          method="dialog"
          className="modal-box"
        >
          <h3 className="font-bold text-lg">Hello!</h3>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vendor Name</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.vendorName}
                className="input input-accent"
                type="text"
                name="vendorName"
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">contact</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.contact}
                className="input input-accent"
                type="text"
                name="contact"
                id=""
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">country</span>
              </label>
              <input
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.country}
                className="input input-accent"
                type="text"
                name="country"
                id=""
              />
            </div>

            <div className="form-control col-span-1">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select
                onChange={(e) => handleEditChange(e)}
                defaultValue={selectedRow?.status}
                className="select select-accent"
                name="status"
                id=""
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="DEACTIVE">DEACTIVE</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
          </div>

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button type="button" onClick={(e) => submitEditedRow(e)} className="btn btn-accent">
              Save changes
            </button>
            <button
              onClick={() => window.vendor_edit_modal.close()}
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
      {selectedStore && (
        <dialog id="storeFilterModal" className="modal ">
          <form
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
              <button type="button" onClick={(e) => handleModalFormSubmit(e)} className="btn btn-accent">
                Save
              </button>
              <button onClick={() => setSelectedStore(null)} className="btn">
                Close
              </button>
            </div>
          </form>
        </dialog>
      )
      }
      <dialog id="vendor_edit_form" className="modal"></dialog>
      <dialog id="vendor_delete_modal" className="modal">
        <form
          onSubmit={submitHandleDelete}
          method="dialog"
          className="modal-box"
        >
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Are you sure you want to delete the selected vendor?
          </p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button type="submit" className="btn btn-error">
              Delete
            </button>
            <button
              onClick={() => window.vendor_delete_modal.close()}
              type="button"
              className="btn"
            >
              Close
            </button>
          </div>
        </form>
      </dialog>
    </div >
  );
};

export default Vendor;

