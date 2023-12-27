import { useEffect, useMemo, useState } from "react";

import { Header, ReusableTable } from "../../components";
import API_WRAPPER from "../../api";
import { getStatusStyles } from "../../utils";
import OrderManagementBanner from "../../assets/bannerImages/orderManagementImage.png";
import ReuseTable from "../../components/ui/Table/ReuseTable";
import { Link } from "react-router-dom";

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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPagesShow, setTotalPagesShow] = useState(0);
  const [productLoading, setProductLoading] = useState(false);
  const [seacrhText, SetSearchTex] = useState("");

  const getOrderTableData = async () => {
    try {
      const response = await API_WRAPPER.get(
        `/order/all/get-orders?page=${page}&pageSize=${pageSize}&seacrhText=${seacrhText}`
      );
      if (response.status === 200) {
        setOrderTableList(response?.data?.orders);
        setTotalPagesShow(response?.data?.totalPages);
        console.log("ORDER TABLE DATA: ", response?.data);
      }
    } catch (error) {
      console.error("Error occured while getting all order table list", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Product name",
        accessor: "product.name",
        Cell: ({ row }) => {
          return (
            <Link
              style={{ color: "blue" }}
              to={`/invoice/page/${row?.original?.invoice_id}/${row?.original?._id}`}
            >
              {row?.original?.product.name}
            </Link>
          );
        },
      },
      {
        Header: "Order Id",
        accessor: "_id",
      },
      {
        Header: "Invoice ID",
        accessor: "invoice_id",
        Cell: ({ row }) => {
          return (
            <Link
              style={{ color: "blue" }}
              to={`/invoice/page/${row?.original?.invoice_id}/${row?.original?._id}`}
            >
              {row?.original?.invoice_id}
            </Link>
          );
        },
      },
      {
        Header: "Vendor Name",
        accessor: "vendors.firstName",
        Cell: ({ row }) => {
          return (
            <div>
              <p>{row?.original?.vendors?.firstName}</p>
              <p>{row?.original?.vendors?.lastName}</p>
            </div>
          );
        },
      },
      {
        Header: "User Name",
        accessor: "customer.firstName",
        Cell: ({ row }) => {
          return (
            <div>
              <p>{row?.original?.customer?.firstName}</p>
              <p>{row?.original?.customer?.lastName}</p>
            </div>
          );
        },
      },

      // payment_method
      {
        Header: "Total Order",
        accessor: "total_price",
        Cell: ({ row }) => {
          return <div>{row?.original?.total_price}₹</div>;
        },
      },
      {
        Header: "Payment Method",
        accessor: "payment_method",
      },
      {
        Header: "Payment status",
        accessor: "payment_status",
      },
      // {
      //   Header: "Billing ID",
      //   accessor: "billing_id",
      // },
      // {
      //   Header: "Coupon Code",
      //   accessor: "coupon_code",
      // },
      // {
      //   Header: "Payment status",
      //   accessor: "payment_status",
      // },

      // {
      //   Header: "Price",
      //   accessor: "price",
      // },
      {
        Header: "Order Status",
        accessor: "order_status",
      },
      {
        Header: "Tracking ID",
        accessor: "courier_id",
      },
      // {
      //   Header: "Status",
      //   accessor: "status",
      //   Cell: ({ row }) => {
      //     return getStatusStyles(row?.original?.status);
      //   },
      // },
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
  }, [apiTrigger, page, pageSize, seacrhText]);

  return (
    <div>
      <Header
        heading="Order Management"
        subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed dt"
        image={OrderManagementBanner}
      />
      <div className="mt-10">
        <ReuseTable
          tableTitle="Order List"
          columns={columns}
          data={data}
          showButtons
          enableEdit
          // enableDelete
          onEdit={handleEditModal}
          // onDelete={handleDeleteModal}
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
         */}

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
              {/* <div className="form-control">
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
              </div> */}
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
              {/* <div className="form-control col-span-1">
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
              </div> */}
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
