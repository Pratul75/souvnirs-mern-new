import { useEffect, useMemo, useState } from "react";

import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { getStatusStyles } from "../../utils";
import OrderManagementBanner from "../../assets/bannerImages/orderManagementImage.png";

let orderStatus = [
  "ordered",
  "processing",
  "shipped",
  "delivered",
  "decline",
  "refund",
  "replace",
];
const OrderManagement = () => {
  const [orderTableList, setOrderTableList] = useState([]);
  const [orderToBeEdited, setOrderToBeEdited] = useState({});
  const [orderEditedObject, setOrderEditedObject] = useState({});
  const [apiTrigger, setApiTrigger] = useState(false);

  const getOrderTableData = async () => {
    try {
      const response = await API_WRAPPER.get("/order/get-orders");
      if (response.status === 200) {
        setOrderTableList(response?.data);
        console.log("ORDER TABLE DATA: ", response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all order table list", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Invoice ID",
        accessor: "invoice_id",
      },
      // payment_method
      {
        Header: "Payment Method",
        accessor: "payment_method",
      },
      {
        Header: "Billing ID",
        accessor: "billing_id",
      },
      {
        Header: "Coupon Code",
        accessor: "coupon_code",
      },
      {
        Header: "Courier ID",
        accessor: "courier_id",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Order Status",
        accessor: "order_status",
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

  const handleDeleteModal = (orderObjToBeDeleted) => {
    window.order_management_delete_modal.showModal();
    setOrderToBeEdited(orderObjToBeDeleted);
  };

  const handleEditModal = (orderObjToBeEdited) => {
    window.order_management_edit_modal.showModal();
    setOrderToBeEdited(orderObjToBeEdited);
    console.log("ORDER OBJECT: ", orderObjToBeEdited);
  };

  const handleEditSubmit = async () => {
    const response = await API_WRAPPER.put(
      `/order/update-order/:${orderToBeEdited._id}`,
      orderEditedObject
    );
    if (response.status === 200) {
      setApiTrigger((prevState) => !prevState);
      window.order_management_edit_modal.close();
      console.log("EDITED OBJ RESPONSE: ", response);
    }
  };

  const handleDeleteSubmit = async () => {
    const response = await API_WRAPPER.delete(
      `/order/delete-order/:${orderToBeEdited._id}`,
      orderEditedObject
    );
    if (response.status === 200) {
      window.order_management_delete_modal.close();
      console.log("RESPONSE: ", response);
    }
  };

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
        {data && data.length > 0 ? (
          <ReusableTable
            tableTitle="Orders List"
            columns={columns}
            data={data}
            showButtons
            enableDelete
            enableEdit
            enablePagination
            pageSize={10}
            onDelete={handleDeleteModal}
            onEdit={handleEditModal}
          />
        ) : (
          <div className="flex justify-center font-semibold">No orders</div>
        )}

        {/* edit modal */}
        <dialog id="order_management_edit_modal" className="modal">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSubmit();
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
                  onChange={(e) =>
                    setOrderEditedObject((prevState) => {
                      return { ...prevState, invoice_id: e.target.value };
                    })
                  }
                  defaultValue={orderToBeEdited?.invoice_id}
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
                  onChange={(e) =>
                    setOrderEditedObject((prevState) => {
                      return { ...prevState, billing_id: e.target.value };
                    })
                  }
                  defaultValue={orderToBeEdited?.billing_id}
                  className="input input-primary"
                  type="text"
                  name="productName"
                  id=""
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Discount</span>
                </label>
                <input
                  onChange={(e) =>
                    setOrderEditedObject((prevState) => {
                      return { ...prevState, coupon_code: e.target.value };
                    })
                  }
                  defaultValue={orderToBeEdited?.coupon_code}
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
                  onChange={(e) =>
                    setOrderEditedObject((prevState) => {
                      return { ...prevState, courier_id: e.target.value };
                    })
                  }
                  defaultValue={orderToBeEdited?.courier_id}
                  className="input input-primary"
                  type="text"
                  name="customerName"
                  id=""
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Customer Name</span>
                </label>
                <input
                  onChange={(e) =>
                    setOrderEditedObject((prevState) => {
                      return { ...prevState, price: e.target.value };
                    })
                  }
                  defaultValue={orderToBeEdited?.price}
                  className="input input-primary"
                  type="text"
                  id=""
                />
              </div>
              <div className="form-control col-span-1">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  onChange={(e) =>
                    setOrderEditedObject((prevState) => {
                      return { ...prevState, order_status: e.target.value }; ///////////////jjjjjjjjjjjj
                    })
                  }
                  defaultValue={orderToBeEdited.order_status}
                  className="select select-primary"
                  name="status"
                  id=""
                >
                  {orderStatus?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control col-span-1">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  onChange={(e) =>
                    setOrderEditedObject((prevState) => {
                      return { ...prevState, status: e.target.value };
                    })
                  }
                  defaultValue={orderToBeEdited.status}
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
              <button type="submit" className="btn btn-primary">
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDeleteSubmit();
            }}
            method="dialog"
            className="modal-box"
          >
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">
              Are you sure you want to delete the selected order?
            </p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button type="submit" className="btn btn-primary">
                Delete
              </button>
              <button className="btn">Close</button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default OrderManagement;
