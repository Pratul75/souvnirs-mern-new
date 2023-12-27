import { useEffect, useMemo, useState } from "react";
// import OrderManagementBannerImg from "../../assets/images/orderManagementBanner.png";
import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { getStatusStyles } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
const CustomerOrders = () => {
  const [orderTableList, setOrderTableList] = useState([]);
  const [selectedRow, setSelectedRow] = useState({});
  const [editedRow, setEditedRow] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);
  const [QueryData, sendQueryData] = useState({});

  const oderStatus = ["return", "refund"];

  const getOrderTableData = async () => {
    try {
      const response = await API_WRAPPER.get("/order/get-order-table-data");
      // if (response.status === 200) {
      console.log("SELECTED ROW IS DELETED", response?.data);
      setOrderTableList(response?.data);
      // console.log("ORDER TABLE DATA: ", orderTableList);
      // }
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
  const deleteSelectedRow = async () => {
    console.log("VendorOrderManagement.jsx", selectedRow);
    const response = await API_WRAPPER.delete(
      `/order/delete-order/:${selectedRow.orderId}`
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      console.log(
        "SELECTED ROW IS DELETED WITH FOLLOWING RESPONSE: ",
        response?.data
      );
    }
  };

  const handleSendQuery = async () => {
    try {
      // console.log("000000---->===>", {
      //   ...QueryData,
      //   customer_id: selectedRow?.customer_id,
      //   invoice_id: selectedRow?.invoice_id,
      //   orderId: selectedRow?._id,
      //   productId: selectedRow?.product_id,
      // });
      const responce = await API_WRAPPER.post("/post/query/user/side", {
        ...QueryData,
        customer_id: selectedRow?.customer_id,
        invoice_id: selectedRow?.invoice_id,
        orderId: selectedRow?._id,
        productId: selectedRow?.product_id,
        vendor_id: selectedRow?.vendor_id,
      });
      toast.success("Query send succefully");
      window.order_management_edit_modal.close();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      // {
      //   Header: "Invoice ID",
      //   accessor: "invoiceId",
      // },
      {
        Header: "Order id",
        accessor: "_id",
      },
      {
        Header: "Product Name",
        accessor: "product.name",
      },

      // {
      //   Header: "Vendor Name",
      //   accessor: "vendorName",
      // },
      // {
      //   Header: "Customer Name",
      //   accessor: "customerName",
      // },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Total Amount",
        accessor: "quantityTotal",
        Cell: ({ row }) => {
          return (
            <div>
              <p>{row?.original?.quantity * row?.original?.price}</p>
            </div>
          );
        },
      },
      {
        Header: "delivery address",
        accessor: "address",
        Cell: ({ row }) => {
          return (
            <div>
              <p>
                {row?.original?.address?.country},{row?.original?.address?.city}
                ,{row?.original?.address?.address},
                {row?.original?.address?.pin_code}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Order Date and Time",
        accessor: "createdAt",
        Cell: ({ row }) => {
          return <div>{Date(row?.original?.createdAt)}</div>;
        },
      },
      {
        Header: "Order Status",
        accessor: "order_status",
      },
      {
        Header: "refund status",
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
        subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et "
        // image={OrderManagementBannerImg}
      />
      <div className="mt-10">
        <ReusableTable
          tableTitle="Orders List"
          columns={columns}
          data={data}
          pageSize={10}
          enablePagination
          showButtons
          // enableDelete
          enableEdit
          // onDelete={handleDeleteOrder}
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
            <h3 className="font-bold text-lg">Request Query</h3>
            <div>
              <div className="form-control col-span-1">
                <label className="label">
                  <span className="label-text">Choose Related Query</span>
                </label>
                <select
                  // onChange={(e) => handleEditChange(e)}
                  defaultValue={selectedRow?.status}
                  className="select select-primary"
                  onChange={(e) =>
                    sendQueryData((pre) => ({ ...pre, type: e.target.value }))
                  }
                  name="status"
                  id=""
                >
                  <option disabled>choose related query</option>
                  {oderStatus?.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control col-span-1">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  className="input input-bordered"
                  type="number"
                  onChange={(e) =>
                    sendQueryData((pre) => ({ ...pre, qty: e.target.value }))
                  }
                  placeholder="Enter quantity how much return or refund"
                />
              </div>
              <div className="form-control col-span-1">
                <label className="label">
                  <span className="label-text">
                    Reason why return and refund?
                  </span>
                </label>
                <input
                  className="input input-bordered"
                  type="text"
                  onChange={(e) =>
                    sendQueryData((pre) => ({ ...pre, reason: e.target.value }))
                  }
                  placeholder="Reason why return and refund?"
                />
              </div>
            </div>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                type="submit"
                className="btn btn-error"
                onClick={handleSendQuery}
              >
                Send Query
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
              <button className="btn btn-error" onClick={deleteSelectedRow}>
                Delete
              </button>
              <button
                className="btn"
                onClick={() => {
                  window.order_management_delete_modal.close();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </dialog>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CustomerOrders;
