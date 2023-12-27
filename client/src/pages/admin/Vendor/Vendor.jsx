import { Header, Modal, ReusableTable } from "../../../components";
import { Link } from "react-router-dom";
import { PATHS } from "../../../Routes/paths";
import VendorBannerImage from "../../../assets/bannerImages/vendorImage.png";
import useVendor from "./useVendor";
import ReuseTable from "../../../components/ui/Table/ReuseTable";

const Vendor = () => {
  const {
    columns,
    handleDelete,
    handleDeleteModalClose,
    handleEdit,
    handleModalFormSubmit,
    handleSave,
    selectedRow,
    selectedStore,
    setSelectedStore,
    submitHandleDelete,
    vendorList,
    setPageSize,
    setPage,
    pageSize,
    page,
    totalPagesShow,
    productLoading,
    SetSearchTex,
    seacrhText,
    handleShowVendor,
    fetchVendorList,
  } = useVendor();
  return (
    <div className="relative">
      <Header
        heading="Vendor"
        subheading="This subheading exists because it is required to add a very brief detail about every page on the banner."
        image={VendorBannerImage}
      />
      <div className="mt-4 overflow-x-auto">
        <div className="flex justify-end mb-4">
          <Link to={PATHS.adminCreateVendor} className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <ReuseTable
          tableTitle="Vendor List"
          columns={columns}
          data={vendorList}
          showButtons
          enableEdit
          enableDelete
          onShow={handleShowVendor}
          onEdit={handleEdit}
          onDelete={handleDelete}
          enablePagination
          pageSize={10}
          setPageSizeshow={setPageSize}
          setPageNumber={setPage}
          pageSizeShow={pageSize}
          pageNumber={page}
          totalPagesShow={totalPagesShow}
          productLoading={productLoading}
          SetSearchTex={SetSearchTex}
          seacrhText={seacrhText}
        />
        {/* <ReusableTable
          tableTitle="Vendor List"
          columns={columns}
          data={vendorList}
          showButtons
          enableEdit
          enableDelete
          onDelete={handleDelete}
          enablePagination
          pageSize={10}
          onEdit={handleEdit}
        /> */}
      </div>
      <Modal
        id="vendor_edit_modal"
        title="Edit Vendor Detail"
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
          pincode: selectedRow?.store?.pinCode,
          // password: selectedRow?.password,
          status: selectedRow?.status,
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
            label: "Password",
            type: "text",
            name: "password",
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
                  className="input input-primary w-full"
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
                  className="input input-primary w-full"
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
                  className="input input-primary w-full"
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
                  className="input input-primary w-full"
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
                  className="input input-primary w-full"
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
                  className="input input-primary w-full"
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
                  className="input input-primary w-full"
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                type="button"
                onClick={(e) => handleModalFormSubmit(e)}
                className="btn btn-primary"
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
