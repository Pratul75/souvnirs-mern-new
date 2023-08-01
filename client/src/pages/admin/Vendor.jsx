import { useEffect, useMemo, useState } from "react";
import { Header, Modal, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { debouncedShowToast, getStatusStyles } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/paths";
const Vendor = () => {
  const [vendorList, setVendorList] = useState([]);
  const [storeList, setStoreList] = useState([]);
  const [convertedArr, setConvertedArr] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedRow, setSelectedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);

  console.log("Vendor.jsx", selectedStore);

  const handleDeleteModalClose = () => {
    return window.vendor_edit_modal.close();
  };
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
  const navigate = useNavigate();
  const handleSave = (inputValues) => {
    console.log("SAVING THE INPUT VALUES: ", inputValues);
    submitEditedRow(inputValues);
  };
  // const handleEditChange = (e) => {
  //   setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  // };
  const columns = useMemo(
    () => [
      {
        Header: "Vendor Name",
        accessor: "firstName",
      },
      {
        Header: "Contact",
        accessor: "mobile",
      },

      {
        Header: "email",
        accessor: "email",
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
  console.log("Vendor.jsx", selectedRow);

  const submitEditedRow = async (data) => {
    try {
      console.log("Vendor.jsx", selectedRow);
      const response = await API_WRAPPER.put(
        `/vendors/update-vendor/:${selectedRow._id}`,
        data
      );
      setApiTrigger((res) => !res);
    } catch (e) {
      console.log("Vendor.jsx", e);
    }
  };

  const fetchStoreList = async () => {
    try {
      const response = await API_WRAPPER.get("/store/get-all-stores");
      if (response.status === 200) {
        setStoreList(response?.data?.stores);
      }
    } catch (error) {
      y
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
    setSelectedRow(row);
    window.vendor_edit_modal.showModal();
    console.log("ROW TO BE EDITED: ", row);
  };
  // const handleEditForm = async() = {

  // }

  const handleModalFormSubmit = async (e) => {
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
  console.log("Vendor.jsx", selectedRow);
  return (
    <div className="relative">
      <Header
        heading="Vendor"
        subheading="This subheading exists because it is required to add a very brief detail about every page on the banner."
      />
      <div className="mt-4 overflow-x-auto">
        <div className="flex justify-end mb-4">
          <Link
            to={PATHS.adminCreateVendor}
            className="btn bg-themeColor font-thin text-white w-48"
          >
            Create new
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <ReusableTable
          columns={columns}
          data={vendorList}
          showButtons
          enableEdit
          enableDelete
          onDelete={handleDelete}
          enablePagination
          pageSize={10}
          onEdit={handleEdit}
        />
      </div>
      <Modal
        id="vendor_edit_modal"
        title="Edit Vendor Detaill"
        onClose={handleDeleteModalClose}
        onSave={handleSave}
        defaultValues={{
          firstName: selectedRow?.firstName,
          lastName: selectedRow?.lastName,
          email: selectedRow?.email,
          mobile: selectedRow?.mobile,
          organizationName: selectedRow?.store?.organization_name,
          organizationType: selectedRow?.store?.organization_type,
          country: selectedRow?.store?.country,
          city: selectedRow?.store?.city,
          pincode: selectedRow?.store?.pin_code,
          status: selectedRow?.status
        }}
        inputs={[
          {
            label: "First Name",
            type: "text",
            name: "firstName",
          },
          {
            label: "Last Name",
            type: "text",
            name: "lastName",
          },
          {
            label: "Email",
            type: "text",
            name: "email",
          },
          {
            label: "Mobile",
            type: "tel",
            name: "mobile",
          },
          {
            label: "Organisation Name",
            type: "text",
            name: "organizationName",
          },
          {
            label: "Organisation Type",
            type: "text",
            name: "organizationType",
          },
          {
            label: "Country",
            type: "text",
            name: "country",
          },
          {
            label: "City",
            type: "text",
            name: "city",
          },
          {
            label: "Pin Code",
            type: "text",
            name: "pincode",
          },
          {
            label: "Status",
            type: "select",
            name: "status",
          },
        ]}
      />
      {selectedStore && (
        <dialog id="storeFilterModal" className="modal ">
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
              <button
                type="button"
                onClick={(e) => handleModalFormSubmit(e)}
                className="btn btn-accent"
              >
                Save
              </button>
              <button onClick={() => setSelectedStore(null)} className="btn">
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}
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
    </div>
  );
};

export default Vendor;
