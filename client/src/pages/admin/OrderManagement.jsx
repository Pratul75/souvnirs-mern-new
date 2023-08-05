import { useEffect, useMemo, useState } from "react";

import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { getStatusStyles } from "../../utils";
import OrderManagementBanner from "../../assets/bannerImages/orderManagementImage.png";
const OrderManagement = () => {
  const [orderTableList, setOrderTableList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);

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

  const handleDeleteOrder = (row) => {
    setSelectedRow(row);
    window.order_management_delete_modal.showModal();
    console.log("ROW TO BE DELETED: ", row);
  };

  const handleEditOrder = (row) => {
    setSelectedRow(row);
    window.order_management_edit_modal.showModal();
    console.log("ROW TO BE EDITED: ", row);
  };

  const handleEditChange = (e) => {
    setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
  };

  const submitEditedRow = async () => {
    const response = await API_WRAPPER.put(
      `/order/update-order/:${selectedRow.orderId}`,
      editedRow
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      window.order_management_edit_modal.close();
      console.log(
        "EDITED SUCCESSFULLY WITH THE FOLLOWING RESPONSE: ",
        response?.status
      );
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
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return getStatusStyles(row?.original?.status);
        },
      },
    ],
    []
  );

  const data = useMemo(() => orderTableList, [orderTableList]);
  useEffect(() => {
    getOrderTableData();
  }, [apiTrigger]);
  return (
    <div>
      <Header
        heading="Order Management"
        subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dt"
        image={OrderManagementBanner}
      />
      <div className="mt-10">
        <ReusableTable
          tableTitle="Orders List"
          columns={columns}
          data={data}
          showButtons
          enableDelete
          enableEdit
          enablePagination
          pageSize={10}
          onDelete={handleDeleteOrder}
          onEdit={handleEditOrder}
        />

        {/* edit modal */}
        <dialog id="order_management_edit_modal" className="modal">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitEditedRow();
            }}
            method="dialog"
            className="modal-box"
          >
            <h3 className="font-bold text-lg">Hello!</h3>
            <div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Invoice ID</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.invoiceId}
                  className="input input-primary"
                  type="text"
                  name="invoice_id"
                  id=""
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.productName}
                  className="input input-primary"
                  type="text"
                  name="productName"
                  id=""
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Vendor Name</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.vendorName}
                  className="input input-primary"
                  type="text"
                  name="vendorName"
                  id=""
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Customer Name</span>
                </label>
                <input
                  onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.customerName}
                  className="input input-primary"
                  type="text"
                  name="customerName"
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
                  className="select select-primary"
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
              <button type="submit" className="btn btn-error">
                Save Changes
              </button>
              <button
                onClick={() => window.order_management_edit_modal.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </dialog>

        <dialog id="order_management_delete_modal" className="modal">
          <form method="dialog" className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Are you sure you want to delete the selected order?
            </p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error">Delete</button>
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default OrderManagement;
